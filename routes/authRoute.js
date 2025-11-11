const express = require("express");
const { signupValidator } = require("../utils/validators/authValidator");

const { signup } = require("../services/authService");

const router = express.Router();

router.post("/signup", signupValidator, signup);

module.exports = router;
