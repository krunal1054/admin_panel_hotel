import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTourById } from "../../services/tour.api";
import BookingModal from "../components/BookingModal";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTourById(id).then((res) => setTour(res.data));
  }, [id]);

  if (!tour) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <img
        src={`http://localhost:5000/${tour.mainImage}`}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
      <p className="text-gray-500">{tour.location}</p>

      <p className="text-xl font-semibold mt-4">
        ₹{Number(tour.price).toLocaleString()}
      </p>

      <button
        onClick={() => setOpen(true)}
        className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg"
      >
        Book Now
      </button>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        tourId={tour._id}
      />
    </div>
  );
}
