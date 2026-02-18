import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function PaymentRatioChart({ paid = 0, pending = 0 }) {
  const total = paid + pending;

  const data = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#facc15"];

  if (total === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Payment Ratio</h2>
        <p className="text-sm text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Payment Ratio</h2>
      <PieChart width={260} height={220}>
        <Pie data={data} dataKey="value" outerRadius={90}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <p className="text-center text-sm text-gray-600 mt-2">
        Paid {Math.round((paid / total) * 100)}%
      </p>
    </div>
  );
}
