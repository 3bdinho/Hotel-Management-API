const User = require("../models/userModel");
const factory = require("./factoryHandler");

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

//@desc   Update user 
//@route  PATCH /api/v1/users/:id
//@access Private
exports.updateUser = factory.updateOne(User);

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
