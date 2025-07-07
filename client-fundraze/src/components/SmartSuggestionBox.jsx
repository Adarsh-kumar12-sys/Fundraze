import React, { useState } from "react";
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;


const SmartSuggestionBox = ({ onClose }) => {
  const [industries, setIndustries] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    if (!industries.trim()) return;

    setLoading(true);
    setError("");
    setSuggestions("");

    try {
      const res = await axios.get(`${BASE_URL}/api/startups/all`, {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const startups = res.data || [];

      const formatted = startups
        .slice(0, 6)
        .map((s, i) => {
          return `${i + 1}. ${s.title} — Industry: ${s.domain}, Followers: ${s.instagramFollower || "N/A"}, Capital: ₹${s.capital}, Raised: ₹${s.amountRaised}, Equity: ${s.equity}%, Royalty: ${s.royalty}%`;
        })
        .join("\n");

      const prompt = `The investor is interested in: [${industries}].

Suggest 2 startups from the list below. Format each exactly like this:

1. **Startup Name**
   1.1 Suggested Investment Amount: $...
   1.2 Equity %: ...
   1.3 Royalty %: ...
   1.4 Reason: ...

Here are the available startups:\n\n${formatted}\n\nKeep answers short and follow the exact format.`;

      const geminiRes = await axios.post(
        GEMINI_API_URL,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": GEMINI_API_KEY,
          },
        }
      );

      const reply =
        geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No suggestions available.";

      console.log("📦 Raw Gemini reply:\n", reply);
      setSuggestions(reply);
    } catch (err) {
      console.error("❌ Error fetching suggestions:", err);
      setError("Failed to get suggestions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white border border-yellow-300 p-4 rounded shadow font-inter text-sm space-y-3">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        aria-label="Close"
      >
        ✖
      </button>

      <h2 className="text-lg font-semibold text-yellow-800 pr-6">
        🔍 Smart AI Investment Suggestions
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSuggestions();
        }}
        className="space-y-3"
      >
        <input
          type="text"
          value={industries}
          onChange={(e) => setIndustries(e.target.value)}
          placeholder="Enter preferred industries (e.g. fintech, ai)"
          className="w-full border px-3 py-2 rounded outline-none text-sm"
        />

        <button
          type="submit"
          disabled={loading || !industries.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
        >
          {loading ? "Thinking..." : "Get Suggestions"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {suggestions && (
        <div className="space-y-3 text-gray-800 text-sm">
          {suggestions.split("\n").map((line, idx) => {
            const trimmed = line.trim();

            if (/^\d+\.\s\*\*(.+?)\*\*/.test(trimmed)) {
              // Startup Name line like: 1. **Microsoft**
              const title = trimmed.match(/^\d+\.\s\*\*(.+?)\*\*/)[1];
              return (
                <div key={idx} className="pt-2">
                  <div className="text-base font-bold text-blue-700">{title}</div>
                </div>
              );
            } else if (/^\d+\.\d+\s/.test(trimmed)) {
              // Detail lines like: 1.1 Suggested Investment...
              const content = trimmed.replace(/^\d+\.\d+\s*/, "• ");
              return (
                <div key={idx} className="ml-4 text-gray-700">
                  {content}
                </div>
              );
            } else {
              // Fallback for any other lines
              return (
                <div key={idx} className="ml-2 text-gray-600">
                  {trimmed}
                </div>
              );
            }
          })}
        </div>
      )}

    </div>
  );
};

export default SmartSuggestionBox;
