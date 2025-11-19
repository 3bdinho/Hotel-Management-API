const Hotel = require("../models/hotelModel");
const factory = require("./factoryHandler");

exports.getAllHotelsService = factory.getAll(Hotel);

exports.getHotelService = factory.getOne(Hotel);

exports.createHotelService = factory.createOne(Hotel);

exports.updateHotelService = factory.updateOne(Hotel);

exports.deleteHotelService = factory.deleteOne(Hotel);
