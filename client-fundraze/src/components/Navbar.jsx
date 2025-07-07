import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLiveFundingRefresh = () => {
    // Navigate to the same route to trigger re-render instead of full reload
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
      {/* Left Side: FUNDRAZE */}
      <h1 className="text-2xl font-bold text-gray-700">FUNDRAZE</h1>

      {/* Right Side: Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleLiveFundingRefresh}
          className="px-4 py-1 border border-gray-400 bg-gray-100 text-black rounded hover:bg-gray-200"
        >
          Live Funding
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-1 border border-gray-400 bg-gray-100 text-black rounded hover:bg-gray-200"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
