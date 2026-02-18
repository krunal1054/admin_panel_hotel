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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow border">
      {/* HEADER */}
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Registered Admins
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-center whitespace-nowrap">
                #
              </th>
              <th className="p-3 border text-left whitespace-nowrap">
                Name
              </th>
              <th className="p-3 border text-left whitespace-nowrap">
                Email
              </th>
              <th className="p-3 border text-center whitespace-nowrap">
                Created At
              </th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin, index) => (
              <tr
                key={admin._id}
                className="text-center hover:bg-gray-50"
              >
                <td className="p-3 border">
                  {index + 1}
                </td>

                <td className="p-3 border whitespace-nowrap">
                  {admin.name}
                </td>

                <td className="p-3 border break-all text-left">
                  {admin.email}
                </td>

                <td className="p-3 border whitespace-nowrap">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
