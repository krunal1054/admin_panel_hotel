import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSuitcase,
  FaStar,
  FaListAlt,
  FaClipboardList,
  FaUsers,
  FaChartPie,
  FaSignOutAlt,
  FaThList,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
     ${isActive
      ? "bg-blue-600 text-white shadow"
      : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* 🔥 MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          top-0 left-0
          h-screen
          bg-white border-r
          flex flex-col
          w-72
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center justify-between px-5 border-b">
          <span className="text-lg lg:text-xl font-bold tracking-wide">
            🏨 Tour Admin
          </span>

          {/* ❌ CLOSE BUTTON (MOBILE) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          <p className="px-3 text-xs text-gray-400 uppercase mb-1">
            Dashboard
          </p>

          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
            Tour Packages
          </p>

          <NavLink to="/admin/top-packages" className={linkClass}>
            <FaStar /> Top Packages
          </NavLink>

          <NavLink to="/admin/best-packages" className={linkClass}>
            <FaSuitcase /> Best Packages
          </NavLink>

          <NavLink to="/admin/sub-packages" className={linkClass}>
            <FaListAlt /> Sub Packages
          </NavLink>

          <NavLink to="/admin/all-tours" className={linkClass}>
            <FaThList /> All Tours
          </NavLink>

          <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
            Management
          </p>

          <NavLink to="/admin/bookings" className={linkClass}>
            <FaClipboardList /> Bookings
          </NavLink>

          <NavLink to="/admin/customer" className={linkClass}>
            <FaUsers /> Customers
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass}>
            <FaChartPie /> Reports
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2
                       rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
