const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name required"],
    },
    description: String,
    address: {
      type: String,
      required: [true, "Hotel address required"],
    },
    phone: String,
    email: String,
    rating: { type: Number, default: 0, max: 5, min: 0 },
    amenities: [String],
    images: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);
