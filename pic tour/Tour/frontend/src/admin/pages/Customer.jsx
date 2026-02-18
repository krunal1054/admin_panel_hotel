/*import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data?.users || []);
    } catch (err) {
      setMessage("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);
      setMessage("✅ User deleted successfully");
      fetchUsers();
    } catch {
      setMessage("❌ Failed to delete user");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-4">Users</h1>

        {message && (
          <p className="mb-3 text-sm text-center text-blue-600">
            {message}
          </p>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Joined</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="text-center">
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">
                      {u.mobile_no || "-"}
                    </td>
                    <td className="p-2 border text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
*//*

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data?.users || []);
    } catch (err) {
      setMessage("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);
      setMessage("✅ User deleted successfully");
      fetchUsers();
    } catch {
      setMessage("❌ Failed to delete user");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      {message && (
        <p className="mb-3 text-sm text-center text-blue-600">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Joined</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="text-center">
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">
                    {u.mobile_no || "-"}
                  </td>
                  <td className="p-2 border text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
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
*/

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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">
        Paid Customers & Bookings
      </h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No paid customer found</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Package</th>
              <th className="p-2 border">Payment</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.mobile}</td>
                <td className="p-2 border">{u.packageName}</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    {u.paymentStatus.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
