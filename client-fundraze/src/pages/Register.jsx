import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../assets/register-illustration.png";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

import { toast } from "react-toastify";

import { greenToast, redToast } from "../utils/toastStyles";



const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "founder",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, form);

      toast("✅ Registered successfully!", greenToast);
      navigate("/login");
    } catch (err) {
      const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "Registration failed. Please try again.";

    toast.error(`❌ ${errorMessage}`, redToast);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-[Inter] px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration */}
        <div className="hidden md:block">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Form */}
        <div className="w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Registration</h2>
          <p className="text-gray-600 mb-8">
            Join the future of startup funding and fuel the next wave of innovation!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="founder">Founder</option>
              <option value="investor">Investor</option>
            </select>
            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-600 text-white font-semibold py-3 rounded-full transition"
            >
              REGISTER
            </button>
            <p className="text-sm text-gray-600 text-center mt-2">
              Have an account?{" "}
              <Link to="/login" className="text-pink-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
