export default function RevenueChart({ revenue }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="font-semibold mb-2">Total Revenue</h2>
      <p className="text-3xl font-bold text-green-600">₹{revenue}</p>
    </div>
  );
}
