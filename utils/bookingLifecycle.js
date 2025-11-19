const cron = require("node-cron");
const asyncHandler = require("express-async-handler");

const Room = require("../models/roomModel");
const Booking = require("../models/bookingModel");
const { setMailOptions } = require("../utils/mailHelper");

//@desc   For checkIn/out
exports.autoLifecycleJob = asyncHandler(async () => {
  const now = new Date();

  //Auto check-in
  const toCheckIn = await Booking.find({
    status: "Confirmed",
    checkIn: { $lte: now },
  }).populate("userId");

  for (const booking of toCheckIn) {
    booking.status = "CheckedIn";
    booking.statusHistory.push({
      status: "CheckedIn",
      changedBy: null, //system
    });
    await booking.save();

    //Send notify
    const options = setMailOptions("CheckedIn", booking.userId.name);
    await sendEmail({
      to: booking.userId.email,
      subject: options.subject,
      html: options.html,
    });
  }

  // Auto check-out
  const toCheckOut = await Booking.find({
    status: "CheckedIn",
    checkOut: { $lte: now },
  });
  for (const booking of toCheckOut) {
    booking.status = "CheckedOut";
    booking.statusHistory.push({
      status: "CheckedOut",
      changedBy: "system",
      changedAt: new Date(),
    });
    await booking.save();

    const room = await Room.findById(booking.roomId);
    if (room && room.status !== "Maintenance") {
      room.status = "Available";
      await room.save();
    }

    //send notification
    const options = setMailOptions("CheckedOut", booking.userId.name);
    await sendEmail({
      to: booking.userId.email,
      subject: options.subject,
      html: options.html,
    });
  }
});
