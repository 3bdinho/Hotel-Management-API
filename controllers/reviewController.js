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