const {
  getAllRoomsService,
  getRoomService,
  CreateRoomService,
  updateRoomService,
  deleteRoomService,
} = require("../services/roomService");

//@desc   Get all rooms
//@route  GET /api/v1/rooms 
//@access public
exports.getAllRooms = getAllRoomsService;

//@desc   Get one romm by ID
//@route  GET /api/v1/rooms/:id
//@access Private
exports.getRoom = getRoomService;

//@desc   Create new room
//@route  POST /api/v1/rooms
//@access Private
exports.createRoom = this.CreateRoomService;

//@desc   Update room data
//@route  PATCH /api/v1/room/:id
//@access Private
exports.updateRoom = updateRoomService;

//@desc   Delete room
//@route  PATCH /api/v1/rooms/:id
//@access Private
exports.deleteRoom = deleteRoomService;
