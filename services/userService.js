const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const factory = require("./factoryHandler");
const sendResponse = require("../utils/sendResponse");

//@desc   Get all users
//@route  GET /api/v1/users
//@access Private
exports.getAllUsers = factory.getAll(User);

//@desc   Get one user by ID
//@route  GET /api/v1/users/:id
//@access Private
exports.getUser = factory.getOne(User);

//@desc   Create new user
//@route  POST /api/v1/users
//@access Private
exports.CreateUser = factory.createOne(User);

//@desc   Update user data
//@route  PATCH /api/v1/users/:id
//@access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return next(new ApiError("Request body cannot be empty", 400));

  const { id } = req.params;
  const disallowedFields = ["_id", "createdAt", "password", "role"];
  disallowedFields.forEach((field) => delete req.body[field]);

  const doc = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new ApiError(`${User.modelName} not found`, 404));
  }

  sendResponse(res, 200, doc);
});

//@desc   Update user password
//@route  PATCH /api/v1/users/:id
//@access Private
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return next(new ApiError("Request body cannot be empty", 400));

  const { id } = req.params;

  const doc = await User.findByIdAndUpdate(
    id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new ApiError(`${User.modelName} not found`, 404));
  }

  sendResponse(res, 200, doc);
});

//@desc   Delete user
//@route  PATCH /api/v1/users/:id
//@access Private
exports.deleteUser = factory.deleteOne(User);

//@desc Update user role (Admin only)
exports.changeUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));

  user.role = role;
  await user.save();

  res.status(200).json({
    status: "success",
    data: { user },
  });
};
