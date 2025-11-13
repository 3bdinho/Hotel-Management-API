const Hotel = require("../models/hotelModel");
const factory = require("./factoryHandler");

//@desc   Get all Hotels
//@route  GET /api/v1/hotels 
//@access public
exports.getAllHotels = factory.getAll(Hotel);

//@desc   Get one hotel by ID
//@route  GET /api/v1/hotels/:id
//@access Private
exports.getHotel = factory.getOne(Hotel);

//@desc   Create new hotel
//@route  POST /api/v1/hotels
//@access Private
exports.CreateHotel = factory.createOne(Hotel);

//@desc   Update Hotel data
//@route  PATCH /api/v1/hotel/:id
//@access Private
exports.updateHotle = factory.updateOne(Hotel);

//@desc   Delete hotel
//@route  PATCH /api/v1/hotels/:id
//@access Private
exports.deleteHotel = factory.deleteOne(Hotel);