import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateStartupForm from "./CreateStartupForm";
import ReceivedBidsTable from "../components/ReceivedBidsTable";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { toast } from "react-toastify";
import { greenToast, redToast } from "../utils/toastStyles";


const FounderDashboard = ({ bids, onCreated }) => {
  const [hasStartup, setHasStartup] = useState(null); // null = loading
  const [step, setStep] = useState(1); // 1 = show form, 2 = show bids

  useEffect(() => {
    const fetchMyStartup = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/startups/my-startup`, {

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const startup = res.data; // single object or null
        setHasStartup(!!startup);
        if (startup) {
          setStep(2); // Show bids directly if startup already exists
        }
      } catch (err) {
        console.error("❌ Error fetching startup:", err);
        toast("❌ Failed to load your startup. Please try again later.", redToast);
        setHasStartup(false);
      }

    };

    fetchMyStartup();
  }, []);

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
