import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { fetchTourById, updateTour } from "../../services/tour.api";

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [tourType, setTourType] = useState("Family");
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    loadTour();
  }, []);

  const loadTour = async () => {
    const res = await fetchTourById(id);
    setTitle(res.data.title);
    setLocation(res.data.location);
    setPrice(res.data.price);
    setTourType(res.data.tourType);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("tourType", tourType);
    if (mainImage) formData.append("mainImage", mainImage);

    await updateTour(id, formData);
    navigate("/admin/top-packages");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Tour</h1>

      <form onSubmit={submitHandler} className="max-w-xl space-y-4">
        <input
          className="w-full border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="w-full border px-3 py-2"
          value={tourType}
          onChange={(e) => setTourType(e.target.value)}
        >
          <option>Family</option>
          <option>Couple</option>
          <option>Adventure</option>
        </select>

        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files[0])}
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Update Tour
        </button>
      </form>
    </AdminLayout>
  );
}
