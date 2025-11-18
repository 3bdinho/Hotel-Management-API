const asyncHandler = require("express-async-handler");

const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const Hotel = require("../models/hotelModel");
const ApiError = require("../utils/ApiError");
const APIFeatures = require("../utils/apiFeatures");

//@desc Helper: Check if room is available for given dates
const isRoomAvailable = async (roomId, checkIn, checkOut, bookingId) => {
  const query = {
    roomId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  };

  if (bookingId) query._id = { $ne: bookingId };

  const overlap = await Booking.findOne(query).lean();
  return !overlap;
};

//@desc Helper: Validate that the room and hotel exist and are correctly linked,and ensure the room is currently available (not under maintenance).
const roomValidate = async (roomId, hotelId) => {
  //Check if room exist
  const room = await Room.findById(roomId);
  if (!room) return { ok: false, message: "Room not found", status: 404 };

  //Check if hotel exist
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return { ok: false, message: "Hotel not found", status: 404 };

  //Check if room belongs to hotel
  if (room.hotel.toString() !== hotelId)
    return {
      ok: false,
      message: "Room does not belong to this hotel",
      status: 400,
    };

  //Check if a room is under maintenance
  if (room.status === "maintenance")
    return {
      ok: false,
      message: "Room is not available right now",
      status: 400,
    };

  return { ok: true, room };
};

//@desc Helper: check if dates range valide
const isDateRangeValid = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // Validate both dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

  // Ensure check-in is strictly before check-out
  return start < end;
};

//@desc   Create new book
//@route  POST /api/v1/bookings
//@access Public
exports.createBooking = asyncHandler(async (req, res, next) => {
  const { roomId, hotelId, userId, checkIn, checkOut } = req.body;

  //Validate date range
  if (!isDateRangeValid(checkIn, checkOut))
    return next(new ApiError("Invalid date range", 400));

  // Validate room & hotel
  const validation = await roomValidate(roomId, hotelId);
  if (!validation.ok)
    return next(new ApiError(validation.message, validation.status));

  const room = validation.room;

  // Check overlapping
  const available = await isRoomAvailable(roomId, checkIn, checkOut);
  if (!available) {
    return next(new ApiError("Room is already booked for this period", 400));
  }

  //Calc totalPrice
  const days = Math.max(
    1,
    Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
  );

  const totalPrice = room.price * days;

  //Create booking
  const newBooking = await Booking.create({
    roomId,
    hotelId,
    userId,
    checkIn,
    checkOut,
    totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: newBooking,
  });
});

//@desc   Update book status
//@route  POST /api/v1/bookings/:id/updateStatus
//@access Private (admin,staff)
exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  //1-Fetch booking by id
  const booking = await Booking.findById(req.params.id);
  if (!booking) return next(new ApiError("Booking not found", 404));

  //2-Role-based access
  if (
    req.user.role === "staff" &&
    req.user.hotelId.toString() !== booking.hotelId.toString()
  )
    return next(new ApiError("Staff can only access their hotel scope", 403));

  //3-Validate the status sent in the request
  const validStatuses = ["Pending", "Confirmed", "Cancelled"];
  const newStatus = req.body.status;
  if (!validStatuses.includes(req.body.status)) {
    return next(new ApiError("Invalid booking status", 400));
  }

  //4-Fetch the room
  const room = await Room.findById(booking.roomId);
  if (!room) return next(new ApiError("Room not found", 404));

  //5-Check if the room is under maintenance before confirming
  if (room.status === "Maintenance" && newStatus === "Confirmed")
    return next(
      new ApiError("Cannot confirm booking, room under maintenance", 400)
    );

  //6-Prevent overlapping confirmed bookings
  if (newStatus === "Confirmed") {
    const available = await isRoomAvailable(
      booking.roomId,
      booking.checkIn,
      booking.checkOut,
      booking._id
    );
    if (!available)
      return next(new ApiError("Room already booked for this period", 400));
  }

  //7-Update booking status
  booking.status = newStatus;
  booking.statusHistory.push({
    status: newStatus,
    changedBy: req.user._id,
  });
  await booking.save();

  //6-Update room status based on booking status
  if (booking.status === "Confirmed") room.status = "Booked";
  else if (booking.status === "Cancelled" && room.status !== "Maintenance")
    room.status = "Available";

  await room.save();

  //7-Send response
  res.status(200).json({
    status: "success",
    data: booking,
  });
});

