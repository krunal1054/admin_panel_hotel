/*import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/admin/register", form);
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-purple-500">
      <form
        onSubmit={register}
        className="bg-white w-[380px] rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <Input icon={<FaUser />} name="name" placeholder="Full Name" onChange={handleChange} />
        <Input icon={<FaEnvelope />} name="email" placeholder="Email" onChange={handleChange} />
        <Input icon={<FaLock />} name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Input icon={<FaLock />} name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

        <button
          disabled={loading}
          className="w-full py-2 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 mt-4"
        >
          {loading ? "Creating..." : "SIGN UP"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="mb-4">
      <div className="flex items-center border-b">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          className="w-full py-2 outline-none"
          required
          {...props}
        />
      </div>
    </div>
  );
}
*/
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      await api.post("/admin/register", form);
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-purple-500">
      <form
        onSubmit={register}
        className="bg-white w-[440px] rounded-2xl shadow-xl p-10 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <Input icon={<FaUser />} name="name" placeholder="Full Name" onChange={handleChange} />
        <Input icon={<FaEnvelope />} name="email" placeholder="Email" onChange={handleChange} />
        <Input icon={<FaLock />} type="password" name="password" placeholder="Password" onChange={handleChange} />
        <Input icon={<FaLock />} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

        <button
          disabled={loading}
          className="w-full py-2 rounded-full text-white font-semibold
                     bg-gradient-to-r from-cyan-400 to-purple-500
                     hover:scale-105 transition-transform mt-4"
        >
          {loading ? "Creating..." : "SIGN UP"}
        </button>

        {/* SOCIAL */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Or sign up with
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <SocialIcon icon={<FaFacebookF />} color="bg-blue-600" />
          <SocialIcon icon={<FaTwitter />} color="bg-sky-400" />
          <SocialIcon icon={<FaGoogle />} color="bg-red-500" />
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="mb-5">
      <div className="flex items-center border-b">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          className="w-full py-2 outline-none"
          required
          {...props}
        />
      </div>
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
