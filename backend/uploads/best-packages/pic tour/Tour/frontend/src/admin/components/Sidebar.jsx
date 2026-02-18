/*import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="px-6 py-5 text-xl font-bold flex items-center gap-2">
        <span className="text-emerald-600">■</span> travl
      </div>

      <nav className="px-4 space-y-1 text-gray-600">
        {[
          "Dashboard",
          "Top Packages",
          "Best Packages",
          "Sub Packages",
          "Bookings",
          "Users"
        ].map((item, i) => (
          <Link
            key={i}
            to="#"
            className="block px-4 py-2 rounded hover:bg-emerald-50 hover:text-emerald-600"
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
*/
/*
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-5 text-xl font-bold border-b">
        🧳 Tour Admin
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/top-packages" className={linkClass}>
          🗂 Top Packages
        </NavLink>

        <NavLink to="/admin/best-packages" className={linkClass}>
          ⭐ Best Packages
        </NavLink>

        <NavLink to="/admin/sub-packages" className={linkClass}>
          🧭 Tours
        </NavLink>

        <NavLink to="/admin/example" className={linkClass}>
          🧪 Example
        </NavLink>
<NavLink to="/admin/users" className={linkClass}>
  👤 Users
</NavLink>

        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}
*/
/*
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-5 text-xl font-bold border-b">
        🧳 Tour Admin
      </div>

      <nav className="p-4 space-y-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/top-packages" className={linkClass}>
          🗂 Top Packages
        </NavLink>

        <NavLink to="/admin/best-packages" className={linkClass}>
          ⭐ Best Packages
        </NavLink>

        <NavLink to="/admin/sub-packages" className={linkClass}>
          🧭 Tours
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          🧾 Bookings
        </NavLink>

        <NavLink to="/admin/inquiries" className={linkClass}>
          📩 Inquiries
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          👤 Users
        </NavLink>

        <button
          onClick={logout}
          className="w-full text-left mt-4 px-4 py-2 rounded text-red-600 hover:bg-red-100"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}
*/
/*
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSuitcase,
  FaStar,
  FaList,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="p-5 text-xl font-bold border-b">
        🏝️ Tour Admin
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs text-gray-400 mb-2 uppercase">
          Main
        </p>

        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <p className="text-xs text-gray-400 mt-4 mb-2 uppercase">
          Packages
        </p>

        <NavLink to="/admin/top-packages" className={linkClass}>
          <FaStar />
          Top Packages
        </NavLink>

        <NavLink to="/admin/best-packages" className={linkClass}>
          <FaSuitcase />
          Best Packages
        </NavLink>

        <NavLink to="/admin/sub-packages" className={linkClass}>
          <FaList />
          All Tours
        </NavLink>

        <p className="text-xs text-gray-400 mt-4 mb-2 uppercase">
          Management
        </p>

        <NavLink to="/admin/bookings" className={linkClass}>
          <FaClipboardList />
          Bookings
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers />
          Users
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg
                     text-red-600 hover:bg-red-50 transition text-sm"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
*/
/*
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
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
     ${
       isActive
         ? "bg-blue-600 text-white shadow"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-5 border-b">
        <span className="text-xl font-bold tracking-wide">
          🏨 Tour Admin
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        <p className="px-3 text-xs text-gray-400 uppercase mb-1">
          Dashboard
        </p>

        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
          Tour Packages
        </p>

        <NavLink to="/admin/top-packages" className={linkClass}>
          <FaStar />
          Top Packages
        </NavLink>

        <NavLink to="/admin/best-packages" className={linkClass}>
          <FaSuitcase />
          Best Packages
        </NavLink>

        <NavLink to="/admin/sub-packages" className={linkClass}>
          <FaListAlt />
          Sub Packages
        </NavLink>
        <NavLink to="/admin/all-tours" className={linkClass}>
          <FaListAlt />
          All Tours
        </NavLink>

        <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
          Management
        </p>

        <NavLink to="/admin/bookings" className={linkClass}>
          <FaClipboardList />
          Bookings
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers />
          Users
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          <FaChartPie />
          Reports
        </NavLink>
      </nav>

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
  );
}
*/
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
  FaThList, // 🔥 All Tours icon
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
     ${
       isActive
         ? "bg-blue-600 text-white shadow"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* ================= LOGO ================= */}
      <div className="h-16 flex items-center px-5 border-b">
        <span className="text-xl font-bold tracking-wide">
          🏨 Tour Admin
        </span>
      </div>

      {/* ================= MENU ================= */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {/* DASHBOARD */}
        <p className="px-3 text-xs text-gray-400 uppercase mb-1">
          Dashboard
        </p>

        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        {/* TOUR PACKAGES */}
        <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
          Tour Packages
        </p>

        <NavLink to="/admin/top-packages" className={linkClass}>
          <FaStar />
          Top Packages
        </NavLink>

        <NavLink to="/admin/best-packages" className={linkClass}>
          <FaSuitcase />
          Best Packages
        </NavLink>

        <NavLink to="/admin/sub-packages" className={linkClass}>
          <FaListAlt />
          Sub Packages
        </NavLink>

        {/* 🔥 ALL TOURS (NEW – MIXED VIEW) */}
        <NavLink to="/admin/all-tours" className={linkClass}>
          <FaThList />
          All Tours
        </NavLink>

        {/* MANAGEMENT */}
        <p className="px-3 text-xs text-gray-400 uppercase mt-4 mb-1">
          Management
        </p>

        <NavLink to="/admin/bookings" className={linkClass}>
          <FaClipboardList />
          Bookings
        </NavLink>

        <NavLink to="/admin/customer" className={linkClass}>
          <FaUsers />
          Customers
        </NavLink>
<NavLink to="/admin/users" className={linkClass}>
          <FaUsers />
          Users
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          <FaChartPie />
          Reports
        </NavLink>
      </nav>

      {/* ================= LOGOUT ================= */}
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
  );
}
