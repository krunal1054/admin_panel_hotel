import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= DARK MODE INIT ================= */
  useEffect(() => {
    const saved = localStorage.getItem("adminTheme");
    if (saved === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("adminTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("adminTheme", "light");
    }
  }, [darkMode]);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div
      className={`flex min-h-screen transition
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}
      `}
    >
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header
          className={`h-16 border-b flex items-center justify-between px-4 sm:px-6 transition
            ${darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-200 border-gray-300"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {/* ☰ MOBILE MENU */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-xl"
            >
              <FaBars />
            </button>

            <div>
              <h2 className="text-lg font-semibold">
                Welcome, Admin
              </h2>
              <p className="text-xs text-gray-500">
                Tour Management Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition
                ${darkMode
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }
              `}
            >
              {darkMode ? "Dark Mode" : "Gray Mode"}
            </button>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-100 hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
