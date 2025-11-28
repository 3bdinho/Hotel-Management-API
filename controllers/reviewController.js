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

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Private
exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.findListOfReviews(req, res); 
  res.status(200).json(reviews);
});

// @desc    Delete review (soft delete)
// @route   DELETE /api/reviews/:id
// @access  Private (owner or admin)
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await reviewService.deleteReview(req.params.id, req.user);
  res.status(200).json({ message: "Review deleted successfully", review });
});