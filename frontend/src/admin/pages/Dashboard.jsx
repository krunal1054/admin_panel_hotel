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

  if (loading) return <p className="p-4 sm:p-6">Loading...</p>;
  if (!data) return <p className="p-4 sm:p-6">No data</p>;

  const { stats, bookingChart, recentBookings } = data;

  return (
    <div className="space-y-8 px-3 sm:px-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Booking, revenue & tour overview
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* CHARTS */}
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
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <div className="space-y-2">
            {recentBookings.map((b) => (
              <div
                key={b._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center
                           gap-2 border-b py-2 last:border-none"
              >
                <span className="font-medium text-sm sm:text-base">
                  {b.packageType.toUpperCase()} Package
                </span>
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

function StatCard({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 sm:p-5 rounded-xl shadow border
                 flex items-center gap-4 cursor-pointer
                 hover:shadow-lg hover:border-blue-400 transition"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                      rounded-lg bg-gray-100 text-lg sm:text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        <h2 className="text-lg sm:text-xl font-bold">{value}</h2>
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
      className={`px-3 py-1 text-xs rounded-full capitalize w-fit ${map[status]}`}
    >
      {status}
    </span>
  );
}
