/*import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // 🔹 Admin ke liye: saare bookings
      const res = await api.get("/booking/user"); 
      // NOTE: agar aapke backend me admin-all endpoint alag ho
      // to yahan uska path use karo (e.g. /booking/all)
      setBookings(res.data?.data || []);
    } catch (err) {
      setMessage("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, action) => {
    try {
      setMessage("");
      if (action === "pay") {
        await api.put(`/booking/pay/${bookingId}`);
      }
      if (action === "cancel") {
        await api.put(`/booking/cancel/${bookingId}`);
      }
      if (action === "complete") {
        await api.put(`/booking/complete/${bookingId}`);
      }
      setMessage("✅ Booking updated");
      fetchBookings();
    } catch {
      setMessage("❌ Action failed");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-4">Bookings</h1>

        {message && (
          <p className="mb-3 text-sm text-center text-blue-600">
            {message}
          </p>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Tour</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="text-center">
                    <td className="p-2 border">
                      {b.subPackageId?.title || "-"}
                    </td>
                    <td className="p-2 border">
                      {b.user?.name || "-"}
                    </td>
                    <td className="p-2 border">
                      ₹{b.pricing?.totalAmount || 0}
                    </td>
                    <td className="p-2 border capitalize">
                      {b.bookingStatus}
                    </td>
                    <td className="p-2 border space-x-2">
                      {b.bookingStatus === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(b._id, "pay")}
                            className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => updateStatus(b._id, "cancel")}
                            className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {b.bookingStatus === "upcoming" && (
                        <button
                          onClick={() => updateStatus(b._id, "complete")}
                          className="px-3 py-1 text-xs rounded bg-blue-600 text-white"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
*/
/*
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking/user");
      setBookings(res.data?.data || []);
    } catch (err) {
      setMessage("❌ Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, action) => {
    try {
      setMessage("");

      if (action === "pay") {
        await api.put(`/booking/pay/${bookingId}`);
      }
      if (action === "cancel") {
        await api.put(`/booking/cancel/${bookingId}`);
      }
      if (action === "complete") {
        await api.put(`/booking/complete/${bookingId}`);
      }

      setMessage("✅ Booking updated successfully");
      fetchBookings();
    } catch {
      setMessage("❌ Action failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-gray-500">
            Manage tour bookings, payments & status
          </p>
        </div>

        {message && (
          <div className="text-center text-sm text-blue-600">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          {loading ? (
            <p className="p-6 text-gray-500">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="p-6 text-gray-500">No bookings found</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Tour</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">
                      {b.subPackageId?.title || "Tour"}
                    </td>

                    <td className="p-3">
                      {b.user?.name || "Guest"}
                    </td>

                    <td className="p-3 font-semibold text-green-600">
                      ₹{b.pricing?.totalAmount || 0}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={b.bookingStatus} />
                    </td>

                    <td className="p-3 text-center space-x-2">
                      {b.bookingStatus === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(b._id, "pay")}
                            className="px-3 py-1 rounded text-xs
                                       bg-green-600 text-white hover:bg-green-700"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => updateStatus(b._id, "cancel")}
                            className="px-3 py-1 rounded text-xs
                                       bg-red-600 text-white hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {b.bookingStatus === "upcoming" && (
                        <button
                          onClick={() => updateStatus(b._id, "complete")}
                          className="px-3 py-1 rounded text-xs
                                     bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Complete
                        </button>
                      )}

                      {["completed", "canceled"].includes(
                        b.bookingStatus
                      ) && (
                        <span className="text-xs text-gray-400">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}


function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full capitalize
        ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}


*/
/*
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking/user");
      setBookings(res.data?.data || []);
    } catch (err) {
      setMessage("❌ Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, action) => {
    try {
      setMessage("");

      if (action === "pay") {
        await api.put(`/booking/pay/${bookingId}`);
      }
      if (action === "cancel") {
        await api.put(`/booking/cancel/${bookingId}`);
      }
      if (action === "complete") {
        await api.put(`/booking/complete/${bookingId}`);
      }

      setMessage("✅ Booking updated successfully");
      fetchBookings();
    } catch {
      setMessage("❌ Action failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-sm text-gray-500">
          Manage tour bookings, payments & status
        </p>
      </div>

      {message && (
        <div className="text-center text-sm text-blue-600">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="p-6 text-gray-500">No bookings found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Tour</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {b.subPackageId?.title || "Tour"}
                  </td>

                  <td className="p-3">
                    {b.user?.name || "Guest"}
                  </td>

                  <td className="p-3 font-semibold text-green-600">
                    ₹{b.pricing?.totalAmount || 0}
                  </td>

                  <td className="p-3">
                    <StatusBadge status={b.bookingStatus} />
                  </td>

                  <td className="p-3 text-center space-x-2">
                    {b.bookingStatus === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(b._id, "pay")}
                          className="px-3 py-1 rounded text-xs bg-green-600 text-white"
                        >
                          Mark Paid
                        </button>
                        <button
                          onClick={() => updateStatus(b._id, "cancel")}
                          className="px-3 py-1 rounded text-xs bg-red-600 text-white"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {b.bookingStatus === "upcoming" && (
                      <button
                        onClick={() => updateStatus(b._id, "complete")}
                        className="px-3 py-1 rounded text-xs bg-blue-600 text-white"
                      >
                        Complete
                      </button>
                    )}

                    {["completed", "canceled"].includes(
                      b.bookingStatus
                    ) && (
                      <span className="text-xs text-gray-400">
                        No Action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full capitalize ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
*/
/*
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookingstatus");
      setBookings(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Booking Status</th>
              <th className="p-3 text-left">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="p-3 font-medium">{b.package}</td>
                <td className="p-3">{b.type}</td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{b.amount}
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                    {b.bookingStatus}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                    {b.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
*//*

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Booking Status</th>
            <th className="p-3 text-left">Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="p-3">{b.packageName}</td>
              <td className="p-3 capitalize">{b.packageType}</td>
              <td className="p-3 text-green-600 font-semibold">
                ₹{b.amount}
              </td>
              <td className="p-3">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {b.bookingStatus}
                </span>
              </td>
              <td className="p-3">
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {b.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/

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
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <table className="w-full text-sm">
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
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          )}

          {data.map((b) => (
            <tr key={b._id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{b.packageName}</td>

              <td className="p-3 capitalize">{b.packageType}</td>

              <td className="p-3 font-semibold text-green-600">
                ₹{b.amount}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    b.bookingStatus === "completed"
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

              <td className="p-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    b.paymentStatus === "paid"
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
  );
}
