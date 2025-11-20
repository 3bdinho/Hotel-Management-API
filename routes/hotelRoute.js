const express = require("express");
const {
  createHotelValidator,
  updateHotelValidator,
  deleteHotelValidator,
  getHotelValidator,
} = require("../utils/validators/hotelValidator");

const {
  getHotel,
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const { protect, allowedTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(protect, allowedTo("admin"), createHotelValidator, createHotel)
  .get(getAllHotels);
router
  .route("/:id")
  .get(getHotelValidator, getHotel)
  .patch(
    protect,
    allowedTo("admin", "staff"),
    updateHotelValidator,
    updateHotel
  )
  .delete(allowedTo("admin", "staff"), deleteHotelValidator, deleteHotel);

module.exports = router;
