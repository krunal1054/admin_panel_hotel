import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* ICONS */
import { FaEye, FaTrash } from "react-icons/fa";

export default function TopPackages() {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [placeCount, setPlaceCount] = useState("");
  const [image, setImage] = useState(null);

  const [statusText, setStatusText] = useState("Fill all details");

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    const res = await api.get("/top-packages");
    setPackages(res.data || []);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (title && location && price && placeCount && image) {
      setStatusText("✅ Ready to Save");
    } else {
      setStatusText("ℹ️ Fill all details");
    }
  }, [title, location, price, placeCount, image]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !location || !price || !placeCount || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("placeCount", placeCount);
    formData.append("image", image);

    try {
      setLoading(true);
      setStatusText("⏳ Saving package...");

      await api.post("/top-packages", formData);

      setTitle("");
      setLocation("");
      setPrice("");
      setPlaceCount("");
      setImage(null);

      setStatusText("🎉 Package Saved Successfully");
      fetchPackages();
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await api.delete(`/top-packages/${id}`);
    fetchPackages();
  };

  return (
    <div className="space-y-10 px-3 sm:px-6">
      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow border max-w-2xl w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          ➕ Add Top Package
        </h2>

        <p className="text-sm mb-4 text-blue-600 font-medium">
          {statusText}
        </p>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded text-sm"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded text-sm"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded text-sm"
            placeholder="Places"
            value={placeCount}
            onChange={(e) => setPlaceCount(e.target.value)}
          />

          <input
            type="file"
            className="md:col-span-2 text-sm"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
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
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Places</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      className="w-20 h-14 object-cover rounded cursor-pointer"
                      onClick={() =>
                        navigate(`/top-packages/${p._id}`)
                      }
                    />
                  </td>

                  <td
                    className="p-3 font-medium text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/top-packages/${p._id}`)
                    }
                  >
                    {p.title}
                  </td>

                  <td className="p-3">{p.location}</td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{p.price}
                  </td>

                  <td className="p-3">{p.placeCount}</td>

                  {/* 🔥 ICON ACTIONS */}
                  <td className="p-3 text-center">
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/top-packages/${p._id}`)
                        }
                        title="View"
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => deletePackage(p._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
