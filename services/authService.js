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

//@desc   Protect routes (make sure the user is logged in)
exports.protect = asyncHandler(async (req, res, next) => {
  //1-Check if token exist
  let token;

  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer"))
    token = authorization.split(" ")[1];

  if (!token)
    return next(
      new ApiError(
        "You are not logged in. Please log in to get access to this route.",
        401
      )
    );

  //2-Verify token
  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  //3-Check if user exist
  const user = await User.findById(decoded._id);
  if (!user)
    return next(new ApiError("The user that belong to this token ", 401));

  //4-Check if user change his password after token created
  if (user.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    //Password changed after token created (error)
    if (passChangedTimestamp > decoded.iat)
      return next(
        new ApiError(
          "User recently change his password. please login again...",
          401
        )
      );
  }

  req.user = user;
  next();
});

//@desc
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles))
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );

    next();
  });
