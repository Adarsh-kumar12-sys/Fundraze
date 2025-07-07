import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBarInvestor from "../components/TopBarInvestor";
import MakeOfferModal from "../components/MakeOfferModal";
import { toast } from "react-toastify";
import { greenToast, redToast } from "../utils/toastStyles";
const BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");


const InvestorDashboard = () => {
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/startups/all`, {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStartups(res.data);
    } catch (err) {
      console.error("InvestorDashboard ❌ Error fetching startups:", err);
      toast("❌ Failed to load startups. Please try again later.", redToast);

    }
  };


  const submitBid = async (formData) => {
    try {
      await axios.post(`${BASE_URL}/api/bids`, {

        startupId: selectedStartup._id,
        amount: formData.amount,
        equity: formData.equity,
        royalty: formData.royalty,
        conditions: formData.conditions,
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast("Offer submitted successfully!", greenToast);
      setSelectedStartup(null);
    } catch (err) {
      console.error("Error submitting bid:", err);
      toast("Something went wrong while submitting the offer.", redToast);
    }
  };

  return (
    <>
      <TopBarInvestor />

      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-semibold mb-4">Available Startups</h2>

          <div className="space-y-6 mb-10">
            {startups.map((startup) => (
              <div
                key={startup._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow flex flex-col md:flex-row gap-6"
              >
                {/* Left: Startup Info */}
                <div className="flex-1 text-[15px] text-gray-800 space-y-4">
                  <h3 className="text-2xl font-bold text-blue-800 bg-gray-100 inline-block px-4 py-2 rounded-xl">
                    {startup.title}
                  </h3>
                  <p className="text-gray-600 text-base">{startup.tagline}</p>

                  <div className="text-base text-gray-700 flex items-center gap-2">
                    <span className="font-medium">Industry:</span>
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                      {startup.industry || "—"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[15px] text-gray-700">
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-800">Funding Round:</span>
                        <span>{startup.fundingRound || "—"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-800">Stage:</span>
                        <span>{startup.investmentStage || "—"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-800">Amount Raised:</span>
                        <span>${startup.amountRaised?.toLocaleString() || "—"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-800">Capital Required:</span>
                        <span>${startup.capital?.toLocaleString() || "—"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-base mt-3">Investment Terms</p>
                    <ul className="list-disc ml-5 text-base text-gray-700 mt-1">
                      <li>Equity: {startup.equity || 0}%</li>
                      <li>Royalty: {startup.royalty || 0}%</li>
                      <li>{startup.conditions || "No extra terms"}</li>
                    </ul>
                  </div>
                </div>

                {/* Right: Video + Buttons */}
                <div className="w-full md:w-[360px] flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">🎥 Pitch Video</p>
                    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden p-2 aspect-video">
                      <div className="relative w-full h-0 pb-[56.25%]">
                        <iframe
                          src={startup.pitchVideoUrl}
                          title="Pitch Video"
                          className="absolute top-0 left-0 w-full h-full rounded"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                     onClick={() => toast(`📧 Founder Email: ${startup.email}`, greenToast)}
                      className="px-4 py-2 bg-gray-200 text-black font-medium text-sm rounded hover:bg-gray-300"
                    >
                      Contact Founder
                    </button>
                    <button
                      onClick={() => setSelectedStartup(startup)}
                      className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700"
                    >
                      Make an Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reusable Modal */}
      <MakeOfferModal
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
        onSubmit={submitBid}
      />
    </>
  );
};

export default InvestorDashboard;
