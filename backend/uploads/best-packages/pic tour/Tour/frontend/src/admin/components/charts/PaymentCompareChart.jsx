import { BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function PaymentCompareChart({ paid, pending }) {
  const data = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">Payment Comparison</h2>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" />
      </BarChart>
    </div>
  );
}
