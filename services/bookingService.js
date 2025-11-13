const asyncHandler = require("express-async-handler");

const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const ApiError = require("../utils/ApiError");

exports.createBooking = asyncHandler(async (req, res, next) => {
  const { roomId, hotelId, userId, checkIn, checkOut, price } = req.body;

  //check if room exist
  const room = await Room.findById(roomId);
  if (!room) return next(new ApiError("Room not found", 404));

  // Check overlapping
  const overlapping = await Booking.findOne({
    roomId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  });
  if (overlapping) {
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
