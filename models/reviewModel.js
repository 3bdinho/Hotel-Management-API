const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.type.ObjectId,
      ref: "Room",
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    Comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ userId: 1, roomId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
