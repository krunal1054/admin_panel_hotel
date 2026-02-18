import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaidUsers = async () => {
    try {
      const res = await api.get("/users/paid");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaidUsers();
  }, []);

  if (loading)
    return (
      <p className="p-4 sm:p-6 text-center">
        Loading...
      </p>
    );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      {/* HEADER */}
      <h1 className="text-lg sm:text-xl font-semibold mb-4">
        Paid Customers & Bookings
      </h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No paid customer found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border min-w-[700px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left whitespace-nowrap">
                  Name
                </th>
                <th className="p-2 border text-left whitespace-nowrap">
                  Email
                </th>
                <th className="p-2 border text-left whitespace-nowrap">
                  Mobile
                </th>
                <th className="p-2 border text-left whitespace-nowrap">
                  Package
                </th>
                <th className="p-2 border text-center whitespace-nowrap">
                  Payment
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-gray-50"
                >
                  <td className="p-2 border whitespace-nowrap">
                    {u.name}
                  </td>

                  <td className="p-2 border break-all">
                    {u.email}
                  </td>

                  <td className="p-2 border whitespace-nowrap">
                    {u.mobile}
                  </td>

                  <td className="p-2 border break-words">
                    {u.packageName}
                  </td>

                  <td className="p-2 border">
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      {u.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
