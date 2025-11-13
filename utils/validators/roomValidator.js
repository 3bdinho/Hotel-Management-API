const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.createRoomValidator = [
  check("hotel")
    .notEmpty()
    .withMessage("Room must belong to hotel")
    .isMongoId()
    .withMessage("Invalid id format"),
  validatorMiddleware,
];

exports.updateRoomValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
exports.deleteRoomValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
exports.getRoomValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
