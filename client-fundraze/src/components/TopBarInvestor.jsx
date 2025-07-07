import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SmartSuggestionBox from "./SmartSuggestionBox";
import { toast } from "react-toastify";
import { redToast } from "../utils/toastStyles";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");



const TopBarInvestor = () => {
  const navigate = useNavigate();
  const [investorName, setInvestorName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/protected/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setInvestorName(res.data.name);
      } catch (err) {
        console.error("❌ Failed to fetch investor info:", err);
        toast("Failed to load investor information.", redToast);
      }
    };

    fetchInvestor();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white relative">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-700">FUNDRAZE</h1>

        {/* Welcome Text + Navigation */}
        <div className="flex items-center gap-6">
          {/* Welcome Text */}
          <span className="text-white text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-full shadow-lg">
            👋 Welcome, {investorName || "Investor"}
          </span>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => (window.location.href = "/investor-dashboard")}
              className="px-4 py-1 border border-gray-300 bg-gray-100 text-black rounded hover:bg-gray-200 text-sm font-medium"
            >
              Dashboard
            </button>

            <button
              onClick={() => (window.location.href = "/investor/my-bids")}
              className="px-4 py-1 border border-gray-300 bg-gray-100 text-black rounded hover:bg-gray-200 text-sm font-medium"
            >
              My Bids
            </button>

            {/* ✅ NEW Suggest Button */}
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="px-4 py-1 border border-yellow-300 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-sm font-medium"
            >
              💡 Suggest Startups
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Suggestion Panel */}
      {showSuggestions && (
        <div className="px-6 py-4">
          <SmartSuggestionBox onClose={() => setShowSuggestions(false)} />
        </div>
      )}

    </>
  );
};

export default TopBarInvestor;
