/*import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    setLoading(true);
    const res = await fetchTours({ price, location });
    setTours(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTours();
  }, [price, location]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Tours</h1>

      <div className="flex gap-4 mb-8">
        <select
          onChange={(e) => setLocation(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="Goa">Goa</option>
          <option value="Manali">Manali</option>
        </select>

        <select
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹30k</option>
          <option value="high">Above ₹30k</option>
        </select>
      </div>

      {loading && <p>Loading tours...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Link
            key={tour._id}
            to={`/tour/${tour._id}`}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200">
              {tour.image && (
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="font-semibold">{tour.title}</h2>
              <p className="text-gray-600">
                ₹{tour.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{tour.location}</p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && tours.length === 0 && (
        <p className="text-gray-500 mt-10">No tours found.</p>
      )}
    </div>
  );
}
*/
/*

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    setLoading(true);
    const res = await fetchTours({ price, location });
    setTours(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTours();
  }, [price, location]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Tours</h1>

      <div className="flex gap-4 mb-8">
        <select
          onChange={(e) => setLocation(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="Goa">Goa</option>
          <option value="Shimla">Shimla</option>
        </select>

        <select
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹30k</option>
          <option value="high">Above ₹30k</option>
        </select>
      </div>

      {loading && <p>Loading tours...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Link
            key={tour._id}
            to={`/tour/${tour._id}`}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200">
              <img
                src={`http://localhost:5000/${tour.mainImage}`}
                alt={tour.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold">{tour.title}</h2>
              <p className="text-gray-600">
                ₹{Number(tour.price).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{tour.location}</p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && tours.length === 0 && (
        <p className="text-gray-500 mt-10">No tours found.</p>
      )}
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

const BACKEND_URL = "http://localhost:5000";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    try {
      setLoading(true);
      const res = await fetchTours({ price, location });
      setTours(res.data || []);
    } catch (error) {
      console.error("Failed to load tours", error);
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, [price, location]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Tours</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="Goa">Goa</option>
          <option value="Shimla">Shimla</option>
          <option value="Manali">Manali</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹30k</option>
          <option value="high">Above ₹30k</option>
        </select>
      </div>

      {loading && (
        <p className="text-gray-500 text-center">Loading tours...</p>
      )}

      {!loading && tours.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Link
              key={tour._id}
              to={`/tour/${tour._id}`}
              className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
            >
              <div className="h-44 bg-gray-200 overflow-hidden">
                <img
                  src={`${BACKEND_URL}/${tour.mainImage}`}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {tour.title}
                </h2>

                <p className="text-gray-600">
                  ₹{Number(tour.price).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {tour.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && tours.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No tours found.
        </p>
      )}
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";
console.log("🔥 REAL TOURS JSX LOADED 🔥");

const BACKEND_URL = "http://localhost:5000";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const res = await fetchTours();
        setTours(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTours();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Tours</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Link
            key={tour._id}
            to={`/tour/${tour._id}`}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-lg"
          >
            <img
              src={`${BACKEND_URL}/${tour.mainImage}`}
              className="h-44 w-full object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image")
              }
            />

            <div className="p-4">
              <h2 className="font-semibold">{tour.title}</h2>
              <p>₹{tour.price}</p>
              <p className="text-sm text-gray-500">{tour.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
*//*

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tourType, setTourType] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    loadTours();
  }, [tourType]);

  const loadTours = async () => {
    try {
      setLoading(true);
      const res = await fetchTours(tourType);
      setTours(res.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Tours</h1>

        <select
          value={tourType}
          onChange={(e) => setTourType(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="All">All Tours</option>
          <option value="Family">Family</option>
          <option value="Couple">Couple</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading tours...</div>
      ) : (
        <div className="bg-white rounded-xl shadow border">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-gray-600 font-semibold">
            <div>Image</div>
            <div>Tour</div>
            <div>Location</div>
            <div>Price</div>
            <div>Status</div>
          </div>

          {tours.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No tours found
            </div>
          ) : (
            tours.map((tour) => (
              <div
                key={tour._id}
                onClick={() => navigate(`/tours/${tour._id}`)}
                className="grid grid-cols-5 gap-4 px-6 py-4 border-b items-center
                           hover:bg-gray-50 cursor-pointer transition"
              >
                <img
                  src={`http://localhost:5000/${tour.mainImage}`}
                  alt={tour.title}
                  className="w-20 h-14 object-cover rounded-lg"
                />

                <div className="font-medium">{tour.title}</div>
                <div className="text-gray-600">{tour.location}</div>

                <div className="font-semibold text-green-600">
                  ₹{tour.price}
                </div>

                <div className="text-blue-600 font-medium">Active</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  fetchTours,
  createTour,
  deleteTour,
} from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [mainImage, setMainImage] = useState(null);

  const loadTours = async () => {
    try {
      setLoading(true);
      const res = await fetchTours();
      setTours(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !location || !price || !mainImage) {
      setMessage("❌ All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("tourType", tourType);
    formData.append("mainImage", mainImage);

    try {
      await createTour(formData);
      setMessage("✅ Tour added successfully");

      setTitle("");
      setLocation("");
      setPrice("");
      setTourType("Family");
      setMainImage(null);

      loadTours();
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Failed to save tour");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;

    try {
      await deleteTour(id);
      setMessage("✅ Tour deleted");
      loadTours();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="max-w-3xl bg-white p-6 rounded-xl shadow border">
          <h1 className="text-xl font-semibold mb-6">
            ➕ Add Tour
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

            <input
              type="number"
              className="border px-3 py-2 rounded"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <select
              className="border px-3 py-2 rounded"
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
            >
              <option value="Family">Family</option>
              <option value="Couple">Couple</option>
              <option value="Adventure">Adventure</option>
            </select>

            <input
              type="file"
              accept="image/*"
              className="md:col-span-2"
              onChange={(e) => setMainImage(e.target.files[0])}
            />

            <button
              type="submit"
              className="md:col-span-2 bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Save Tour
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow border">
          <div className="grid grid-cols-6 gap-4 px-4 py-3 border-b font-semibold text-gray-600">
            <div>Image</div>
            <div>Title</div>
            <div>Location</div>
            <div>Type</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {loading ? (
            <p className="p-4 text-gray-500">Loading...</p>
          ) : tours.length === 0 ? (
            <p className="p-4 text-gray-500">No tours found</p>
          ) : (
            tours.map((tour) => (
              <div
                key={tour._id}
                className="grid grid-cols-6 gap-4 px-4 py-3 border-b items-center"
              >
                <img
                  src={`http://localhost:5000/uploads/${tour.mainImage}`}
                  alt={tour.title}
                  className="w-16 h-12 object-cover rounded"
                />

                <div className="font-medium">{tour.title}</div>
                <div>{tour.location}</div>
                <div>{tour.tourType || "-"}</div>

                <div className="font-semibold text-green-600">
                  ₹{tour.price}
                </div>

                <button
                  onClick={() => handleDelete(tour._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}*/


