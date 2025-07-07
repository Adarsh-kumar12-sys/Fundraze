import React from "react";

const InvestorDashboardView = ({ bids }) => {
  if (!bids || bids.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <p className="text-gray-500">You have not made any bids yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="space-y-3">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border border-gray-200 p-4 rounded shadow-sm bg-white"
          >
            <p><strong>Startup:</strong> {bid.startup?.title || "N/A"}</p>
            <p><strong>Amount:</strong> ${bid.amount}</p>
            <p><strong>Equity:</strong> {bid.equity || "N/A"}%</p>
            <p><strong>Royalty:</strong> {bid.royalty || "N/A"}%</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="italic text-blue-600">{bid.status}</span>
            </p>
            {bid.conditions && (
              <p><strong>Conditions:</strong> {bid.conditions}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboardView;
