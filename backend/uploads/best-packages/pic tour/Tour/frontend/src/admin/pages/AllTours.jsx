/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AllTours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTours = async () => {
    try {
      const [top, best, sub] = await Promise.all([
        api.get("/top-packages"),
        api.get("/best-packages"),
        api.get("/sub-packages"),
      ]);

      const formatted = [
        ...top.data.map((t) => ({ ...t, type: "Top" })),
        ...best.data.map((t) => ({ ...t, type: "Best" })),
        ...sub.data.map((t) => ({ ...t, type: "Sub" })),
      ];

      setTours(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  const openDetails = (tour) => {
    if (tour.type === "Top") {
      navigate(`/top-packages/${tour._id}`);
    } else if (tour.type === "Best") {
      navigate(`/best-packages/${tour._id}`);
    } else {
      navigate(`/sub-packages/${tour._id}`);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">
      <h1 className="text-2xl font-bold p-6">📦 All Tours</h1>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Location</th>
            <th className="p-4">Type</th>
            <th className="p-4">Price</th>
          </tr>
        </thead>

        <tbody>
          {tours.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No tours found
              </td>
            </tr>
          ) : (
            tours.map((t) => (
              <tr
                key={t._id}
                onClick={() => openDetails(t)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/${t.image || t.mainImage}`}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium text-blue-600">
                  {t.title}
                </td>
                <td className="p-3">{t.location || "-"}</td>
                <td className="p-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {t.type}
                  </span>
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{t.price}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
*/
/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AllTours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/all-tours")
      .then(res => setTours(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const openDetails = (tour) => {
    if (tour.type === "Top") navigate(`/top-packages/${tour.refId}`);
    if (tour.type === "Best") navigate(`/best-packages/${tour.refId}`);
    if (tour.type === "Sub") navigate(`/sub-packages/${tour.refId}`);
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">
      <h1 className="text-2xl font-bold p-6">📦 All Tours</h1>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Location</th>
            <th className="p-4">Type</th>
            <th className="p-4">Price</th>
          </tr>
        </thead>

        <tbody>
          {tours.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No tours found
              </td>
            </tr>
          ) : (
            tours.map(t => (
              <tr
                key={t._id}
                onClick={() => openDetails(t)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/${t.image}`}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium text-blue-600">
                  {t.title}
                </td>
                <td className="p-3">{t.location || "-"}</td>
                <td className="p-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {t.type}
                  </span>
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  ₹{t.price}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AllTours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/all-tours")
      .then((res) => setTours(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openDetails = (t) => {
    if (t.type === "Top") navigate(`/top-packages/${t.refId}`);
    if (t.type === "Best") navigate(`/best-packages/${t.refId}`);
    if (t.type === "Sub") navigate(`/sub-packages/${t.refId}`);
  };

  const badge = (type) => {
    if (type === "Top") return "bg-blue-100 text-blue-700";
    if (type === "Best") return "bg-green-100 text-green-700";
    if (type === "Sub") return "bg-purple-100 text-purple-700";
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-semibold">📦 All Tours</h1>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-center">Type</th>
            <th className="p-4 text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          {tours.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No tours found
              </td>
            </tr>
          ) : (
            tours.map((t) => (
              <tr
                key={t._id}
                onClick={() => openDetails(t)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4">
                  <img
                    src={`http://localhost:5000/${t.image || t.mainImage}`}
                    className="w-20 h-14 object-cover rounded-md border"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150x100?text=No+Image")
                    }
                  />
                </td>

                <td className="p-4 font-medium text-blue-600">
                  {t.title}
                </td>

                <td className="p-4">{t.location || "-"}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${badge(
                      t.type
                    )}`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="p-4 text-right font-semibold text-green-600">
                  ₹{t.price}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
