const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

//@desc   signup
exports.signupService = async ({ name, email, password }) => {
  const newUser = await User.create({ name, email, password });
  const token = generateToken(newUser._id);
  return { newUser, token };
};

//@desc   login
exports.loginService = async (email, password) => {
  //1-Check if user exists & password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  //2-Generate token
  const token = generateToken(user._id);

  return { user, token };
};

//@desc   Protect routes (make sure the user is logged in)
exports.protectService = async (authorization) => {
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) throw new ApiError("Not logged in", 401);

  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError("User not found", 401);

  if (user.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimestamp > decoded.iat) {
      throw new ApiError("Password changed recently. Please login again.", 401);
    }
  }
  return user;
};

//@desc
exports.allowedToService = (userRole, roles) => {
  if (!roles.includes(userRole)) {
    throw new ApiError("You are not allowed to access this route", 403);
  }
  return true;
};
