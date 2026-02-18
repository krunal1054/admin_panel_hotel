import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* ICONS */
import { FaEye, FaTrash } from "react-icons/fa";

export default function BestPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FORM STATE */
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  /* 🔥 UI STATUS */
  const [statusText, setStatusText] = useState("ℹ️ Fill all details");

  /* FETCH */
  const fetchBestPackages = async () => {
    const res = await api.get("/best-packages");
    setPackages(res.data || []);
  };

  useEffect(() => {
    fetchBestPackages();
  }, []);

  /* 🔥 AUTO STATUS */
  useEffect(() => {
    if (title && price && days && image) {
      setStatusText("✅ Ready to Save");
    } else {
      setStatusText("ℹ️ Fill all details");
    }
  }, [title, price, days, image]);

  /* CREATE */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !price || !days || !image) {
      setMessage("❌ All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("days", days);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      setLoading(true);
      setStatusText("⏳ Saving package...");

      await api.post("/best-packages", formData);

      setMessage("✅ Package added");
      setStatusText("🎉 Package Saved Successfully");

      setTitle("");
      setPrice("");
      setDays("");
      setTags("");
      setImage(null);

      fetchBestPackages();
    } catch {
      setMessage("❌ Failed to save");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */
  const deletePackage = async (id) => {
    if (!window.confirm("Delete this best package?")) return;
    await api.delete(`/best-packages/${id}`);
    fetchBestPackages();
  };

  return (
    <div className="space-y-10 px-3 sm:px-6">
      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow border max-w-3xl w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          ➕ Add Best Package
        </h2>

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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          />

          <input
            placeholder="Days (e.g. 3 Days / 2 Nights)"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          />

          <input
            placeholder="Tags (Beach, Family)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
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

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <div className="px-4 sm:px-6 py-4 border-b font-semibold text-gray-700">
          📦 Best Packages List
        </div>

        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Days</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      className="w-20 h-14 object-cover rounded-md border cursor-pointer"
                      alt={p.title}
                      onClick={() =>
                        navigate(`/best-packages/${p._id}`)
                      }
                    />
                  </td>

                  <td
                    className="p-4 font-medium text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/best-packages/${p._id}`)
                    }
                  >
                    {p.title}
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {p.days}
                    </span>
                  </td>

                  <td className="p-4 text-right font-semibold text-green-600">
                    ₹{p.price}
                  </td>

                  {/* 🔥 ICON ACTIONS */}
                  <td className="p-4 text-center">
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/best-packages/${p._id}`)
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
