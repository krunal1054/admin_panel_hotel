const Booking = require("../models/bookingModel");
const User = require("../models/customerModels");

exports.createBooking = async (req, res) => {
  try {
    const { userInfo } = req.body;

    // 🔥 Find or create user
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      user = await User.create({
        name: userInfo.name,
        email: userInfo.email,
        password: "temp1234",
      });
    }

    const booking = await Booking.create({
      ...req.body,
      user: user._id,
      userInfo,
      paymentStatus: "paid",
      bookingStatus: "upcoming",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
};

/* ================= GET USER BOOKINGS ================= */
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("subPackageId");
    res.json(bookings);
  } catch {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

/* ================= MARK PAYMENT PAID ================= */
exports.markPaymentComplete = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { paymentStatus: "paid" },
      { new: true }
    );
    res.json(booking);
  } catch {
    res.status(500).json({ error: "Payment update failed" });
  }
};

/* ================= CANCEL BOOKING ================= */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { bookingStatus: "canceled" },
      { new: true }
    );
    res.json(booking);
  } catch {
    res.status(500).json({ error: "Cancel failed" });
  }
};

/* ================= MARK COMPLETED ================= */
exports.markCompleted = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { bookingStatus: "completed" },
      { new: true }
    );
    res.json(booking);
  } catch {
    res.status(500).json({ error: "Complete update failed" });
  }
};

