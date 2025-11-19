const asyncHandler = require("express-async-handler");
const {
  signupService,
  loginService,
  protectService,
  allowedToService,
} = require("../services/authService");

//@desc   signup
//@route  POST /api/v1/auth/signup
//@access puplic
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { newUser, token } = await signupService({ name, email, password });
  res.status(201).json({ status: "success", data: { newUser }, token });
});

//@desc   login
//@route  POST /api/v1/auth/login
//@access puplic
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await loginService({ email, password });
  res.status(200).json({ status: "success", data: { user }, token });
});

//@desc   Protect routes (make sure the user is logged in)
exports.protect = asyncHandler(async (req, res, next) => {
  const user = await protectService(req.headers.authorization);
  req.user = user;
  next();
});

//@desc
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    allowedToService(req.user.role, roles);
    next();
  });
