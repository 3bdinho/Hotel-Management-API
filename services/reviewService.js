const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");
const Review = require("../models/reviewModel");
const factory = require("../services/factoryHandler");
exports.createReviewService = async (userId, roomId, rate, comment = "") => {
  //Prevent duplicate reviews by same user for same room
  const existingReview = await Review.findOne({ roomId, userId });
  if (existingReview) throw new Error("You have already reviewed this room.");

  // Create review if there is no existing review
  const review = await Review.create({
    userId,
    roomId,
    rate,
    comment,
  });

  return review;
};

exports.findReview = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review || !review.isActive) throw new Error("No review found.");

  return review;
};

exports.findListOfReviews = factory.getAll(Review);

exports.deleteReview = async (reviewId, user) => {
  // Find the review first
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error("Review not found.");
  }

  // Authorization check
  if (user._id.toString() !== review.userId.toString() && user.role !== "admin")
    throw new Error("You're not allowed to delete this review.");

  // Soft delete
  review.isActive = false;
  await review.save();

  return review;
};
