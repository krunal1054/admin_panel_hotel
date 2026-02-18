import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TopPackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const res = await api.get(`/top-packages/${id}`);
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

  if (!pkg) return <div>Package not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Link to="/admin/top-packages" className="text-blue-600 text-sm">
        ← Back to Packages
      </Link>

      <img
        src={`http://localhost:5000/${pkg.image}`}
        className="w-full h-64 sm:h-[420px] object-cover rounded-xl my-6"
      />

      <h1 className="text-2xl sm:text-4xl font-bold">
        {pkg.title}
      </h1>

      <p className="text-gray-600 mt-1">📍 {pkg.location}</p>

      <p className="text-2xl sm:text-3xl text-green-600 font-semibold mt-4">
        ₹{pkg.price}
      </p>

      <p className="mt-6 text-gray-700 text-sm sm:text-base">
        Premium tour package with expert guidance and comfort.
      </p>

      <button
        onClick={() => navigate(`/booking/top/${pkg._id}`)}
        className="mt-8 bg-black text-white px-6 sm:px-8 py-3 rounded-lg
                   w-full sm:w-auto"
      >
        Book Now
      </button>
    </div>
  );
}
