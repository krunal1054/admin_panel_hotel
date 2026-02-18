export default function AverageRevenueChart({ totalRevenue = 0, totalBookings = 0 }) {
  const avg =
    totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold mb-2">Avg Revenue / Booking</h2>
      <p className="text-3xl font-bold text-indigo-600">₹{avg}</p>
      <p className="text-xs text-gray-500 mt-1">
        Based on {totalBookings} bookings
      </p>
    </div>
  );
}
