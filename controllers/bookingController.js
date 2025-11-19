const asyncHandler = require("express-async-handler");
const {
  createBookingService,
  updateBookingStatusService,
  updateBookingService,
  getAllBookingsService,
  getBookingWithIdService,
  cancelBookingService,
} = require("../services/bookingService");

//@desc   Create new book
//@route  POST /api/v1/bookings
//@access Public
exports.createBooking = asyncHandler(async (req, res, next) => {
  const newBooking = await createBookingService(req, res, next);
  res.status(201).json({ status: "success", data: newBooking });
});

//@desc   Update book status
//@route  POST /api/v1/bookings/:id/updateStatus
//@access Private (admin,staff)
exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  const booking = await updateBookingStatusService(req, res, next);
  res.status(200).json({ status: "success", data: booking });
});

exports.updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await updateBookingService(req, res, next);
  res.status(200).json({ status: "success", data: booking });
});

//@desc   Get all bookings
//@route  GET /api/v1/bookings
//@access Private (admin,staff)
exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const { bookings, pagination } = await getAllBookingsService(req, res, next);
  res.status(200).json({
    status: "success",
    results: bookings.length,
    pagination,
    data: bookings,
  });
});

//@desc   Get specific booking
//@route  GET /api/v1/bookings/:id
//@access Public
exports.getBookingWithId = asyncHandler(async (req, res, next) => {
  const booking = await getBookingWithIdService(req, res, next);
  res.status(200).json({ status: "success", data: booking });
});

//@desc   Cancel a booking
//@route  POST /api/v1/bookings/:id/cancel
//@access Private (user)
exports.cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await cancelBookingService(req, res, next);
  res.status(200).json({
    status: "success",
    message: "Booking cancelled successfully",
    data: booking,
  });
});
