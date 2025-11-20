const { check, body } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");
const Room = require("../../models/roomModel");
const Hotel = require("../../models/hotelModel");
const User = require("../../models/userModel");

// Create Booking Validator
exports.createBookingValidator = [
  check("roomId")
    .notEmpty()
    .withMessage("Room ID is required")
    .isMongoId()
    .withMessage("Invalid Room ID format")
    .custom(async (val, { req }) => {
      const room = await Room.findById(val);
      if (!room) throw new Error("Room not found");
      if (room.status === "maintenance")
        throw new Error("Room is under maintenance");
      return true;
    }),

  check("hotelId")
    .notEmpty()
    .withMessage("Hotel ID is required")
    .isMongoId()
    .withMessage("Invalid Hotel ID format")
    .custom(async (val, { req }) => {
      const hotel = await Hotel.findById(val);
      if (!hotel) throw new Error("Hotel not found");

      const room = await Room.findById(req.body.roomId);
      if (room && room.hotel.toString() !== val)
        throw new Error("Room does not belong to this hotel");
      return true;
    }),

  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID format")
    .custom(async (val) => {
      const user = await User.findById(val);
      if (!user) throw new Error("User not found");
      return true;
    }),

  check("checkIn")
    .notEmpty()
    .withMessage("Check-in date is required")
    .isISO8601()
    .withMessage("Invalid check-in date format"),

  check("checkOut")
    .notEmpty()
    .withMessage("Check-out date is required")
    .isISO8601()
    .withMessage("Invalid check-out date format")
    .custom((val, { req }) => {
      const checkIn = new Date(req.body.checkIn);
      const checkOut = new Date(val);
      if (checkIn >= checkOut)
        throw new Error("Check-out must be after check-in");
      return true;
    }),

  validatorMiddleware,
];

// Update Booking Status Validator
exports.updateBookingStatusValidator = [
  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Confirmed", "Cancelled", "CheckedIn", "CheckedOut"])
    .withMessage("Invalid status value"),
  validatorMiddleware,
];

// Update Booking Data Validator
exports.updateBookingValidator = [
  check("checkIn")
    .optional()
    .isISO8601()
    .withMessage("Invalid check-in date format"),
  check("checkOut")
    .optional()
    .isISO8601()
    .withMessage("Invalid check-out date format")
    .custom((val, { req }) => {
      if (req.body.checkIn) {
        const checkIn = new Date(req.body.checkIn);
        const checkOut = new Date(val);
        if (checkIn >= checkOut)
          throw new Error("Check-out must be after check-in");
      }
      return true;
    }),
  check("roomId").optional().isMongoId().withMessage("Invalid Room ID format"),
  validatorMiddleware,
];

// Get Booking By ID Validator
exports.getBookingByIdValidator = [
  check("id")
    .notEmpty()
    .withMessage("Booking ID is required")
    .isMongoId()
    .withMessage("Invalid Booking ID format"),
  validatorMiddleware,
];

// Cancel Booking Validator
exports.cancelBookingValidator = [
  check("id")
    .notEmpty()
    .withMessage("Booking ID is required")
    .isMongoId()
    .withMessage("Invalid Booking ID format"),
  validatorMiddleware,
];
