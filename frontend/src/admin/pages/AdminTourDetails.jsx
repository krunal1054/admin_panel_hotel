import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminTourDetails() {
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
    <div className="bg-white p-6 rounded shadow">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">
        ← Back
      </button>

      <img
        src={`http://localhost:5000/uploads/${tour.mainImage}`}
        className="w-full h-72 object-cover rounded"
      />

      <h1 className="text-2xl font-bold mt-4">{tour.title}</h1>
      <p>{tour.location}</p>
      <p className="text-green-600 text-xl">₹{tour.price}</p>
    </div>
  );
}
