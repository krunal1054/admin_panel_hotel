import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { fetchTours, deleteTour } from "../../services/tour.api";
import { useNavigate } from "react-router-dom";

export default function TopPackages() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    const res = await fetchTours();
    setTours(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    await deleteTour(id);
    loadTours();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Tours</h1>

      <div className="bg-white rounded-xl shadow">
        <div className="grid grid-cols-6 px-6 py-4 border-b font-semibold">
          <div>Image</div>
          <div>Title</div>
          <div>Location</div>
          <div>Price</div>
          <div>Type</div>
          <div>Action</div>
        </div>

        {tours.map((tour) => (
          <div
            key={tour._id}
            className="grid grid-cols-6 px-6 py-4 border-b items-center"
          >
            <img
              src={`http://localhost:5000/${tour.mainImage}`}
              className="w-16 h-12 rounded object-cover"
            />

            <div>{tour.title}</div>
            <div>{tour.location}</div>
            <div className="text-green-600">₹{tour.price}</div>
            <div>{tour.tourType}</div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit-tour/${tour._id}`)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(tour._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
