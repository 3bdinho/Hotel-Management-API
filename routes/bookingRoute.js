const express = require("express");

const {
  createBookingValidator,
  updateBookingStatusValidator,
  updateBookingValidator,
  getBookingByIdValidator,
  cancelBookingValidator,
} = require("../utils/validators/bookingValidator");

const {
  createBooking,
  updateBookingStatus,
  updateBooking,
  getAllBookings,
  getBookingWithId,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect, allowedTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "staff", "user"),
    createBookingValidator,
    createBooking
  )
  .get(protect, allowedTo("admin", "staff"), getAllBookings);

router.get(
  "/:id",
  protect,
  allowedTo("admin", "staff", "user"),
  getBookingByIdValidator,
  getBookingWithId
);

router.patch(
  "/:id/updateStatus",
  protect,
  allowedTo("admin", "staff"),
  updateBookingStatusValidator,
  updateBookingStatus
);

router.patch(
  "/:id",
  protect,
  allowedTo("admin", "staff", "user"),
  updateBookingValidator,
  updateBooking
);

router.patch(
  "/:id/cancel",
  protect,
  allowedTo("user"),
  cancelBookingValidator,
  cancelBooking
);

module.exports = router;