/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const res = await fetchTours();
      setTours(res.data || []);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading tours...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Tours</h1>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-gray-600 font-semibold">
          <div>Image</div>
          <div>Tour</div>
          <div>Location</div>
          <div>Price</div>
          <div>Status</div>
        </div>

        {tours.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No tours found
          </div>
        ) : (
          tours.map((tour) => (
            <div
              key={tour._id}
              onClick={() => navigate(`/tours/${tour._id}`)} // ✅ WEBSITE DETAIL
              className="grid grid-cols-5 gap-4 px-6 py-4 border-b items-center
                         hover:bg-gray-50 cursor-pointer transition"
            >
              <img
                src={`http://localhost:5000/uploads/${tour.mainImage}`}
                alt={tour.title}
                className="w-20 h-14 object-cover rounded-lg"
              />

              <div className="font-medium">{tour.title}</div>

              <div className="text-gray-600">{tour.location}</div>

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
import { useNavigate } from "react-router-dom";
import { fetchTours } from "../../services/tour.api";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const res = await fetchTours();
      setTours(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading tours...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow border">
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b font-semibold">
        <div>Image</div>
        <div>Title</div>
        <div>Location</div>
        <div>Price</div>
        <div>Status</div>
      </div>

      {tours.map((tour) => (
      <div
  key={tour._id}
  onClick={() => window.location.href = `/tours/${tour._id}`}
  className="cursor-pointer hover:bg-gray-50"
>

          <img
            src={`http://localhost:5000/uploads/${tour.mainImage}`}
            className="w-20 h-14 object-cover rounded"
          />

          <div className="font-medium">{tour.title}</div>
          <div>{tour.location}</div>

          <div className="text-green-600 font-semibold">
            ₹{tour.price}
          </div>

          <div className="text-blue-600">Active</div>
        </div>
      ))}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!tour) return <p className="p-6 text-red-500">Tour not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      {/* ✅ IMAGE FIXED */}
      <img
        src={`http://localhost:5000/${tour.mainImage}`}
        alt={tour.title}
        className="w-full h-[400px] object-cover rounded-xl border"
      />

      <h1 className="text-3xl font-bold mt-6">{tour.title}</h1>
      <p className="text-gray-600 mt-1">📍 {tour.location}</p>

      <p className="text-2xl text-green-600 font-semibold mt-3">
        ₹{tour.price}
      </p>
    </div>
  );
}
