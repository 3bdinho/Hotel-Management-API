const express = require("express");
// const {
//   createUserValidator,
//   updateUserValidator,
//   deleteUserValidator,
//   getUserValidator,
//   changeUserPasswordValidator,
// } = require("../utils/validators/userValidator");

const {
  getHotel,
  getAllHotels,
  CreateHotel,
  updateHotle,
  deleteHotel,
} = require("../services/hotelService");

const router = express.Router();

router.route("/").post(CreateHotel).get(getAllHotels);
router.route("/:id").get(getHotel).patch(updateHotle).delete(deleteHotel);

module.exports = router;