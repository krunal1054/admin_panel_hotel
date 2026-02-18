/*import FormCard from "../components/FormCard";
import AdminLayout from "../components/AdminLayout";

export default function SubPackageForm() {
  return (
    <AdminLayout>
      <FormCard title="Add Sub Package">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="input" placeholder="Goa Beach Tour" />
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input className="input" placeholder="Goa" />
          </div>

          <div>
            <label className="block text-sm mb-1">Tour Type</label>
            <select className="input">
              <option>Family</option>
              <option>Couple</option>
              <option>Adventure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input className="input" placeholder="₹30,000" />
          </div>

          <div>
            <label className="block text-sm mb-1">Main Image</label>
            <input type="file" className="input" />
          </div>

          <div>
            <label className="block text-sm mb-1">Gallery Images</label>
            <input type="file" multiple className="input" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Inclusions</label>
            <textarea className="input h-24" placeholder="Hotel, Meals, Pickup"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Exclusions</label>
            <textarea className="input h-24" placeholder="Flights, Insurance"></textarea>
          </div>

          <button className="btn-primary md:col-span-2">
            Save Sub Package
          </button>
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

export default function SubPackages() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [price, setPrice] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !location || !tourType || !price || !mainImage) {
      setMessage("All required fields must be filled");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("tourType", tourType);
    formData.append("price", price);

    // backend expects arrays
    formData.append(
      "inclusions",
      JSON.stringify(
        inclusions.split(",").map((i) => i.trim())
      )
    );
    formData.append(
      "exclusions",
      JSON.stringify(
        exclusions.split(",").map((i) => i.trim())
      )
    );

    formData.append("mainImage", mainImage);

    for (let i = 0; i < galleryImages.length; i++) {
      formData.append("galleryImages", galleryImages[i]);
    }

    try {
      setLoading(true);

      await api.post("/sub-packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Sub Package added successfully");

      // reset form
      setTitle("");
      setLocation("");
      setTourType("Family");
      setPrice("");
      setMainImage(null);
      setGalleryImages([]);
      setInclusions("");
      setExclusions("");
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
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          Add Sub Package (Tour)
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
              placeholder="Goa Beach Tour"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Goa"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tour Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
            >
              <option>Family</option>
              <option>Couple</option>
              <option>Adventure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="₹30,000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Main Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setMainImage(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Gallery Images (max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={(e) =>
                setGalleryImages([...e.target.files])
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">
              Inclusions (comma separated)
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Hotel, Meals, Pickup"
              value={inclusions}
              onChange={(e) => setInclusions(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">
              Exclusions (comma separated)
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Flights, Insurance"
              value={exclusions}
              onChange={(e) => setExclusions(e.target.value)}
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
            {loading ? "Saving..." : "Save Sub Package"}
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

export default function SubPackages() {
  const [tours, setTours] = useState([]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [price, setPrice] = useState("");
  const [mainImage, setMainImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTours = async () => {
    try {
      const res = await api.get("/sub-packages");
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !location || !price || !mainImage) {
      setMessage("❌ All required fields must be filled");
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
      await api.post("/sub-packages", formData);
      setMessage("✅ Tour added successfully");

      // reset
      setTitle("");
      setLocation("");
      setTourType("Family");
      setPrice("");
      setMainImage(null);

      fetchTours();
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          ➕ Add Tour Package
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
          <input
            className="border px-3 py-2 rounded"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option>Family</option>
            <option>Couple</option>
            <option>Adventure</option>
          </select>

          <input
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="md:col-span-2"
            onChange={(e) => setMainImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded"
          >
            {loading ? "Saving..." : "Save Tour"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow border">
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b font-semibold text-gray-600">
          <div>Image</div>
          <div>Tour</div>
          <div>Location</div>
          <div>Price</div>
          <div>Status</div>
        </div>

        {tours.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No tours found
          </p>
        ) : (
          tours.map((tour) => (
            <div
              key={tour._id}
              className="grid grid-cols-5 gap-4 px-4 py-3 border-b items-center hover:bg-gray-50"
            >
              <img
                src={`http://localhost:5000/${tour.mainImage}`}
                className="w-16 h-12 object-cover rounded"
              />

              <div className="font-medium">{tour.title}</div>
              <div>{tour.location}</div>

              <div className="font-semibold text-green-600">
                ₹{tour.price}
              </div>

              <div className="text-blue-600 font-medium">
                Active
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SubPackages() {
  const [tours, setTours] = useState([]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [price, setPrice] = useState("");
  const [mainImage, setMainImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTours = async () => {
    try {
      const res = await api.get("/sub-packages");
      setTours(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

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
    await api.post("/sub-packages", formData);
    setMessage("✅ Tour added");

    setTitle("");
    setLocation("");
    setPrice("");
    setMainImage(null);

    fetchTours();
  } catch (err) {
    setMessage("❌ Save failed");
  } finally {
    setLoading(false);
  }
};

  const deleteTour = async (id) => {
    if (!window.confirm("Delete this tour?")) return;

    try {
      await api.delete(`/sub-packages/${id}`);
      setMessage("🗑 Tour deleted");
      fetchTours();
    } catch {
      setMessage("❌ Failed to delete tour");
    }
  };

  return (
    <div className="space-y-10">
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          ➕ Add Tour Package
        </h1>

        {message && (
          <p className="mb-4 text-sm text-center text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            className="border px-3 py-2 rounded"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option>Family</option>
            <option>Couple</option>
            <option>Adventure</option>
          </select>

          <input
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="md:col-span-2"
            onChange={(e) => setMainImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save Tour"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
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
              className="grid grid-cols-6 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50"
            >
              <img
                src={`http://localhost:5000/${tour.mainImage}`}
                className="w-16 h-12 object-cover rounded"
              />

              <div className="font-medium">{tour.title}</div>
              <div>{tour.location}</div>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {tour.tourType}
              </span>

              <div className="font-semibold text-green-600">
                ₹{tour.price}
              </div>

              <div className="flex gap-3">
                <button
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTour(tour._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
      await api.post("/sub-packages", formData);
      setMessage("✅ Sub package added");

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
    <div className="space-y-10">
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-6">
          ➕ Add Sub Package
        </h1>

        {message && (
          <p className="mb-4 text-sm text-center text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            className="border px-3 py-2 rounded"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option>Family</option>
            <option>Couple</option>
            <option>Adventure</option>
          </select>

          <input
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="md:col-span-2"
            onChange={(e) => setMainImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-x-auto">
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
              className="grid grid-cols-6 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={`http://localhost:5000/${tour.mainImage}`}
                alt={tour.title}
                className="w-16 h-12 object-cover rounded"
                onClick={() =>
                  navigate(`/sub-packages/${tour._id}`)
                }
              />

              <div
                className="font-medium text-blue-600 hover:underline"
                onClick={() =>
                  navigate(`/sub-packages/${tour._id}`)
                }
              >
                {tour.title}
              </div>

              <div>{tour.location}</div>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {tour.tourType}
              </span>

              <div className="font-semibold text-green-600">
                ₹{tour.price}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/sub-packages/${tour._id}`)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => deleteTour(tour._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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

  /* 🔥 UI STATUS (NO BACKEND IMPACT) */
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

  /* 🔥 AUTO STATUS WHEN FORM FILLED */
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
    <div className="space-y-10">
      <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-2">
          ➕ Add Sub Package
        </h1>

        {/* 🔥 STATUS TEXT (LIKE TOP PACKAGE) */}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            className="border px-3 py-2 rounded"
            placeholder="Tour Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option>Family</option>
            <option>Couple</option>
            <option>Adventure</option>
          </select>

          <input
            className="border px-3 py-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="md:col-span-2"
            onChange={(e) => setMainImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
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
              className="grid grid-cols-6 gap-4 px-6 py-4 border-b items-center hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={`http://localhost:5000/${tour.mainImage}`}
                alt={tour.title}
                className="w-16 h-12 object-cover rounded"
                onClick={() =>
                  navigate(`/sub-packages/${tour._id}`)
                }
              />

              <div
                className="font-medium text-blue-600 hover:underline"
                onClick={() =>
                  navigate(`/sub-packages/${tour._id}`)
                }
              >
                {tour.title}
              </div>

              <div>{tour.location}</div>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {tour.tourType}
              </span>

              <div className="font-semibold text-green-600">
                ₹{tour.price}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/sub-packages/${tour._id}`)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => deleteTour(tour._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
