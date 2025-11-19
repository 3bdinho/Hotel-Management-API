const Room = require("../models/roomModel");
const factory = require("./factoryHandler");

//@desc   Get all rooms
exports.getAllRoomsService  = factory.getAll(Room);

//@desc   Get one romm by ID
exports.getRoomService = factory.getOne(Room);

//@desc   Create new room
exports.CreateRoomService = factory.createOne(Room);

//@desc   Update room data
exports.updateRoomService = factory.updateOne(Room);

//@desc   Delete room
exports.deleteRoomService = factory.deleteOne(Room);