import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function BookingBreakdownChart({ data = [] }) {
  const COLORS = ["#facc15", "#60a5fa", "#22c55e", "#ef4444"];

  // 🔥 SAFETY CHECK
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Booking Status Breakdown</h2>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Booking Status Breakdown</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
