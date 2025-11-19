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

const router = express.Router();

router.route("/").post(createHotelValidator, createHotel).get(getAllHotels);
router
  .route("/:id")
  .get(getHotelValidator, getHotel)
  .patch(updateHotelValidator, updateHotel)
  .delete(deleteHotelValidator, deleteHotel);

module.exports = router;
