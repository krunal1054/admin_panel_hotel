/*import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}*/
/*
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h2 className="font-semibold text-lg">Tour Admin Panel</h2>

          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
*//*

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">Welcome, Admin</h2>
            <p className="text-xs text-gray-500">
              Tour Management Dashboard
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
*/

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex flex-col">
        {/* ================= TOP BAR ================= */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">
              Welcome, Admin
            </h2>
            <p className="text-xs text-gray-500">
              Tour Management Dashboard
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        {/* 🔥 VERY IMPORTANT — DETAIL PAGES YAHI RENDER HONGE */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
