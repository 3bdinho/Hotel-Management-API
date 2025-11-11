const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

//@desc   signup 
//@route  POST /api/v1/auth/signup
//@access puplic
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //1-Create user
  const newUser = await User.create({ name, email, password });

  //2-Generate token
  const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  //3-Send response
  res.status(201).json({
    status: "success",
    data: { newUser },
    token,
  });
});
