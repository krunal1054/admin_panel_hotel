import { BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function PackageTypeChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Package Type Bookings</h2>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="_id" />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </div>
  );
}
