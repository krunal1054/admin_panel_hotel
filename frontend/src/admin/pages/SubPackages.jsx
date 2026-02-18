import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* ICONS */
import { FaEye, FaTrash } from "react-icons/fa";

export default function SubPackages() {
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [price, setPrice] = useState("");
  const [mainImage, setMainImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* 🔥 UI STATUS */
  const [statusText, setStatusText] = useState("ℹ️ Fill all details");

  const fetchTours = async () => {
    try {
      const res = await api.get("/sub-packages");
      setTours(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  /* 🔥 AUTO STATUS */
  useEffect(() => {
    if (title && location && price && mainImage) {
      setStatusText("✅ Ready to Save");
    } else {
      setStatusText("ℹ️ Fill all details");
    }
  }, [title, location, price, mainImage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !location || !price || !mainImage) {
      setMessage("❌ All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("tourType", tourType);
    formData.append("price", price);
    formData.append("mainImage", mainImage);

    try {
      setLoading(true);
      setStatusText("⏳ Saving package...");

      await api.post("/sub-packages", formData);

      setMessage("✅ Sub package added");
      setStatusText("🎉 Sub Package Saved Successfully");

      setTitle("");
      setLocation("");
      setTourType("Family");
      setPrice("");
      setMainImage(null);

      fetchTours();
    } catch (err) {
      console.error(err);
      setMessage("❌ Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (id) => {
    if (!window.confirm("Delete this sub package?")) return;

    try {
      await api.delete(`/sub-packages/${id}`);
      setMessage("🗑 Deleted successfully");
      fetchTours();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  return (
    <div className="space-y-10 px-3 sm:px-6">
      {/* ================= ADD FORM ================= */}
      <div className="max-w-3xl bg-white p-4 sm:p-6 rounded-xl shadow border w-full">
        <h1 className="text-lg sm:text-xl font-semibold mb-2">
          ➕ Add Sub Package
        </h1>

        <p className="mb-4 text-sm font-medium text-blue-600">
          {statusText}
        </p>

        {message && (
          <p className="mb-4 text-sm text-center text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded text-sm"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option>Family</option>
            <option>Couple</option>
            <option>Adventure</option>
          </select>

          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="md:col-span-2 text-sm"
            onChange={(e) => setMainImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded
                       hover:bg-gray-800 transition"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b text-gray-600 font-semibold">
            <div>Image</div>
            <div>Tour</div>
            <div>Location</div>
            <div>Type</div>
            <div>Price</div>
            <div>Actions</div>
          </div>

          {tours.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No tours found
            </p>
          ) : (
            tours.map((tour) => (
              <div
                key={tour._id}
                className="grid grid-cols-6 gap-4 px-6 py-4 border-b
                           items-center hover:bg-gray-50"
              >
                <img
                  src={`http://localhost:5000/${tour.mainImage}`}
                  alt={tour.title}
                  className="w-16 h-12 object-cover rounded cursor-pointer"
                  onClick={() =>
                    navigate(`/sub-packages/${tour._id}`)
                  }
                />

                <div
                  className="font-medium text-blue-600 hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`/sub-packages/${tour._id}`)
                  }
                >
                  {tour.title}
                </div>

                <div>{tour.location}</div>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 w-fit">
                  {tour.tourType}
                </span>

                <div className="font-semibold text-green-600">
                  ₹{tour.price}
                </div>

                {/* 🔥 ICON ACTIONS */}
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      navigate(`/sub-packages/${tour._id}`)
                    }
                    title="View"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => deleteTour(tour._id)}
                    title="Delete"
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
