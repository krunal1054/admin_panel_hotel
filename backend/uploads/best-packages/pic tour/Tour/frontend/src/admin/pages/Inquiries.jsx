import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../services/api";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get("/inquiry");
      setInquiries(res.data?.data || []);
    } catch (err) {
      setMessage("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow border">
        <h1 className="text-xl font-semibold mb-4">Customer Inquiries</h1>

        {message && (
          <p className="mb-3 text-sm text-center text-red-600">
            {message}
          </p>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-gray-500">No inquiries found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Tour</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="text-center">
                    <td className="p-2 border">{inq.name}</td>
                    <td className="p-2 border">{inq.email}</td>
                    <td className="p-2 border">{inq.mobile}</td>
                    <td className="p-2 border text-left">
                      {inq.message}
                    </td>
                    <td className="p-2 border">
                      {inq.subPackageId?.title || "-"}
                    </td>
                    <td className="p-2 border text-sm text-gray-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
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
