const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },                 // Startup Name
    email: { type: String },                                 // Optional Founder Email
    domain: { type: String, required: true },                // Domain of Startup
    capital: { type: Number, required: true },               // Capital Required
    tagline: { type: String },                               // Optional
    description: { type: String, required: true },           // Startup Description
    industry: { type: String, required: true },              // Primary Industry
    pitchVideoUrl: { type: String, required: true },         // Cloudinary video link
    supportingDocUrl: { type: String },                      // Optional Document
    fundingRound: { type: String, required: true },          // Seed / Series A / etc.
    amountRaised: { type: Number, required: true },          // Amount Already Raised
    preferredIndustries: [{ type: String }],                 // Optional list of industries
    investmentStage: { type: String, required: true },       // e.g., Seed
    instagramFollowers: { type: String, required: true },                   // Optional social proof
    equity: { type: Number, required: true },                // % Equity Offered
    royalty: { type: Number, required: true },               // % Royalty Offered
    conditions: { type: String },                            // Optional Conditions

    founderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);
