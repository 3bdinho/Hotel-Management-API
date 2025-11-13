const Room = require("../models/roomModel");
const factory = require("./factoryHandler");

//@desc   Get all rooms
//@route  GET /api/v1/rooms 
//@access public
exports.getAllRooms = factory.getAll(Room);

//@desc   Get one romm by ID
//@route  GET /api/v1/rooms/:id
//@access Private
exports.getRoom = factory.getOne(Room);

//@desc   Create new room
//@route  POST /api/v1/rooms
//@access Private
exports.CreateRoom = factory.createOne(Room);

//@desc   Update room data
//@route  PATCH /api/v1/room/:id
//@access Private
exports.updateRoom = factory.updateOne(Room);

//@desc   Delete room
//@route  PATCH /api/v1/rooms/:id
//@access Private
exports.deleteRoom = factory.deleteOne(Room);