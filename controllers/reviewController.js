const asyncHandler = require("express-async-handler");
const reviewService = require("../services/reviewService");

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res) => {
  const { roomId, rate, comment } = req.body;
  const userId = req.user._id; 

  const review = await reviewService.createReviewService(userId, roomId, rate, comment);
  res.status(201).json(review);
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res) => {
  const review = await reviewService.findReview(req.params.id);
  res.status(200).json(review);
});