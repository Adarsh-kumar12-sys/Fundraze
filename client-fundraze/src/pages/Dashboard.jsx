import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../components/TopBar";
import FounderDashboard from "../components/FounderDashboard";
import InvestorDashboardView from "../components/InvestorDashboardView";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
import { toast } from "react-toastify";
import { redToast } from "../utils/toastStyles";



const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);

        if (res.data.type === "founder") {
          fetchStartupBids(token);
        }
      } catch (err) {
        console.error("❌ Failed to fetch user", err);
        toast("❌ Unauthorized. Please login again.", redToast);

      }
    };

    fetchUser();
  }, []);

  const fetchStartupBids = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/startups/my-bids`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBids(res.data);
    } catch (err) {
      console.error("❌ Error fetching startup bids", err);
      toast("❌ Failed to load your bids.", redToast);

    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">

      if (error) toast(error, redToast);


      {user?.type === "founder" && (
        <FounderDashboard bids={bids} onCreated={() => fetchStartupBids(localStorage.getItem("token"))} />
      )}

      {user?.type === "investor" && (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">My Investment Bids</h2>
          <InvestorDashboardView bids={bids} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