//@desc   Update book data
//@route  POST /api/v1/bookings/:id
//@access Public
exports.updateBooking = asyncHandler(async (req, res, next) => {
  //Check if book exist
  const booking = await Booking.findById(req.params.id);
  if (!booking) return next(new ApiError("Booking not found", 404));

  //Prevent updates if booking is Confirmed
  if (booking.status === "Confirmed")
    return next(new ApiError("Confirmed bookings cannot be updated", 400));

  //Prevent updates if user is not the owner or admin
  if (
    booking.userId.toString() !== req.user._id.toString() &&
    req.user.role === "user"
  ) {
    return next(
      new ApiError("You are not authorized to update this booking", 403)
    );
  }

  // Merge new values with existing ones
  const { checkIn, checkOut, roomId } = req.body;
  const newRoom = roomId || booking.roomId;
  const newCheckIn = checkIn || booking.checkIn;
  const newCheckOut = checkOut || booking.checkOut;

  // Validate date range only if dates are being updated
  if (checkIn || checkOut) {
    if (!isDateRangeValid(newCheckIn, newCheckOut)) {
      return next(new ApiError("Invalid date range", 400));
    }
  }
  if (checkIn || checkOut || roomId) {
    // Check overlapping
    const available = await isRoomAvailable(
      newRoom,
      newCheckIn,
      newCheckOut,
      booking._id
    );
    if (!available)
      return next(new ApiError("Room not available for new dates", 400));
  }

  //Update booking data
  booking.roomId = newRoom;
  booking.checkIn = newCheckIn;
  booking.checkOut = newCheckOut;

  // Push into statusHistory for audit trail
  booking.statusHistory.push({
    status: "Updated",
    changedBy: req.user._id,
  });
  
  await booking.save();

  //Send response
  res.status(200).json({
    status: "success",
    data: booking,
  });
});

//@desc   Get all bookings
//@route  GET /api/v1/bookings
//@access Private (admin,staff)
exports.getAllBookings = asyncHandler(async (req, res, next) => {
  let query;
  let filter = {};

  if (req.user.role === "admin") {
    // Admins see all bookings
    query = Booking.find()
      .populate("roomId")
      .populate({ path: "roomId", populate: { path: "hotel" } });
  } else if (req.user.role === "staff") {
    if (!req.user.hotelId) {
      return next(new ApiError("Staff must be assigned to a hotel", 400));
    }

    // Staff see only bookings for their hotel
    filter = { hotelId: req.user.hotelId };
    query = Booking.find(filter)
      .populate("roomId")
      .populate({ path: "roomId", populate: { path: "hotel" } });
  } else {
    return next(new ApiError("Not authorized to view booking"), 403);
  }

  // Count documents for pagination
  const countDocuments = await Booking.countDocuments(filter);

  // Apply API features
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate(countDocuments);

  const bookings = await features.query;

  res.status(200).json({
    status: "success",
    results: bookings.length,
    pagination: features.paginationResult,
    data: bookings,
  });
});

//@desc   Get specific booking
//@route  GET /api/v1/bookings/:id
//@access Public
exports.getBookingWithId = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("roomId")
    .populate({ path: "roomId", populate: { path: "hotel" } });

  if (!booking) return next(new ApiError("Booking not found", 404));

  // Role-based access control
  if (req.user.role === "admin") {
    // Admins can view any booking
  } else if (req.user.role === "staff") {
    if (req.user.hotelId.toString() !== booking.roomId.hotel.toString())
      return next(new ApiError("Not authorized to view this booking", 403));
  } else if (req.user.role === "user") {
    if (req.user._id.toString() !== booking.userId.toString())
      return next(new ApiError("Not authorized to view this booking", 403));
  } else {
    return next(new ApiError("Not authorized", 403));
  }

  res.status(200).json({
    status: "success",
    data: booking,
  });
});
