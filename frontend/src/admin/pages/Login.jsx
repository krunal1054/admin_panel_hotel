import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-purple-500">
      <form
        onSubmit={login}
        className="bg-white w-[400px] rounded-2xl shadow-xl p-10 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <div className="flex items-center border-b">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <div className="flex items-center border-b">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* FORGOT */}
        <div className="text-right text-sm mb-6">
          <span className="text-purple-600 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full py-2 rounded-full text-white font-semibold
                     bg-gradient-to-r from-cyan-400 to-purple-500
                     hover:scale-105 transition-transform"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {/* SOCIAL LOGIN */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Or login with
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <SocialIcon icon={<FaFacebookF />} color="bg-blue-600" />
          <SocialIcon icon={<FaTwitter />} color="bg-sky-400" />
          <SocialIcon icon={<FaGoogle />} color="bg-red-500" />
        </div>

        {/* SIGN UP */}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/admin/register" className="text-purple-600 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

function SocialIcon({ icon, color }) {
  return (
    <div
      className={`${color} text-white w-10 h-10 rounded-full flex items-center justify-center
                  cursor-pointer hover:scale-110 transition-transform`}
    >
      {icon}
    </div>
  );
}
