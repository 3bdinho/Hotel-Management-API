const express = require("express");
const {
  createBooking,
  updateBookingStatus,
} = require("../services/bookingService");

const { protect, allowedTo } = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .post(protect, allowedTo("admin", "staff", "user"), createBooking);

module.exports = router;
