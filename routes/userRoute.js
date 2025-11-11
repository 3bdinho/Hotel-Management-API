const express = require("express");
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const {
  CreateUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  changeUserPassword,
} = require("../services/userService");

const router = express.Router();

router.patch(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router.route("/").get(getAllUsers).post(createUserValidator, CreateUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
