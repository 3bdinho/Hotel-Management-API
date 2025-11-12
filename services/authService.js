const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

//@desc   signup
//@route  POST /api/v1/auth/signup
//@access puplic
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //1-Create user
  const newUser = await User.create({ name, email, password });

  //2-Generate token
  const token = generateToken(newUser._id);

  //3-Send response
  res.status(201).json({
    status: "success",
    data: { newUser },
    token,
  });
});

//@desc   login
//@route  POST /api/v1/auth/login
//@access puplic
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //1-Check if user exists & password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  //2-Generate token
  const token = generateToken(user._id);

  //3-Send response
  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});
