const Booking = require("../models/bookingModel");

exports.getReports = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const paidBookings = await Booking.countDocuments({ paymentStatus: "paid" });
    const pendingBookings = await Booking.countDocuments({ paymentStatus: "pending" });

    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$pricing.totalAmount" } } }
    ]);

    const packageWise = await Booking.aggregate([
      {
        $group: {
          _id: "$packageType",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalBookings,
      paidBookings,
      pendingBookings,
      totalRevenue: revenueAgg[0]?.total || 0,
      packageWise
    });
  } catch (err) {
    res.status(500).json({ error: "Report failed" });
  }
};
