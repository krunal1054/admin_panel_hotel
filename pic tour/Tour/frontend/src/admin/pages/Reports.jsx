/*import { useEffect, useState } from "react";
import api from "../../services/api";

import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";
import TotalBookingChart from "../components/charts/TotalBookingChart";
import PackageTypeChart from "../components/charts/PackageTypeChart";

export default function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/reports").then(res => setData(res.data));
  }, []);

  if (!data) return <p className="p-6">Loading reports...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <RevenueChart revenue={data.totalRevenue} />
      <TotalBookingChart total={data.totalBookings} />
      <BookingStatusChart data={data} />
      <PackageTypeChart data={data.packageWise} />
    </div>
  );
}
*/
import { useEffect, useState } from "react";
import api from "../../services/api";

/* EXISTING CHARTS */
import BookingStatusChart from "../components/charts/BookingStatusChart";
import RevenueChart from "../components/charts/RevenueChart";
import TotalBookingChart from "../components/charts/TotalBookingChart";
import PackageTypeChart from "../components/charts/PackageTypeChart";
import BookingBreakdownChart from "../components/charts/BookingBreakdownChart";
import PaymentCompareChart from "../components/charts/PaymentCompareChart";

/* NEW CHARTS */
import RevenueByPackageChart from "../components/charts/RevenueByPackageChart";
import AverageRevenueChart from "../components/charts/AverageRevenueChart";
import PaymentRatioChart from "../components/charts/PaymentRatioChart";

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/reports")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Reports error", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading reports...</p>;
  if (!data) return <p className="p-6">No report data</p>;

  /* ================= SAFE DERIVED DATA ================= */

  const paid = data.paidBookings || 0;
  const pending = data.pendingBookings || 0;

  const bookingBreakdown = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  const packageWiseSafe = Array.isArray(data.packageWise)
    ? data.packageWise.filter(p => p && p._id)
    : [];

  const revenueByPackage = packageWiseSafe.map((p) => ({
    name: String(p._id).toUpperCase(),
    revenue:
      data.totalBookings > 0
        ? Math.round(data.totalRevenue / data.totalBookings) * p.count
        : 0,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueChart revenue={data.totalRevenue || 0} />
        <TotalBookingChart total={data.totalBookings || 0} />
        <AverageRevenueChart
          totalRevenue={data.totalRevenue || 0}
          totalBookings={data.totalBookings || 0}
        />
      </div>

      {/* PAYMENT STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingStatusChart
          data={{
            paidBookings: paid,
            pendingBookings: pending,
          }}
        />
        <PaymentCompareChart paid={paid} pending={pending} />
      </div>

      {/* BREAKDOWN + RATIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingBreakdownChart data={bookingBreakdown} />
        <PaymentRatioChart paid={paid} pending={pending} />
      </div>

      {/* PACKAGE ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PackageTypeChart data={packageWiseSafe} />
        <RevenueByPackageChart data={revenueByPackage} />
      </div>
    </div>
  );
}
