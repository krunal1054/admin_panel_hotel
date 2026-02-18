import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function SubPackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubPackage();
  }, [id]);

  const fetchSubPackage = async () => {
    try {
      const res = await api.get(`/sub-packages/${id}`);
      setPkg(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!pkg)
    return (
      <div className="h-screen flex justify-center items-center">
        Package not found
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* BACK */}
      <Link
        to="/admin/sub-packages"
        className="text-blue-600 hover:underline mb-4 inline-block text-sm"
      >
        ← Back to Packages
      </Link>

      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden shadow mb-6 sm:mb-8">
        <img
          src={`http://localhost:5000/${pkg.mainImage}`}
          alt={pkg.title}
          className="w-full h-64 sm:h-[420px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        {pkg.title}
      </h1>

      <p className="text-gray-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
        📍 {pkg.location}
      </p>

      <span className="inline-block mb-4 text-xs sm:text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700">
        {pkg.tourType}
      </span>

      <div className="text-2xl sm:text-3xl font-semibold text-green-600 mb-6">
        ₹{pkg.price}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
        This sub tour package is carefully designed for travelers looking for a
        perfect experience in <b>{pkg.location}</b>. Enjoy comfort, guided tours,
        and memorable moments.
      </p>

      {/* BOOK BUTTON */}
      <button
        onClick={() => navigate(`/booking/sub/${pkg._id}`)}
        className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4
                   rounded-xl text-base sm:text-lg
                   w-full sm:w-auto hover:bg-gray-800 transition"
      >
        Book Now
      </button>
    </div>
  );
}
