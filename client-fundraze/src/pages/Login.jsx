import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import loginIllustration from "../assets/login-illustration.png";
import { toast } from "react-toastify";
import { greenToast, redToast } from "../utils/toastStyles"; // Assuming these are correctly defined

const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("type", user.type);

     
      toast("✅ Login successful", greenToast);

      if (user.type === "founder") {
        navigate("/founder-dashboard");
      } else if (user.type === "investor") {
        navigate("/investor-dashboard");
      }

    } catch (err) {
      const errorMsg =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Login failed. Please check credentials";
      toast(`❌ ${errorMsg}`, redToast);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-[Inter] px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration */}
        <div className="hidden md:block">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Form */}
        <div className="w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Login to Fundraze</h2>
          <p className="text-gray-600 mb-8">
            Connect with visionary founders and smart investors in one seamless platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-600 text-white font-semibold py-3 rounded-full transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/register" className="text-pink-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
