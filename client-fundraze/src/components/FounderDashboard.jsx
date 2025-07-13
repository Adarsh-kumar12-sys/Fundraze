import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateStartupForm from "./CreateStartupForm";
import ReceivedBidsTable from "../components/ReceivedBidsTable";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { greenToast, redToast } from "../utils/toastStyles";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const FounderDashboard = ({ onCreated }) => {
  const [hasStartup, setHasStartup] = useState(null); // null = loading
  const [step, setStep] = useState(1); // 1 = show form, 2 = show bids
  const [bids, setBids] = useState([]);
  const location = useLocation();

  // Fetch startup on mount
  useEffect(() => {
    const fetchMyStartup = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/startups/my-startup`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const startup = res.data;
        setHasStartup(!!startup);
        if (startup) {
          setStep(2); // Go straight to bids
        }
      } catch (err) {
        console.error("❌ Error fetching startup:", err);
        toast("❌ Failed to load your startup. Please try again later.", redToast);
        setHasStartup(false);
      }
    };

    fetchMyStartup();
  }, []);

  // 🔁 Fetch bids every time ?refresh= changes in the URL
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/startups/my-bids`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        setBids(res.data);
      } catch (err) {
        console.error("❌ Error fetching bids:", err);
      }
    };

    if (step === 2) {
      fetchBids();
    }
  }, [location.search, step]);

  if (hasStartup === null) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <>
      {step === 1 && (
        <CreateStartupForm
          onCreated={() => {
            onCreated();
            toast("✅ Your startup has been created successfully!", greenToast);
            setStep(2);
          }}
        />
      )}

      {step === 2 && <ReceivedBidsTable bids={bids} />}
    </>
  );
};

export default FounderDashboard;
