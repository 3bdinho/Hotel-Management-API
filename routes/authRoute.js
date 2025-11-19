const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { login,signup } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

module.exports = router;
