const express = require("express");
const {
  createRoomValidator,
  updateRoomValidator,
  deleteRoomValidator,
  getRoomValidator,
} = require("../utils/validators/roomValidator");

const {
  getRoom,
  getAllRooms,
  CreateRoom,
  updateRoom,
  deleteRoom,
} = require("../services/roomService");

const router = express.Router();

router.route("/").post(createRoomValidator, CreateRoom).get(getAllRooms);
router
  .route("/:id")
  .get(getRoomValidator, getRoom)
  .patch(updateRoomValidator, updateRoom)
  .delete(deleteRoomValidator, deleteRoom);

module.exports = router;
