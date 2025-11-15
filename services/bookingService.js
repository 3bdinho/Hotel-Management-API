const asyncHandler = require("express-async-handler");

const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const Hotel = require("../models/hotelModel");
const ApiError = require("../utils/ApiError");

//@desc Helper: Check if room is available for given dates
const isRoomAvailable = async (roomId, checkIn, checkOut) => {
  const overlap = await Booking.findOne({
    roomId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  }).lean();

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
  if (isNaN(start).getTime() || isNaN(end).getTime()) return false;

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

  //2-Validate the status sent in the request
  const validStatuses = ["Pending", "Confirmed", "Cancelled"];
  if (!validStatuses.includes(req.body.status)) {
    return next(new ApiError("Invalid booking status", 400));
  }

  //3-Fetch the room
  const room = await Room.findById(booking.roomId);
  if (!room) return next(new ApiError("Room not found", 404));

  //4-Check if the room is under maintenance before confirming
  if (room.status === "Maintenance" && booking.status === "Confirmed")
    return next(
      new ApiError("Cannot confirm booking, room under maintenance", 400)
    );

  //5-Update booking status
  booking.status = req.body.status;
  await booking.save();

  //6-Update room status based on booking status
  if (booking.status === "Confirmed") room.status = "booked";
  else if (booking.status === "Cancelled" && room.status !== "Maintenance")
    room.status = "Available";

  await room.save();

  //7-Send response
  res.status(200).json({
    status: "success",
    data: booking,
  });
});
