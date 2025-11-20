const {
  getAllHotelsService,
  getHotelService,
  createHotelService,
  updateHotelService,
  deleteHotelService,
} = require("../services/hotelService");

//@desc   Get all Hotels
//@route  GET /api/v1/hotels
//@access public
exports.getAllHotels = getAllHotelsService;

//@desc   Get one hotel by ID
//@route  GET /api/v1/hotels/:id
//@access Private
exports.getHotel = getHotelService;

//@desc   Create new hotel
//@route  POST /api/v1/hotels
//@access Private
exports.createHotel = createHotelService;

//@desc   Update Hotel data
//@route  PATCH /api/v1/hotel/:id
//@access Private
exports.updateHotel = updateHotelService;

//@desc   Delete hotel
//@route  PATCH /api/v1/hotels/:id
//@access Private
exports.deleteHotel = deleteHotelService;
