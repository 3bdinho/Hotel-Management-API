const express = require("express");
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
  .post(protect, allowedTo("admin", "staff", "user"), createBooking)
  .get(protect, allowedTo("admin", "staff"), getAllBookings);

router.get(
  "/:id",
  protect,
  allowedTo("admin", "staff", "user"),
  getBookingWithId
);

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

router.patch("/:id/cancel", protect, allowedTo("user"), cancelBooking);

module.exports = router;
