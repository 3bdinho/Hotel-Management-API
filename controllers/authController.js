const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { loginService } = require("../services/authService");
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
  const { user, token } = await loginService(email, password);
  //Send response
  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});
