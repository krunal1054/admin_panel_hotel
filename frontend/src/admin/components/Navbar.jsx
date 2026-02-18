import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-emerald-600 font-semibold"
      : "text-gray-600 hover:text-emerald-600";

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">Tour Website</h1>

        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/tours" className={linkClass}>
            Tours
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
