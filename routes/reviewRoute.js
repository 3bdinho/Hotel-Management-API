const express = require("express");
const {
  createReview,
  getReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, allowedTo } = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(protect, allowedTo("admin", "staff"), getReviews)
  .post(protect, allowedTo("user"), createReview);

router
  .route("/:id")
  .get(protect, allowedTo("admin", "staff", "user"), getReview)
  .delete(protect, allowedTo("admin", "staff", "user"), protect, deleteReview);

module.exports = router;
