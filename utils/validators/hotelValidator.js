const { check, body } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.createHotelValidator = [
  check("name").notEmpty().withMessage("Room name required"),
  check("address").notEmpty().withMessage("Room address required"),
  check("rating").optional().isFloat({ max: 5, min: 1 }),
  validatorMiddleware,
];

exports.updateHotelValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, { req }) => {
      if (req.user.role === "staff") {
        if (!req.user.hotelId || val.toString() !== req.user.hotelId.toString())
          throw new Error("Staff are not allowed to update other hotels");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.deleteHotelValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom((val, { req }) => {
      if (req.user.role === "staff") {
        if (!req.user.hotelId || val.toString() !== req.user.hotelId.toString())
          throw new Error("Staff are not allowed to delete other hotels");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.getHotelValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
