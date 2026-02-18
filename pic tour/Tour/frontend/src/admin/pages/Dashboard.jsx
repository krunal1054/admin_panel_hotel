/*import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <input
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "New Booking", value: "8,461" },
            { label: "Check In", value: "753" },
            { label: "Check Out", value: "516" },
            { label: "Revenue", value: "₹4.8L" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border"
            >
              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Recent Bookings</h2>

            {[
              "Queen Bed A-1234",
              "Deluxe Room B-1324",
              "King Big C-2445"
            ].map((room, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">{room}</p>
                  <span className="text-xs text-gray-500">12 min ago</span>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-600">
                  Confirmed
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Today Stats</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Available Rooms</p>
                <p className="font-bold text-xl">683</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sold Out</p>
                <p className="font-bold text-xl">129</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="font-bold text-xl">2,342</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
*/
/*
import AdminLayout from "../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <input
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "New Booking", value: "8,461" },
          { label: "Upcoming Tours", value: "753" },
          { label: "Completed Tours", value: "516" },
          { label: "Revenue", value: "₹4.8L" }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm border"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-4">Recent Bookings</h2>

          {[
            "Goa Adventure Tour",
            "Manali Snow Package",
            "Kerala Backwaters"
          ].map((tour, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div>
                <p className="font-medium">{tour}</p>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-600">
                Confirmed
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-4">Today Stats</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Tours</p>
              <p className="font-bold text-xl">683</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Bookings</p>
              <p className="font-bold text-xl">129</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="font-bold text-xl">2,342</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
*/
/*
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingChartData, setBookingChartData] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // ⚠️ NOTE:
      // Agar admin ke liye all-bookings ka endpoint ho
      // to yahan "/booking/all" use kar sakte ho
      const res = await api.get("/booking/user");
      const bookings = res.data?.data || [];

      const pending = bookings.filter(b => b.bookingStatus === "pending").length;
      const upcoming = bookings.filter(b => b.bookingStatus === "upcoming").length;
      const completed = bookings.filter(b => b.bookingStatus === "completed").length;
      const canceled = bookings.filter(b => b.bookingStatus === "canceled").length;

      const revenue = bookings.reduce(
        (sum, b) => sum + (b.pricing?.totalAmount || 0),
        0
      );

      setStats({
        totalBookings: bookings.length,
        pending,
        upcoming,
        completed,
        canceled,
        revenue,
      });

      setRecentBookings(bookings.slice(0, 5));

      setBookingChartData([
        { name: "Pending", value: pending },
        { name: "Upcoming", value: upcoming },
        { name: "Completed", value: completed },
        { name: "Canceled", value: canceled },
      ]);

      setRevenueChartData([
        { name: "Total Revenue", revenue }
      ]);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <StatCard title="Total Bookings" value={stats.totalBookings} />
          <StatCard title="Pending" value={stats.pending} />
          <StatCard title="Upcoming" value={stats.upcoming} />
          <StatCard title="Completed" value={stats.completed} />
          <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BookingStatusChart data={bookingChartData} />
          <RevenueChart data={revenueChartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Recent Bookings</h2>

          {loading ? (
            <p>Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border-b pb-3 last:border-none"
                >
                  <div>
                    <p className="font-medium">
                      {b.subPackageId?.title || "Tour"}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full capitalize ${
                      b.bookingStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.bookingStatus === "upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : b.bookingStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingChartData, setBookingChartData] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/booking/user");
      const bookings = res.data?.data || [];

      const pending = bookings.filter(b => b.bookingStatus === "pending").length;
      const upcoming = bookings.filter(b => b.bookingStatus === "upcoming").length;
      const completed = bookings.filter(b => b.bookingStatus === "completed").length;
      const canceled = bookings.filter(b => b.bookingStatus === "canceled").length;

      const revenue = bookings.reduce(
        (sum, b) => sum + (b.pricing?.totalAmount || 0),
        0
      );

      setStats({
        totalBookings: bookings.length,
        pending,
        upcoming,
        completed,
        canceled,
        revenue,
      });

      setRecentBookings(bookings.slice(0, 5));

      setBookingChartData([
        { name: "Pending", value: pending },
        { name: "Upcoming", value: upcoming },
        { name: "Completed", value: completed },
        { name: "Canceled", value: canceled },
      ]);

      setRevenueChartData([
        { name: "Revenue", revenue }
      ]);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Overview of bookings & revenue
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard title="Total Bookings" value={stats.totalBookings} color="blue" />
          <StatCard title="Pending" value={stats.pending} color="yellow" />
          <StatCard title="Upcoming" value={stats.upcoming} color="indigo" />
          <StatCard title="Completed" value={stats.completed} color="green" />
          <StatCard title="Revenue" value={`₹${stats.revenue}`} color="emerald" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold mb-4">Booking Status</h2>
            <BookingStatusChart data={bookingChartData} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold mb-4">Revenue</h2>
            <RevenueChart data={revenueChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Recent Bookings</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet</p>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border-b pb-3 last:border-none"
                >
                  <div>
                    <p className="font-medium">
                      {b.subPackageId?.title || "Tour Package"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <StatusBadge status={b.bookingStatus} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}


function StatCard({ title, value, color }) {
  const colors = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    indigo: "text-indigo-600",
    green: "text-green-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </h2>
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
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

/import {
  FaClipboardList,
  FaClock,
  FaPlaneDeparture,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingChartData, setBookingChartData] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/booking/user");
      const bookings = res.data?.data || [];

      const pending = bookings.filter(b => b.bookingStatus === "pending").length;
      const upcoming = bookings.filter(b => b.bookingStatus === "upcoming").length;
      const completed = bookings.filter(b => b.bookingStatus === "completed").length;
      const canceled = bookings.filter(b => b.bookingStatus === "canceled").length;

      const revenue = bookings.reduce(
        (sum, b) => sum + (b.pricing?.totalAmount || 0),
        0
      );

      setStats({
        totalBookings: bookings.length,
        pending,
        upcoming,
        completed,
        canceled,
        revenue,
      });

      setRecentBookings(bookings.slice(0, 5));

      setBookingChartData([
        { name: "Pending", value: pending },
        { name: "Upcoming", value: upcoming },
        { name: "Completed", value: completed },
        { name: "Canceled", value: canceled },
      ]);

      setRevenueChartData([{ name: "Revenue", revenue }]);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Booking, revenue & tour overview
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<FaClipboardList />}
            color="blue"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<FaClock />}
            color="yellow"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcoming}
            icon={<FaPlaneDeparture />}
            color="indigo"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<FaCheckCircle />}
            color="green"
          />
          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            icon={<FaRupeeSign />}
            color="emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold mb-4">
              Booking Status Chart
            </h2>
            <BookingStatusChart data={bookingChartData} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="font-semibold mb-4">
              Revenue Overview
            </h2>
            <RevenueChart data={revenueChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">
            Recent Bookings
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet</p>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border-b pb-3 last:border-none"
                >
                  <div>
                    <p className="font-medium">
                      {b.subPackageId?.title || "Tour Package"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <StatusBadge status={b.bookingStatus} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}


function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    indigo: "text-indigo-600 bg-indigo-50",
    green: "text-green-600 bg-green-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border flex items-center gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
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
}*/
/*

import { useEffect, useState } from "react";
import api from "../../services/api";

/* ICONS *//*
import {
  FaClipboardList,
  FaClock,
  FaPlaneDeparture,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

/* CHARTS *//*
import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingChartData, setBookingChartData] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/booking/user");
      const bookings = res.data?.data || [];

      const pending = bookings.filter(b => b.bookingStatus === "pending").length;
      const upcoming = bookings.filter(b => b.bookingStatus === "upcoming").length;
      const completed = bookings.filter(b => b.bookingStatus === "completed").length;
      const canceled = bookings.filter(b => b.bookingStatus === "canceled").length;

      const revenue = bookings.reduce(
        (sum, b) => sum + (b.pricing?.totalAmount || 0),
        0
      );

      setStats({
        totalBookings: bookings.length,
        pending,
        upcoming,
        completed,
        canceled,
        revenue,
      });

      setRecentBookings(bookings.slice(0, 5));

      setBookingChartData([
        { name: "Pending", value: pending },
        { name: "Upcoming", value: upcoming },
        { name: "Completed", value: completed },
        { name: "Canceled", value: canceled },
      ]);

      setRevenueChartData([{ name: "Revenue", revenue }]);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER *//*}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Booking, revenue & tour overview
        </p>
      </div>

      {/* STAT CARDS *//*}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={<FaClipboardList />} color="blue" />
        <StatCard title="Pending" value={stats.pending} icon={<FaClock />} color="yellow" />
        <StatCard title="Upcoming" value={stats.upcoming} icon={<FaPlaneDeparture />} color="indigo" />
        <StatCard title="Completed" value={stats.completed} icon={<FaCheckCircle />} color="green" />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} icon={<FaRupeeSign />} color="emerald" />
      </div>

      {/* CHARTS *//*}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Booking Status</h2>
          <BookingStatusChart data={bookingChartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="font-semibold mb-4">Revenue</h2>
          <RevenueChart data={revenueChartData} />
        </div>
      </div>

      {/* RECENT BOOKINGS *//*}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : recentBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((b) => (
              <div
                key={b._id}
                className="flex justify-between items-center border-b pb-3 last:border-none"
              >
                <div>
                  <p className="font-medium">
                    {b.subPackageId?.title || "Tour Package"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={b.bookingStatus} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */
