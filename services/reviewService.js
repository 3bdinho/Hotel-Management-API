const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");
const Review = require("../models/reviewModel");
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
