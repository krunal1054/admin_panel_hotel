const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userInfo: {
      name: String,
      email: String,
      phone: String,
    },

    packageType: {
      type: String,
      enum: ["top", "sub", "best"],
      required: true,
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    pricing: {
      totalAmount: Number,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "upcoming", "completed", "canceled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
