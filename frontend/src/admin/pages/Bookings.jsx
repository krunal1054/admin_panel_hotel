import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookingstatus");
      setData(res.data.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <p className="p-4 sm:p-6 text-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        All Bookings
      </h1>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Booking Status</th>
              <th className="p-3 text-left">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}

            {data.map((b) => (
              <tr
                key={b._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium whitespace-nowrap">
                  {b.packageName}
                </td>

                <td className="p-3 capitalize whitespace-nowrap">
                  {b.packageType}
                </td>

                <td className="p-3 font-semibold text-green-600 whitespace-nowrap">
                  ₹{b.amount}
                </td>

                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${b.bookingStatus === "completed"
                      ? "bg-green-100 text-green-700"
                      : b.bookingStatus === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : b.bookingStatus === "canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {b.bookingStatus}
                  </span>
                </td>

                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${b.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
