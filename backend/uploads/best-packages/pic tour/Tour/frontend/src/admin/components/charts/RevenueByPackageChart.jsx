import { BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function RevenueByPackageChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Revenue by Package</h2>
        <p className="text-sm text-gray-500">No data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Revenue by Package</h2>
      <BarChart width={300} height={220} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="revenue" fill="#6366f1" />
      </BarChart>
    </div>
  );
}
