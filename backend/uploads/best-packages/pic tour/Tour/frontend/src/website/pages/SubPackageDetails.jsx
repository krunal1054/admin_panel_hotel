/*/import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function SubPackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subPackage, setSubPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubPackage = async () => {
      try {
        const res = await api.get(`/sub-packages/${id}`);
        setSubPackage(res.data);
      } catch (err) {
        console.error(err);
        setError("Sub package not found");
      } finally {
        setLoading(false);
      }
    };

    fetchSubPackage();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (error || !subPackage) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <img
        src={`http://localhost:5000/${subPackage.mainImage}`}
        alt={subPackage.title}
        className="w-full h-[400px] object-cover rounded-xl border"
      />

      <h1 className="text-3xl font-bold mt-6">
        {subPackage.title}
      </h1>

      <p className="text-gray-600 mt-1">
        📍 {subPackage.location}
      </p>

      <p className="text-2xl text-green-600 font-semibold mt-3">
        ₹{subPackage.price}
      </p>

      <span className="inline-block mt-4 text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700">
        {subPackage.tourType}
      </span>
    
    </div>
  );
}
*/
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
          src={`http://localhost:5000/${pkg.mainImage}`}
          alt={pkg.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <h1 className="text-4xl font-bold mb-2">{pkg.title}</h1>

      <p className="text-gray-600 mb-2 flex items-center gap-2">
        📍 {pkg.location}
      </p>

      <span className="inline-block mb-4 text-sm px-4 py-1 rounded-full bg-blue-100 text-blue-700">
        {pkg.tourType}
      </span>

      <div className="text-3xl font-semibold text-green-600 mb-6">
        ₹{pkg.price}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">
        This sub tour package is carefully designed for travelers looking for a
        perfect experience in <b>{pkg.location}</b>. Enjoy comfort, guided tours,
        and memorable moments.
      </p>

      {/* BOOK BUTTON */}
      <button
        onClick={() => navigate(`/booking/sub/${pkg._id}`)}
        className="bg-black text-white px-10 py-4 rounded-xl text-lg hover:bg-gray-800"
      >
        Book Now
      </button>
    </div>
  );
}
