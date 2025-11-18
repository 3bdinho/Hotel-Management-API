const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: Number,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    statusHistory: [
      {
        status: "confirmed",
        changedBy: userId,
        time: Date.now(),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookingSchema);
