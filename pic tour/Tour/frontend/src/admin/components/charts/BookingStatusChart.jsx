/*import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"];

export default function BookingStatusChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <h3 className="font-semibold mb-4">Booking Status</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
*/
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
