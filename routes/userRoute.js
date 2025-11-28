const express = require("express");
const multer = require("multer");

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
  uploadUserImage,
} = require("../services/userService");

const { protect, allowedTo } = require("../controllers/authController");
const router = express.Router();

const upload = multer({ dest: "uploads/user" });

router.patch(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router.use(protect, allowedTo("admin"));

router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, createUserValidator, CreateUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
