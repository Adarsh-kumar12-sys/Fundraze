import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { redToast } from "../utils/toastStyles";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const ReceivedBidsTable = ({ bids }) => {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredBids = bids.filter((bid) => {
    if (activeTab === "all") return true;
    return bid.status?.toLowerCase() === activeTab;
  });

  const getStatusStyle = (status) => {
    const common = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "Accepted") return `${common} bg-green-100 text-green-700`;
    if (status === "Rejected") return `${common} bg-red-100 text-red-700`;
    return `${common} bg-blue-100 text-blue-700`;
  };

  const handleAccept = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(`${BASE_URL}/api/bids/${id}/accept`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    window.location.reload(); // you can replace this with toast later
  } catch (err) {
  if (err.response) {
    console.log("❌ Server error:", err.response.status, err.response.data);
    toast(`❌ ${err.response.data.message || "Failed to accept bid."}`, redToast);
  }
}

};


  const handleReject = async (id) => {
  try {
    await axios.patch(`${BASE_URL}/api/bids/${id}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true, 
    });

    window.location.reload();
  } catch (err) {
    console.error("❌ Error rejecting bid:", err);
    toast("❌ Failed to reject bid.", redToast);
  }
};

  const startupName = bids[0]?.startup?.title;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
        {startupName && (
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Startup: {startupName}
          </h2>
        )}

        {/* Tabs */}
        <div className="mb-4 flex gap-3 text-sm">
          {["pending", "accepted", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-1 rounded-full ${activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {tab} Offers
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-4 py-2">Investor</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Equity (%)</th>
                <th className="px-4 py-2">Royalty (%)</th>
                <th className="px-4 py-2">Conditions</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBids.map((bid) => (
                <tr key={bid._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{bid.investor?.name}</td>
                  <td className="px-4 py-2">${bid.amount}</td>
                  <td className="px-4 py-2">{bid.equity}%</td>
                  <td className="px-4 py-2">{bid.royalty}%</td>
                  <td className="px-4 py-2">{bid.conditions || "—"}</td>
                  <td className="px-4 py-2">
                    <span className={getStatusStyle(bid.status)}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {bid.createdAt
                      ? formatDistanceToNow(new Date(bid.createdAt), {
                        addSuffix: true,
                      })
                      : "—"}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {bid.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleAccept(bid._id)}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(bid._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="italic text-gray-400">
                        Action taken
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReceivedBidsTable;
