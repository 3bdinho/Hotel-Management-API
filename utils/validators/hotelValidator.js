const { check, body } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.createHotelValidator = [
  check("name").notEmpty().withMessage("Room name required"),
  check("address").notEmpty().withMessage("Room address required"),
  check("rating").optional().isFloat({ max: 5, min: 1 }),
  validatorMiddleware,
];

exports.updateHotelValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
exports.deleteHotelValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
exports.getHotelValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
