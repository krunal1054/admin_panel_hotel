import { Routes, Route, Navigate } from "react-router-dom";

/* ================= ADMIN ================= */
import AdminLayout from "./admin/layouts/AdminLayout";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Dashboard from "./admin/pages/Dashboard";
import ToursAdmin from "./admin/pages/Tours";
import TopPackages from "./admin/pages/TopPackages";
import BestPackages from "./admin/pages/BestPackages";
import SubPackages from "./admin/pages/SubPackages";
import AllTours from "./admin/pages/AllTours";
import Bookings from "./admin/pages/Bookings";
import Inquiries from "./admin/pages/Inquiries";
import Customer from "./admin/pages/Customer";
import Users from "./admin/pages/Users";
import Reports from "./admin/pages/Reports";

/* ================= WEBSITE ================= */
import Home from "./website/pages/Home";
import TourDetails from "./website/pages/TourDetails";
import TopPackageDetails from "./website/pages/TopPackageDetails";
import BestPackageDetails from "./website/pages/BestPackageDetails";
import SubPackageDetails from "./website/pages/SubPackageDetails";
import Booking from "./website/pages/Booking"; // ✅ ADD THIS

/* ================= ADMIN GUARD ================= */


const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};
export default function App() {
  return (
    <Routes>
      {/* ================= WEBSITE ================= */}
      <Route
        path="/"
        element={
          localStorage.getItem("adminToken")
            ? <Navigate to="/admin/register" replace />
            : <Home />
        }
      />

      {/* ===== PUBLIC DETAIL PAGES ===== */}
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/top-packages/:id" element={<TopPackageDetails />} />
      <Route path="/best-packages/:id" element={<BestPackageDetails />} />
      <Route path="/sub-packages/:id" element={<SubPackageDetails />} />

      {/* ✅ BOOKING PAGE (PUBLIC) */}
      <Route path="/booking/top/:id" element={<Booking />} />
      <Route path="/booking/sub/:id" element={<Booking />} />
      <Route path="/booking/best/:id" element={<Booking />} />   {/* ✅ ADD */}

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />


      {/* ================= ADMIN PANEL ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<ToursAdmin />} />
        <Route path="top-packages" element={<TopPackages />} />
        <Route path="best-packages" element={<BestPackages />} />
        <Route path="sub-packages" element={<SubPackages />} />
        <Route path="all-tours" element={<AllTours />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="customer" element={<Customer />} />
        <Route path="users" element={<Users />} />
        <Route path="/admin/reports" element={<Reports />} />

      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
