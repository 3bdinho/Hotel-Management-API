const { check } = require("express-validator");

const Room = require("../../models/roomModel");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.createRoomValidator = [
  check("hotel")
    .notEmpty()
    .withMessage("Room must belong to hotel")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, { req }) => {
      // Staff can only create rooms in their assigned hotel
      if (req.user.role === "staff") {
        if (!req.user.hotelId || val.toString() !== req.user.hotelId.toString())
          throw new Error(
            "Staff are not allowed to create rooms in other hotels"
          );
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateRoomValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom(async (val, { req }) => {
      const room = await Room.findById(val);
      if (!room) {
        throw new Error("Room not found");
      }

      // Staff can only create rooms in their assigned hotel
      if (req.user.role === "staff") {
        if (
          !req.user.hotelId ||
          room.hotel.toString() !== req.user.hotelId.toString()
        )
          throw new Error(
            "Staff are not allowed to update  rooms in other hotels"
          );
      }
      return true;
    }),
  validatorMiddleware,
];
exports.deleteRoomValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom(async (val, { req }) => {
      const room = await Room.findById(val);
      if (!room) {
        throw new Error("Room not found");
      }

      // Staff can only create rooms in their assigned hotel
      if (req.user.role === "staff") {
        if (
          !req.user.hotelId ||
          room.hotel.toString() !== req.user.hotelId.toString()
        )
          throw new Error(
            "Staff are not allowed to update  rooms in other hotels"
          );
      }
      return true;
    }),
  validatorMiddleware,
];
exports.getRoomValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
