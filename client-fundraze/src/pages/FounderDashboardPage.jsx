import React, { useEffect, useState } from "react";
import axios from "axios";
import FounderDashboard from "../components/FounderDashboard";
import FounderAssistant from "../components/FounderAssistant";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");



const FounderDashboardPage = () => {
  const [bids, setBids] = useState([]);
  const [hasStartup, setHasStartup] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkStartup = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/startups/my-startup`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setHasStartup(true);
          fetchBids();
        } else {
          setHasStartup(false);
        }
      } catch (err) {
        console.error("❌ Error checking startup:", err);
      }
    };

    const fetchBids = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/startups/my-bids`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBids(res.data);
      } catch (err) {
        console.error("❌ Error fetching bids:", err);
      }
    };

    checkStartup();
  }, []);

  return (
    <>
      <FounderDashboard
        bids={bids}
        onCreated={() => {
          setHasStartup(true);
          axios
            .get(`${BASE_URL}/api/startups/my-bids`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBids(res.data))
            .catch((err) => console.error("❌ Error fetching bids:", err));

        }}
      />

      {/* ✅ Add Assistant Floating Chat */}
      <FounderAssistant />
    </>
  );
};

export default FounderDashboardPage;
