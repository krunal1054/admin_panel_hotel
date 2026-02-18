export default function TotalBookingChart({ total }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold mb-2">Total Bookings</h2>
      <p className="text-3xl font-bold">{total}</p>
    </div>
  );
}
