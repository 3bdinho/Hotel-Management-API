const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
      required: [true, "Room must belong to hotel"],
    },

    type: {
      type: String,
      enum: ["single", "double", "suite"],
      default: "single",
    },

    price: {
      type: Number,
      required: [true, "Romm price required"],
    },

    capacity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Available", "Booked", "Maintenance"],
      default: "available",
    },

    images: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomSchema);
