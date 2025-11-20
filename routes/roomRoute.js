const express = require("express");
const {
  createRoomValidator,
  updateRoomValidator,
  deleteRoomValidator,
  getRoomValidator,
} = require("../utils/validators/roomValidator");

const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { protect, allowedTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(protect, allowedTo("admin", "staff"), createRoomValidator, createRoom)
  .get(protect, allowedTo("admin,user,staff"), getAllRooms);
router
  .route("/:id")
  .get(protect, allowedTo("admin", "staff"), getRoomValidator, getRoom)
  .patch(protect, allowedTo("admin", "staff"), updateRoomValidator, updateRoom)
  .delete(
    protect,
    allowedTo("admin", "staff"),
    deleteRoomValidator,
    deleteRoom
  );

module.exports = router;
