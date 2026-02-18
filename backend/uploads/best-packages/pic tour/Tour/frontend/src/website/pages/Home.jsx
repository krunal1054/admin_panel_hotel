import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Explore The World
        </h1>

        <p className="text-gray-600 mb-8">
          Discover amazing tour packages at best prices.
        </p>

        {/* ✅ FIX HERE */}
        <Link
          to="/tours"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
        >
          View Tours
        </Link>
      </div>
    </div>
  );
}
