/*import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function BestPackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    api.get(`/best-packages/${id}`).then((res) => {
      setPkg(res.data);
    });
  }, [id]);

  if (!pkg) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        to="/best-packages"
        className="text-blue-600 mb-6 inline-block"
      >
        ← Back to Best Packages
      </Link>

      <img
        src={`http://localhost:5000/${pkg.image}`}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
      <p className="text-gray-600 mb-2">⏱ {pkg.days}</p>

      <p className="text-2xl text-green-600 font-semibold mb-4">
        ₹{pkg.price}
      </p>

      {pkg.tags && (
        <p className="text-gray-700">
          <strong>Tags:</strong> {pkg.tags}
        </p>
      )}
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function BestPackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestPackage();
  }, [id]);

  const fetchBestPackage = async () => {
    try {
      const res = await api.get(`/best-packages/${id}`);
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* BACK */}
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Tours
      </Link>

      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden shadow mb-8">
        <img
          src={`http://localhost:5000/${pkg.image}`}
          alt={pkg.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <h1 className="text-4xl font-bold mb-2">{pkg.title}</h1>

      <p className="text-gray-600 mb-2 flex items-center gap-2">
        ⏱ {pkg.days}
      </p>

      {pkg.tags && (
        <span className="inline-block mb-4 text-sm px-4 py-1 rounded-full bg-purple-100 text-purple-700">
          {pkg.tags}
        </span>
      )}

      <div className="text-3xl font-semibold text-green-600 mb-6">
        ₹{pkg.price}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        This best-selling tour package is one of our most loved experiences.
        Carefully curated to give you comfort, adventure, and unforgettable
        memories throughout the journey.
      </p>

      {/* BOOK BUTTON */}
      <button
        onClick={() => navigate(`/booking/best/${pkg._id}`)}
        className="bg-black text-white px-10 py-4 rounded-xl text-lg hover:bg-gray-800"
      >
        Book Now
      </button>
    </div>
  );
}
