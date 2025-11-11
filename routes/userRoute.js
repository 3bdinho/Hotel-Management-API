const express = require("express");
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
} = require("../utils/validators/userValidator");

const {
  CreateUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../services/userService");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUserValidator, CreateUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
