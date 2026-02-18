import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Users() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/admin/users");
      setAdmins(res.data);
    } catch (err) {
      setError("Failed to load admins");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-6">Registered Admins</h2>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin._id} className="text-center">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{admin.name}</td>
              <td className="p-3 border">{admin.email}</td>
              <td className="p-3 border">
                {new Date(admin.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
