/*import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTourById } from "../../services/tour.api";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTour();
  }, [id]);

  const loadTour = async () => {
    try {
      const res = await fetchTourById(id);
      setTour(res.data);
    } catch (error) {
      console.error("Error fetching tour details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading tour details...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="p-10 text-center text-red-500">
        Tour not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Tours
      </button>

      <img
        src={`http://localhost:5000/${tour.mainImage}`}
        alt={tour.title}
        className="w-full h-[420px] object-cover rounded-2xl mb-8"
      />

      <h1 className="text-4xl font-bold mb-2">
        {tour.title}
      </h1>

      <p className="text-gray-600 mb-4 flex items-center gap-2">
        📍 <span>{tour.location}</span>
      </p>

      <p className="text-3xl font-semibold text-green-600 mb-6">
        ₹{tour.price}
      </p>

      <p className="text-gray-700 leading-relaxed max-w-3xl">
        This tour package offers a carefully curated travel experience
        including sightseeing, comfortable accommodation, and memorable
        moments. Explore <strong>{tour.location}</strong> with our trusted
        travel experts and enjoy a hassle-free journey.
      </p>

      <button className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
        Book Now
      </button>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    api.get(`/tours/${id}`).then((res) => {
      setTour(res.data);
    });
  }, [id]);

  if (!tour) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      <img
        src={`http://localhost:5000/uploads/${tour.mainImage}`}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{tour.title}</h1>
      <p className="text-gray-600">📍 {tour.location}</p>

      <p className="text-2xl text-green-600 font-semibold mt-2">
        ₹{tour.price}
      </p>
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    api.get(`/tours/${id}`).then((res) => {
      setTour(res.data);
    });
  }, [id]);

  if (!tour) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      <img
  src={`http://localhost:5000/${tour.mainImage}`}
  alt={tour.title}
  className="w-full h-[400px] object-cover rounded-xl"
/>


      <h1 className="text-3xl font-bold mt-6">{tour.title}</h1>
      <p className="text-gray-600">📍 {tour.location}</p>

      <p className="text-2xl text-green-600 font-semibold mt-2">
        ₹{tour.price}
      </p>
    </div>
  );
}
