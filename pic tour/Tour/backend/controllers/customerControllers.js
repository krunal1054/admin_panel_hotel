/*const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  res.json(await User.create({ ...req.body, password: hash }));
};

exports.checkLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  res.json(await User.find());
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/
const User = require("../models/customerModels");
const bcrypt = require("bcryptjs");
const Booking = require("../models/bookingModel");
const BookingStatus = require("../models/bookingStatus.model");
const TopPackage = require("../models/topPackagesModels");
const SubPackage = require("../models/subPackagesModels");
const BestPackage = require("../models/bestPackagesModels");

/* ================= REGISTER ================= */
exports.registerUser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  res.json(await User.create({ ...req.body, password: hash }));
};

/* ================= LOGIN ================= */
exports.checkLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.json(user);
};

/* ================= ALL USERS ================= */
exports.getAllUsers = async (req, res) => {
  res.json(await User.find());
};

/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

/* ================= PAID USERS + BOOKING ================= *//*
exports.getPaidUsers = async (req, res) => {
  try {
    const paidStatuses = await BookingStatus.find({
      paymentStatus: "paid",
    });

    const result = [];

    for (let status of paidStatuses) {
      const booking = await Booking.findById(status.bookingId)
        .populate("user");

      if (!booking || !booking.user) continue;

      let pkg = null;
      if (booking.packageType === "top")
        pkg = await TopPackage.findById(booking.packageId);
      if (booking.packageType === "sub")
        pkg = await SubPackage.findById(booking.packageId);
      if (booking.packageType === "best")
        pkg = await BestPackage.findById(booking.packageId);

      result.push({
        name: booking.user.name,
        email: booking.user.email,
        mobile: booking.userInfo?.phone || "-",
        packageName: pkg?.title || "Package",
        paymentStatus: "paid",
      });
    }

    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/
exports.getPaidUsers = async (req, res) => {
  try {
    const bookings = await Booking.find({ paymentStatus: "paid" })
      .populate("user")
      .sort({ createdAt: -1 });

    const data = [];

    for (let booking of bookings) {
      let pkg = null;

      if (booking.packageType === "top")
        pkg = await TopPackage.findById(booking.packageId);
      if (booking.packageType === "sub")
        pkg = await SubPackage.findById(booking.packageId);
      if (booking.packageType === "best")
        pkg = await BestPackage.findById(booking.packageId);

      data.push({
        name: booking.userInfo.name,
        email: booking.userInfo.email,
        mobile: booking.userInfo.phone,
        packageName: pkg?.title || "Package",
        paymentStatus: booking.paymentStatus,
      });
    }

    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch paid users" });
  }
};
