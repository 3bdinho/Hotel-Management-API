const express = require("express");
const {
  createBooking,
  updateBookingStatus,
  updateBooking,
} = require("../services/bookingService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .post(protect, allowedTo("admin", "staff", "user"), createBooking);

router.patch(
  "/:id/updateStatus",
  protect,
  allowedTo("admin", "staff"),
  updateBookingStatus
);

router.patch(
  "/:id",
  protect,
  allowedTo("admin", "staff", "user"),
  updateBooking
);

module.exports = router;