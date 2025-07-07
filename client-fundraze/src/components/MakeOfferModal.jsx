// src/components/MakeOfferModal.jsx
import React, { useState } from "react";

const MakeOfferModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [conditions, setConditions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (royalty.trim() === "") {
      setError("Royalty percentage is required");
      return;
    }

    setError("");
    onSubmit({
      amount,
      equity,
      royalty,
      conditions,
    });

    // Reset and close
    setAmount("");
    setEquity("");
    setRoyalty("");
    setConditions("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-60 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>
        <p className="text-sm text-gray-600 mb-4">
          Submit your investment offer for this startup. Please review all terms carefully before submitting.
        </p>

        {/* Amount */}
        <label className="block text-sm font-medium text-gray-700">
          Investment Amount ($)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 mb-4 border rounded px-3 py-2 focus:outline-none"
          placeholder="Enter the amount you wish to invest"
        />

        {/* Equity */}
        <label className="block text-sm font-medium text-gray-700">
          Equity Percentage (%)
        </label>
        <input
          type="number"
          value={equity}
          onChange={(e) => setEquity(e.target.value)}
          className="w-full mt-1 mb-4 border rounded px-3 py-2 focus:outline-none"
          placeholder="Requested equity share"
        />

        {/* Royalty */}
        <label className="block text-sm font-medium text-gray-700">
          Royalty Percentage (%)
        </label>
        <input
          type="number"
          value={royalty}
          onChange={(e) => setRoyalty(e.target.value)}
          className={`w-full mt-1 border rounded px-3 py-2 ${
            error ? "border-red-500" : ""
          }`}
          placeholder="Requested royalty percentage"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        {/* Conditions */}
        <label className="block mt-4 text-sm font-medium text-gray-700">
          Investment Conditions
        </label>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          className="w-full mt-1 border rounded px-3 py-2 h-24 focus:outline-none"
          placeholder="List your conditions, one per line"
        />

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700"
          >
            Submit Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOfferModal;
