/*import FormCard from "../components/FormCard";
import AdminLayout from "../components/AdminLayout";

export default function BestPackageForm() {
  return (
    <AdminLayout>
      <FormCard title="Add Best Package">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" placeholder="Goa Holiday" />
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input className="input" placeholder="₹25,000" />
          </div>

          <div>
            <label className="block text-sm mb-1">Days</label>
            <input className="input" placeholder="3 Days / 2 Nights" />
          </div>

          <div>
            <label className="block text-sm mb-1">Tags</label>
            <input className="input" placeholder="Beach, Family" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Image</label>
            <input type="file" className="input" />
          </div>

          <button className="btn-primary md:col-span-2">
            Save Package
          </button>
        </div>
      </FormCard>
    </AdminLayout>
  );
}*/

/*
import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function BestPackages() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !price || !days || !tags || !image) {
      setMessage("All fields are required");
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

      await api.post("/best-packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Best Package added successfully");

      // reset form
      setTitle("");
      setPrice("");
      setDays("");
      setTags("");
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
      <div className="max-w-2xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          Add Best Package
        </h1>

        {message && (
          <p className="mb-4 text-sm text-center text-red-600">
            {message}
          </p>
        )}

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Goa Holiday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="₹25,000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Days</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="3 Days / 2 Nights"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tags</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Beach, Family"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
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
            className={`md:col-span-2 py-2 rounded text-white ${
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
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function BestPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBestPackages = async () => {
    try {
      const res = await api.get("/best-packages");
      setPackages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBestPackages();
  }, []);

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
      await api.post("/best-packages", formData);
      setMessage("✅ Package added");

      setTitle("");
      setPrice("");
      setDays("");
      setTags("");
      setImage(null);

      fetchBestPackages(); // 🔥 MOST IMPORTANT
    } catch (err) {
      setMessage("❌ Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Add Best Package
        </h2>

        {message && <p className="mb-3">{message}</p>}

        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-4">
          <input placeholder="Title" value={title}
            onChange={(e) => setTitle(e.target.value)} className="border p-2" />

          <input placeholder="Price" value={price}
            onChange={(e) => setPrice(e.target.value)} className="border p-2" />

          <input placeholder="Days" value={days}
            onChange={(e) => setDays(e.target.value)} className="border p-2" />

          <input placeholder="Tags" value={tags}
            onChange={(e) => setTags(e.target.value)} className="border p-2" />

          <input type="file" onChange={(e) => setImage(e.target.files[0])}
            className="col-span-2" />

          <button className="col-span-2 bg-black text-white py-2">
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow">
        <div className="grid grid-cols-4 p-4 border-b font-semibold">
          <div>Image</div>
          <div>Title</div>
          <div>Days</div>
          <div>Price</div>
        </div>

        {packages.length === 0 ? (
          <p className="p-4 text-gray-500">No packages found</p>
        ) : (
          packages.map((p) => (
            <div key={p._id}
              className="grid grid-cols-4 p-4 border-b items-center">
              <img
                src={`http://localhost:5000/${p.image}`}
                className="w-16 h-12 object-cover"
              />
              <div>{p.title}</div>
              <div>{p.days}</div>
              <div className="text-green-600">₹{p.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
*//*

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function BestPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FORM STATE *//*
const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [days, setDays] = useState("");
const [tags, setTags] = useState("");
const [image, setImage] = useState(null);
const [message, setMessage] = useState("");

/* ================= FETCH ================= *//*
const fetchBestPackages = async () => {
  const res = await api.get("/best-packages");
  setPackages(res.data || []);
};

useEffect(() => {
  fetchBestPackages();
}, []);

/* ================= CREATE ================= *//*
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
    await api.post("/best-packages", formData);
    setMessage("✅ Package added");

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

return (
  <div className="space-y-10">
    {/* ================= FORM ================= *//*}
<div className="bg-white p-6 rounded-xl shadow border max-w-2xl">
  <h2 className="text-xl font-semibold mb-6">
    ➕ Add Best Package
  </h2>

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
      className="border px-3 py-2 rounded"
    />

    <input
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="border px-3 py-2 rounded"
    />

    <input
      placeholder="Days (e.g. 3 Days / 2 Nights)"
      value={days}
      onChange={(e) => setDays(e.target.value)}
      className="border px-3 py-2 rounded"
    />

    <input
      placeholder="Tags (Beach, Family)"
      value={tags}
      onChange={(e) => setTags(e.target.value)}
      className="border px-3 py-2 rounded"
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

{/* ================= TABLE ================= *//*}
<div className="bg-white rounded-xl shadow border overflow-x-auto">
  <table className="w-full text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-4">Image</th>
        <th className="p-4">Title</th>
        <th className="p-4">Days</th>
        <th className="p-4">Price</th>
      </tr>
    </thead>

    <tbody>
      {packages.length === 0 ? (
        <tr>
          <td colSpan="4" className="p-6 text-center text-gray-500">
            No packages found
          </td>
        </tr>
      ) : (
        packages.map((p) => (
          <tr
            key={p._id}
            onClick={() =>
              navigate(`/best-packages/${p._id}`)
            }
            className="border-t hover:bg-gray-50 cursor-pointer"
          >
            <td className="p-3">
              <img
                src={`http://localhost:5000/${p.image}`}
                className="w-20 h-14 object-cover rounded"
              />
            </td>
            <td className="p-3 font-medium">{p.title}</td>
            <td className="p-3">{p.days}</td>
            <td className="p-3 text-green-600 font-semibold">
              ₹{p.price}
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
*//*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function BestPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBestPackages = async () => {
    const res = await api.get("/best-packages");
    setPackages(res.data || []);
  };

  useEffect(() => {
    fetchBestPackages();
  }, []);

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
      await api.post("/best-packages", formData);
      setMessage("✅ Package added");

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

  return (
    <div className="space-y-10">
      <div className="bg-white p-6 rounded-xl shadow border max-w-3xl">
        <h2 className="text-xl font-semibold mb-6">
          ➕ Add Best Package
        </h2>

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
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Days (e.g. 3 Days / 2 Nights)"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Tags (Beach, Family)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border px-3 py-2 rounded"
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

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b font-semibold text-gray-700">
          📦 Best Packages List
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Days</th>
              <th className="p-4 text-right">Price</th>
            </tr>
          </thead>

          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((p) => (
                <tr
                  key={p._id}
                  onClick={() =>
                    navigate(`/best-packages/${p._id}`)
                  }
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      className="w-20 h-14 object-cover rounded-md border"
                      alt={p.title}
                    />
                  </td>

                  <td className="p-4 font-medium text-gray-800">
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

export default function BestPackages() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FORM STATE *//*
const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [days, setDays] = useState("");
const [tags, setTags] = useState("");
const [image, setImage] = useState(null);
const [message, setMessage] = useState("");

/* 🔥 UI STATUS (LIKE TOP / SUB PACKAGE) *//*
const [statusText, setStatusText] = useState("ℹ️ Fill all details");

/* FETCH *//*
const fetchBestPackages = async () => {
  const res = await api.get("/best-packages");
  setPackages(res.data || []);
};

useEffect(() => {
  fetchBestPackages();
}, []);

/* 🔥 AUTO STATUS WHEN FORM FILLED *//*
useEffect(() => {
  if (title && price && days && image) {
    setStatusText("✅ Ready to Save");
  } else {
    setStatusText("ℹ️ Fill all details");
  }
}, [title, price, days, image]);

/* CREATE *//*
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

return (
  <div className="space-y-10">
    {/* ================= ADD FORM ================= *//*}
<div className="bg-white p-6 rounded-xl shadow border max-w-3xl">
  <h2 className="text-xl font-semibold mb-2">
    ➕ Add Best Package
  </h2>

  {/* 🔥 STATUS TEXT *//*}
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
    className="border px-3 py-2 rounded"
  />

  <input
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="border px-3 py-2 rounded"
  />

  <input
    placeholder="Days (e.g. 3 Days / 2 Nights)"
    value={days}
    onChange={(e) => setDays(e.target.value)}
    className="border px-3 py-2 rounded"
  />

  <input
    placeholder="Tags (Beach, Family)"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    className="border px-3 py-2 rounded"
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

{/* ================= TABLE ================= *//*}
<div className="bg-white rounded-xl shadow border overflow-hidden">
  <div className="px-6 py-4 border-b font-semibold text-gray-700">
    📦 Best Packages List
  </div>

  <table className="w-full text-sm">
    <thead className="bg-gray-100 text-gray-600">
      <tr>
        <th className="p-4 text-left">Image</th>
        <th className="p-4 text-left">Title</th>
        <th className="p-4 text-center">Days</th>
        <th className="p-4 text-right">Price</th>
      </tr>
    </thead>

    <tbody>
      {packages.length === 0 ? (
        <tr>
          <td
            colSpan="4"
            className="p-6 text-center text-gray-500"
          >
            No packages found
          </td>
        </tr>
      ) : (
        packages.map((p) => (
          <tr
            key={p._id}
            onClick={() =>
              navigate(`/best-packages/${p._id}`)
            }
            className="border-t hover:bg-gray-50 cursor-pointer"
          >
            <td className="p-4">
              <img
                src={`http://localhost:5000/${p.image}`}
                className="w-20 h-14 object-cover rounded-md border"
                alt={p.title}
              />
            </td>

            <td className="p-4 font-medium text-gray-800">
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
    <div className="space-y-10">
      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow border max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">
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
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Days (e.g. 3 Days / 2 Nights)"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            placeholder="Tags (Beach, Family)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border px-3 py-2 rounded"
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

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b font-semibold text-gray-700">
          📦 Best Packages List
        </div>

        <table className="w-full text-sm">
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

                  {/* 🔥 ACTIONS (ADDED) */}
                  <td className="p-4 text-center">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/best-packages/${p._id}`)
                        }
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View
                      </button>

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