/*
function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    indigo: "text-indigo-600 bg-indigo-50",
    green: "text-green-600 bg-green-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
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
    <span className={`px-3 py-1 text-xs rounded-full capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
*//*
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaClipboardList,
  FaClock,
  FaPlaneDeparture,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  const { stats, bookingChart, recentBookings } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Booking, revenue & tour overview
        </p>
      </div>

      {/* STATS *//*}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={<FaClipboardList />} />
        <StatCard title="Pending" value={stats.pending} icon={<FaClock />} />
        <StatCard title="Upcoming" value={stats.upcoming} icon={<FaPlaneDeparture />} />
        <StatCard title="Completed" value={stats.completed} icon={<FaCheckCircle />} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} icon={<FaRupeeSign />} />
      </div>

      {/* CHARTS *//*}


      {/* RECENT BOOKINGS *//*/*}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          recentBookings.map(b => (
            <div key={b._id} className="flex justify-between border-b py-2">
              <span>{b.packageType.toUpperCase()} Package</span>
              <StatusBadge status={b.bookingStatus} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */
/*
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}
*/
/*
import { useEffect, useState } from "react";
import api from "../../services/api";

/* ICONS *//*
import {
  FaClipboardList,
  FaClock,
  FaPlaneDeparture,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

/* CHARTS *//*
import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";
import TotalBookingChart from "../components/charts/TotalBookingChart";
import PackageTypeChart from "../components/charts/PackageTypeChart";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">No data</p>;

  const { stats, bookingChart, recentBookings } = data;

  return (
    <div className="space-y-8">
      {/* HEADER *//*}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Booking, revenue & tour overview
        </p>
      </div>

      {/* STAT CARDS *//*}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={<FaClipboardList />} />
        <StatCard title="Pending" value={stats.pending} icon={<FaClock />} />
        <StatCard title="Upcoming" value={stats.upcoming} icon={<FaPlaneDeparture />} />
        <StatCard title="Completed" value={stats.completed} icon={<FaCheckCircle />} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} icon={<FaRupeeSign />} />
      </div>

      {/* 🔥 DASHBOARD CHARTS (LIKE REPORTS) *//*}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart revenue={stats.revenue} />
        <TotalBookingChart total={stats.totalBookings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Pie *//*}
        <BookingStatusChart
          data={{
            paidBookings: stats.completed,
            pendingBookings: stats.pending,
          }}
        />

        {/* Package Type Bar *//*}
        <PackageTypeChart data={bookingChart.map(b => ({
          _id: b.name.toLowerCase(),
          count: b.value
        }))} />
      </div>

      {/* RECENT BOOKINGS *//*}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          recentBookings.map(b => (
            <div
              key={b._id}
              className="flex justify-between items-center border-b py-2 last:border-none"
            >
              <span className="font-medium">
                {b.packageType.toUpperCase()} Package
              </span>
              <StatusBadge status={b.bookingStatus} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= *//*

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full capitalize ${map[status]}`}>
      {status}
    </span>
  );
}
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* ICONS */
import {
  FaClipboardList,
  FaClock,
  FaPlaneDeparture,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

/* CHARTS */
import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";
import TotalBookingChart from "../components/charts/TotalBookingChart";
import PackageTypeChart from "../components/charts/PackageTypeChart";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">No data</p>;

  const { stats, bookingChart, recentBookings } = data;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Booking, revenue & tour overview
        </p>
      </div>

      {/* STAT CARDS (CLICKABLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<FaClipboardList />}
          onClick={() => navigate("/admin/bookings")}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<FaClock />}
          onClick={() => navigate("/admin/bookings?status=pending")}
        />

        <StatCard
          title="Upcoming"
          value={stats.upcoming}
          icon={<FaPlaneDeparture />}
          onClick={() => navigate("/admin/bookings?status=upcoming")}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<FaCheckCircle />}
          onClick={() => navigate("/admin/bookings?status=completed")}
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue}`}
          icon={<FaRupeeSign />}
          onClick={() => navigate("/admin/reports")}
        />
      </div>

      {/* DASHBOARD CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart revenue={stats.revenue} />
        <TotalBookingChart total={stats.totalBookings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingStatusChart
          data={{
            paidBookings: stats.completed,
            pendingBookings: stats.pending,
          }}
        />

        <PackageTypeChart
          data={bookingChart.map((b) => ({
            _id: b.name.toLowerCase(),
            count: b.value,
          }))}
        />
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          recentBookings.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center border-b py-2 last:border-none"
            >
              <span className="font-medium">
                {b.packageType.toUpperCase()} Package
              </span>
              <StatusBadge status={b.bookingStatus} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatCard({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-xl shadow border flex items-center gap-4
                 cursor-pointer hover:shadow-lg hover:border-blue-400 transition"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full capitalize ${map[status]}`}
    >
      {status}
    </span>
  );
}
