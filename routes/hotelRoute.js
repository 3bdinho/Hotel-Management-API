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
  CreateHotel,
  updateHotle,
  deleteHotel,
} = require("../services/hotelService");

const router = express.Router();

router.route("/").post(createHotelValidator, CreateHotel).get(getAllHotels);
router
  .route("/:id")
  .get(getHotelValidator, getHotel)
  .patch(updateHotelValidator, updateHotle)
  .delete(deleteHotelValidator, deleteHotel);

module.exports = router;
