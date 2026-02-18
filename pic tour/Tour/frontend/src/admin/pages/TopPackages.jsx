/*import FormCard from "../components/FormCard";
import AdminLayout from "../components/AdminLayout";

export default function TopPackageForm() {
  return (
    <AdminLayout>
      <FormCard title="Add Top Package">
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" placeholder="Goa" />
          </div>

          <div>
            <label className="block text-sm mb-1">Total Places</label>
            <input className="input" placeholder="12 Places" />
          </div>

          <div>
            <label className="block text-sm mb-1">Image</label>
            <input type="file" className="input" />
          </div>

          <button className="btn-primary">Save Package</button>
        </div>
      </FormCard>
    </AdminLayout>
  );
}
*/
/*
import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function TopPackages() {
  const [title, setTitle] = useState("");
  const [placecountes, setPlacecountes] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !placecountes || !image) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("placecountes", placecountes);
    formData.append("image", image);

    try {
      setLoading(true);

      await api.post("/top-packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Top Package added successfully");

      // reset form
      setTitle("");
      setPlacecountes("");
      setImage(null);
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          Add Top Package
        </h1>

        {message && (
          <p className="mb-4 text-sm text-center text-red-600">
            {message}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Goa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Total Places
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="12 Places"
              value={placecountes}
              onChange={(e) => setPlacecountes(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
*/
/*
import { useState } from "react";
import api from "../../services/api";

export default function TopPackages() {
  const [title, setTitle] = useState("");
  const [placecountes, setPlacecountes] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !placecountes || !image) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("placecountes", placecountes);
    formData.append("image", image);

    try {
      setLoading(true);

      await api.post("/top-packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Top Package added successfully");

      setTitle("");
      setPlacecountes("");
      setImage(null);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow border">
      <h1 className="text-xl font-semibold mb-6">
        Add Top Package
      </h1>

      {message && (
        <p className="mb-4 text-sm text-center text-red-600">
          {message}
        </p>
      )}

      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Goa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Total Places
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="12 Places"
            value={placecountes}
            onChange={(e) => setPlacecountes(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TopPackages() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [placeCount, setPlaceCount] = useState("");
  const [image, setImage] = useState(null);

  const [packages, setPackages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/top-packages");
      setPackages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !location || !price || !placeCount || !image) {
      setMessage("❌ All fields are required");
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
      await api.post("/top-packages", formData);
      setMessage("✅ Package added successfully");

      setTitle("");
      setLocation("");
      setPrice("");
      setPlaceCount("");
      setImage(null);

      fetchPackages();
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
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
    <div className="space-y-8">
      {/* FORM *//*}
<div className="bg-white p-6 rounded-xl shadow border max-w-xl">
  <h2 className="text-xl font-semibold mb-4">Add Top Package</h2>

  {message && (
    <p className="text-sm mb-3 text-center text-red-600">
      {message}
    </p>
  )}

  <form onSubmit={submitHandler} className="space-y-4">
    <input
      className="w-full border px-3 py-2 rounded"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <input
      className="w-full border px-3 py-2 rounded"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />

    <input
      type="number"
      className="w-full border px-3 py-2 rounded"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />

    <input
      type="number"
      className="w-full border px-3 py-2 rounded"
      placeholder="Places"
      value={placeCount}
      onChange={(e) => setPlaceCount(e.target.value)}
    />

    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
    />

    <button
      disabled={loading}
      className="w-full bg-black text-white py-2 rounded"
    >
      {loading ? "Saving..." : "Save Package"}
    </button>
  </form>
</div>

{/* TABLE *//*}
<div className="bg-white rounded-xl shadow border">
  <table className="w-full text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3">Image</th>
        <th className="p-3">Title</th>
        <th className="p-3">Location</th>
        <th className="p-3">Price</th>
        <th className="p-3">Places</th>
        <th className="p-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {packages.length === 0 ? (
        <tr>
          <td colSpan="6" className="p-4 text-center">
            No packages found
          </td>
        </tr>
      ) : (
        packages.map((p) => (
          <tr key={p._id} className="border-t text-center">
            <td className="p-2">
              <img
                src={`http://localhost:5000/${p.image}`}
                className="w-16 h-12 object-cover rounded"
              />
            </td>
            <td>{p.title}</td>
            <td>{p.location}</td>
            <td>₹{p.price}</td>
            <td>{p.placeCount}</td>
            <td>
              <button
                onClick={() => deletePackage(p._id)}
                className="text-red-600"
              >
                Delete
              </button>
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
*/
/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TopPackages() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [placeCount, setPlaceCount] = useState("");
  const [image, setImage] = useState(null);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    const res = await api.get("/top-packages");
    setPackages(res.data || []);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

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
      await api.post("/top-packages", formData);

      setTitle("");
      setLocation("");
      setPrice("");
      setPlaceCount("");
      setImage(null);

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
    <div className="space-y-10">
      <div className="bg-white p-6 rounded-xl shadow border max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">
          ➕ Add Top Package
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="border px-3 py-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded"
            placeholder="Places"
            value={placeCount}
            onChange={(e) => setPlaceCount(e.target.value)}
          />

          <input
            type="file"
            className="md:col-span-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Places</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate(`/top-packages/${p._id}`)
                  }
                >
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {p.title}
                  </td>

                  <td className="p-3">{p.location}</td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{p.price}
                  </td>

                  <td className="p-3">{p.placeCount}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePackage(p._id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
*/
/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TopPackages() {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= *//*
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
  <div className="space-y-10">
    <div className="bg-white p-6 rounded-xl shadow border max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">
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
          className="border px-3 py-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          className="border px-3 py-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="border px-3 py-2 rounded"
          placeholder="Places"
          value={placeCount}
          onChange={(e) => setPlaceCount(e.target.value)}
        />

        <input
          type="file"
          className="md:col-span-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>

    <div className="bg-white rounded-xl shadow border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Location</th>
            <th className="p-4">Price</th>
            <th className="p-4">Places</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {packages.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="p-6 text-center text-gray-500"
              >
                No packages found
              </td>
            </tr>
          ) : (
            packages.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  navigate(`/top-packages/${p._id}`)
                }
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">
                  {p.title}
                </td>

                <td className="p-3">{p.location}</td>

                <td className="p-3 text-green-600 font-semibold">
                  ₹{p.price}
                </td>

                <td className="p-3">{p.placeCount}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePackage(p._id);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
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
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
    <div className="space-y-10">
      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow border max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">
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
            className="border px-3 py-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="border px-3 py-2 rounded"
            placeholder="Places"
            value={placeCount}
            onChange={(e) => setPlaceCount(e.target.value)}
          />

          <input
            type="file"
            className="md:col-span-2"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
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
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50"
                >
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

                  {/* 🔥 ACTIONS */}
                  <td className="p-3 text-center">
                    <div className="flex gap-3 justify-center">
                      {/* ✅ VIEW (NEW) */}
                      <button
                        onClick={() =>
                          navigate(`/top-packages/${p._id}`)
                        }
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View
                      </button>

                      {/* ❌ DELETE (OLD – untouched) */}
                      <button
                        onClick={() => deletePackage(p._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
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
