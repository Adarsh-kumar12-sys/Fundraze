import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBarInvestor from "../components/TopBarInvestor";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");


const InvestorBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/bids/my-bids`, {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBids(res.data);
    } catch (err) {
      console.error("❌ Error fetching investor bids:", err);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <>
      <TopBarInvestor />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Bids</h1>

        {bids.length === 0 ? (
          <p className="text-gray-500 italic text-lg">
            You haven’t placed any offers yet.
          </p>
        ) : (
          <div className="space-y-8">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Startup Name */}
                <h2 className="text-2xl font-bold text-blue-800 bg-gray-100 inline-block px-4 py-2 rounded-xl mb-2">
                  {bid.startup?.title || "Untitled Startup"}
                </h2>
                <p className="text-base text-gray-500 mb-4">
                  {bid.startup?.tagline || ""}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-[16px] text-gray-700 mb-4">
                  <p><strong>💰 Amount:</strong> ${bid.amount}</p>
                  <p><strong>📈 Equity:</strong> {bid.equity || "—"}%</p>
                  <p><strong>🔁 Royalty:</strong> {bid.royalty || "—"}%</p>
                  <div className="col-span-2 md:col-span-3">
                    <strong>📄 Conditions:</strong>{" "}
                    {bid.conditions ? (
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {bid.conditions.split("\n").map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        bid.status
                      )}`}
                    >
                      {bid.status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Last Updated:</strong>{" "}
                    {new Date(bid.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InvestorBids;
