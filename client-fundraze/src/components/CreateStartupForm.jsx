import React, { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import TopBar from "../components/TopBar"; 
import { toast } from "react-toastify";
import { greenToast } from "../utils/toastStyles";  
import { redToast } from "../utils/toastStyles";

const CreateStartupForm = ({ onCreated }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    email: "",
    domain: "",
    capital: "",
    tagline: "",
    description: "",
    industry: "",
    fundingRound: "",
    amountRaised: "",
    preferredIndustries: [],
    industryInput: "",
    investmentStage: "",
    instagramFollower: "",
    equity: "",
    royalty: "",
    conditions: "",
  });

  const [pitchVideo, setPitchVideo] = useState(null);
  const [supportingDoc, setSupportingDoc] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndustryInputKeyDown = (e) => {
    if (e.key === "Enter" && form.industryInput.trim()) {
      e.preventDefault();
      if (!form.preferredIndustries.includes(form.industryInput.trim())) {
        setForm((prev) => ({
          ...prev,
          preferredIndustries: [...prev.preferredIndustries, prev.industryInput.trim()],
          industryInput: "",
        }));
      }
    }
  };

  const removeIndustry = (industry) => {
    setForm((prev) => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.filter((item) => item !== industry),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) return toast("Please agree to the terms before submitting.", redToast);
    if (!pitchVideo) return toast("Pitch video is required.", redToast);

    const formData = new FormData();
    for (const key in form) {
      if (key === "industryInput") continue;
      if (Array.isArray(form[key])) {
        form[key].forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, form[key]);
      }
    }

    formData.append("pitchVideo", pitchVideo);
    if (supportingDoc) formData.append("supportingDoc", supportingDoc);

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/startups/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast("✅ Startup created successfully!", greenToast);
      setStep(1);
      onCreated?.();
    } catch (err) {
      console.error(err);
      toast("❌ Failed to create startup.", redToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar /> {/* ✅ navbar shown only here */}
      <div className="absolute top-0 left-0 w-full flex justify-center px-4 z-20">
        <div className="bg-white p-8 rounded-lg w-full max-w-3xl font-inter shadow-md">
          <h2 className="text-2xl font-bold mb-6">Create Startup</h2>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {["Basic Startup Info", "Investment Details", "Review"].map((label, index) => {
              const isActive = step === index + 1;
              return (
                <div key={label} className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium 
                    ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-600"
                      }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="label">
                  Title <span className="text-red-500">*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange} className="input" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email (optional)</label>
                  <input name="email" value={form.email} onChange={handleChange} className="input" />
                </div>
                <div>
                  <label className="label">
                    Domain <span className="text-red-500">*</span>
                  </label>
                  <input name="domain" value={form.domain} onChange={handleChange} className="input" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="input" required />
                </div>
                <div>
                  <label className="label">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <label className="label mt-3">Tagline (optional)</label>
                  <input name="tagline" value={form.tagline} onChange={handleChange} className="input" />
                </div>
              </div>

              <div>
                <label className="label">
                  Pitch Video Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setPitchVideo(e.target.files[0])}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:px-4 file:py-2 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="label">Supporting Document (optional)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setSupportingDoc(e.target.files[0])}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:px-4 file:py-2 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button type="button" onClick={() => setStep(2)} className="btn-primary">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Funding Round <span className="text-red-500">*</span></label>
                  <input name="fundingRound" value={form.fundingRound} onChange={handleChange} className="input" required />
                </div>
                <div>
                  <label className="label">Amount Raised ($) <span className="text-red-500">*</span></label>
                  <input name="amountRaised" value={form.amountRaised} onChange={handleChange} className="input" required />
                </div>
              </div>

              <div>
                <label className="label">Capital Required ($) <span className="text-red-500">*</span></label>
                <input name="capital" value={form.capital} onChange={handleChange} className="input" required />
              </div>

              <div>
                <label className="label">Investment Stage <span className="text-red-500">*</span></label>
                <select name="investmentStage" value={form.investmentStage} onChange={handleChange} className="input" required>
                  <option value="">Select</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="IPO">IPO</option>
                </select>
              </div>

              <div>
                <label className="label">Preferred Industries</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Type & press Enter to add"
                  value={form.industryInput}
                  onChange={(e) => setForm({ ...form, industryInput: e.target.value })}
                  onKeyDown={handleIndustryInputKeyDown}
                />
                <div className="flex flex-wrap mt-2 gap-2">
                  {form.preferredIndustries.map((item) => (
                    <span key={item} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {item}
                      <button type="button" onClick={() => removeIndustry(item)} className="ml-2 text-red-500 hover:text-red-700">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Instagram Followers<span className="text-red-500">*</span></label>
                  <input name="instagramFollower" value={form.instagramFollower} onChange={handleChange} className="input" required />
                </div>
                <div>
                  <label className="label">Equity (%) <span className="text-red-500">*</span></label>
                  <input name="equity" value={form.equity} onChange={handleChange} className="input" required />
                </div>
                <div>
                  <label className="label">Royalty (%) <span className="text-red-500">*</span></label>
                  <input name="royalty" value={form.royalty} onChange={handleChange} className="input" required />
                </div>
                <div>
                  <label className="label">Conditions</label>
                  <textarea name="conditions" value={form.conditions} onChange={handleChange} className="input" />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button type="button" onClick={() => setStep(3)} className="btn-primary">Next</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 text-sm text-gray-700">
                {Object.entries(form).map(([key, value]) => {
                  if (key === "industryInput") return null;
                  return <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value || "N/A"}</p>;
                })}
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} className="mr-2" />
                  I agree to Fundraze's Terms and Conditions
                </label>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              {message && <p className="text-sm mt-4 text-center">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateStartupForm;
