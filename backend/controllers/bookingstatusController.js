const Booking = require("../models/bookingModel");
const BookingStatus = require("../models/bookingStatus.model");
const TopPackage = require("../models/topPackagesModels");
const SubPackage = require("../models/subPackagesModels");
const BestPackage = require("../models/bestPackagesModels");
const User = require("../models/customerModels");

/* ================= CREATE BOOKING + INITIAL STATUS ================= */
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    await BookingStatus.create({
      bookingId: booking._id,
      bookingStatus: "pending",
      paymentStatus: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL BOOKINGS (ADMIN) ================= */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    const finalData = [];

    for (let b of bookings) {
      let pkg = null;

      if (b.packageType === "top")
        pkg = await TopPackage.findById(b.packageId);

      if (b.packageType === "sub")
        pkg = await SubPackage.findById(b.packageId);

      if (b.packageType === "best")
        pkg = await BestPackage.findById(b.packageId);

      const latestStatus = await BookingStatus.findOne({
        bookingId: b._id,
      }).sort({ createdAt: -1 });

      finalData.push({
        _id: b._id,
        packageName: pkg?.title || "Package",
        packageType: b.packageType,
        amount: b.pricing?.totalAmount || 0,
        bookingStatus: latestStatus?.bookingStatus || "pending",
        paymentStatus: latestStatus?.paymentStatus || "pending",
      });
    }

    res.json({ data: finalData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE BOOKING STATUS ================= */
exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { bookingStatus, paymentStatus } = req.body;

  try {
    await BookingStatus.create({
      bookingId,
      bookingStatus,
      paymentStatus,
      updatedBy: "admin",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* ================= 🔥 GET PAID USERS + BOOKINGS ================= */
exports.getPaidUsers = async (req, res) => {
  try {
    const statuses = await BookingStatus.find({ paymentStatus: "paid" })
      .sort({ createdAt: -1 })
      .populate({
        path: "bookingId",
        populate: { path: "user", model: "User" },
      });

    const result = [];

    for (let s of statuses) {
      const booking = s.bookingId;
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
        mobile: booking.user.mobile_no || "-",
        packageName: pkg?.title || "Package",
        packageType: booking.packageType,
        amount: booking.pricing?.totalAmount || 0,
        paymentStatus: "paid",
        bookingDate: booking.createdAt,
      });
    }

    res.json({ users: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};