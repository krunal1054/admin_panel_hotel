/*import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

export default function TopPackageDetails() {
  const { id } = useParams();
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
      console.error("Failed to load package", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="h-screen flex items-center justify-center">
        Package not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        to="/tours"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Tours
      </Link>

      <div className="rounded-2xl overflow-hidden shadow mb-8">
        <img
          src={`http://localhost:5000/${pkg.image}`}
          alt={pkg.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold mb-2">{pkg.title}</h1>

      <p className="text-gray-600 mb-4 flex items-center gap-2">
        📍 {pkg.location}
      </p>

      <div className="text-3xl font-semibold text-green-600 mb-6">
        ₹{pkg.price}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        This tour package offers a carefully curated travel experience including
        sightseeing, comfortable accommodation, and memorable moments. Explore{" "}
        <b>{pkg.location}</b> with our trusted travel experts and enjoy a
        hassle-free journey.
      </p>

      <div className="flex gap-6 text-gray-700 mb-10">
        <span>🗺 Places Covered: {pkg.placeCount}</span>
      </div>

      <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">
        Book Now
      </button>
    </div>
  );
}*/

// frontend/src/website/pages/TopPackageDetails.jsx

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

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;
  if (!pkg) return <div>Package not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link to="/" className="text-blue-600">← Back to Tours</Link>

      <img
        src={`http://localhost:5000/${pkg.image}`}
        className="w-full h-[420px] object-cover rounded-xl my-6"
      />

      <h1 className="text-4xl font-bold">{pkg.title}</h1>
      <p className="text-gray-600">📍 {pkg.location}</p>
      <p className="text-3xl text-green-600 font-semibold mt-4">₹{pkg.price}</p>

      <p className="mt-6 text-gray-700">
        Premium tour package with expert guidance and comfort.
      </p>

      <button
        onClick={() => navigate(`/booking/top/${pkg._id}`)}
        className="mt-8 bg-black text-white px-8 py-3 rounded-lg"
      >
        Book Now
      </button>
    </div>
  );
}

