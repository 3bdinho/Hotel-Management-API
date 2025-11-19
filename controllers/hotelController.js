const {
  getAllHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../services/hotelService");

//@desc   Get all Hotels
//@route  GET /api/v1/hotels
//@access public
exports.getAllHotels = getAllHotels;

//@desc   Get one hotel by ID
//@route  GET /api/v1/hotels/:id
//@access Private
exports.getHotel = getHotel;

//@desc   Create new hotel
//@route  POST /api/v1/hotels
//@access Private
exports.createHotel = createHotel;

//@desc   Update Hotel data
//@route  PATCH /api/v1/hotel/:id
//@access Private
exports.updateHotel = updateHotel;

//@desc   Delete hotel
//@route  PATCH /api/v1/hotels/:id
//@access Private
exports.deleteHotel = deleteHotel;
