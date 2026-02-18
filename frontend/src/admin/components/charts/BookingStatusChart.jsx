import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function BookingStatusChart({ data }) {
  const COLORS = ["#22c55e", "#facc15"];

  const chartData = [
    { name: "Paid", value: data.paidBookings },
    { name: "Pending", value: data.pendingBookings },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Payment Status</h2>
      <PieChart width={250} height={250}>
        <Pie data={chartData} dataKey="value" outerRadius={90}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
