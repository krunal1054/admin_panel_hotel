import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!tour) return <p className="p-6 text-red-500">Tour not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      {/* ✅ IMAGE FIXED */}
      <img
        src={`http://localhost:5000/${tour.mainImage}`}
        alt={tour.title}
        className="w-full h-[400px] object-cover rounded-xl border"
      />

      <h1 className="text-3xl font-bold mt-6">{tour.title}</h1>
      <p className="text-gray-600 mt-1">📍 {tour.location}</p>

      <p className="text-2xl text-green-600 font-semibold mt-3">
        ₹{tour.price}
      </p>
    </div>
  );
}
