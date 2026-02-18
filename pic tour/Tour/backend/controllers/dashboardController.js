const Booking = require("../models/bookingModel");

exports.getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    const pending = bookings.filter(b => b.bookingStatus === "pending").length;
    const upcoming = bookings.filter(b => b.bookingStatus === "upcoming").length;
    const completed = bookings.filter(b => b.bookingStatus === "completed").length;
    const canceled = bookings.filter(b => b.bookingStatus === "canceled").length;

    const revenue = bookings
      .filter(b => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0);

    res.json({
      stats: {
        totalBookings: bookings.length,
        pending,
        upcoming,
        completed,
        canceled,
        revenue,
      },
      recentBookings: bookings.slice(0, 5),
      bookingChart: [
        { name: "Pending", value: pending },
        { name: "Upcoming", value: upcoming },
        { name: "Completed", value: completed },
        { name: "Canceled", value: canceled },
      ],
      revenueChart: [
        { name: "Revenue", value: revenue },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: "Dashboard data failed" });
  }
};
