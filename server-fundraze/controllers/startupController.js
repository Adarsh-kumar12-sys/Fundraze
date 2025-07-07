const Startup = require("../models/Startup");
const Bid = require("../models/Bid");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/upload");


// ✅ Create a new startup (for founders)
exports.createStartup = async (req, res) => {
  try {

    const {
      title,
      email,
      description,
      domain,
      capital,
      tagline,
      fundingRound,
      amountRaised,
      investmentStage,
      equity,
      royalty,
      instagramFollower, // frontend field (string like "2M")
      conditions,
      preferredIndustries,
      industry,
    } = req.body;

    // ✅ Early validation for required fields
    if (
      !title || !description || !domain || !capital || !amountRaised ||
      !investmentStage || !equity || !royalty || !industry
    ) {
      return res.status(400).json({ msg: "Please fill all required fields." });
    }

    let pitchVideoUrl = "";
    let supportingDocUrl = "";

    // ✅ Upload pitch video
    if (req.files?.pitchVideo?.[0]) {
      const videoResult = await cloudinary.uploader.upload(
        req.files.pitchVideo[0].path,
        { resource_type: "video" }
      );
      pitchVideoUrl = videoResult.secure_url;
    } else {
      return res.status(400).json({ msg: "Pitch video is required." });
    }

    // ✅ Upload supporting document (optional)
    if (req.files?.supportingDoc?.[0]) {
      const docResult = await cloudinary.uploader.upload(
        req.files.supportingDoc[0].path,
        { resource_type: "raw" }
      );
      supportingDocUrl = docResult.secure_url;
    }

    const startupPayload = {
      title,
      email,
      description,
      domain,
      capital: Number(capital),
      tagline,
      fundingRound,
      amountRaised: Number(amountRaised),
      investmentStage,
      equity: Number(equity),
      royalty: Number(royalty),
      instagramFollowers: instagramFollower || "", // now a string in schema
      industry,
      conditions,
      preferredIndustries: preferredIndustries || [],
      pitchVideoUrl,
      supportingDocUrl,
      founderId: req.user.id,
    };


    
    let startup;
    try {
      startup = await Startup.create(startupPayload);
    } catch (validationError) {
  try {
    const fullError = JSON.stringify(validationError, Object.getOwnPropertyNames(validationError), 2);
  } catch (logErr) {
    console.dir(validationError); // fallback
  }

  return res.status(400).json({
    msg: "Validation Failed",
    error: validationError.message || "Unknown error",
  });
}


    res.status(201).json(startup);
  } catch (err) {
    res.status(500).json({ msg: "Server error while creating startup", error: err.message });
  }
};


// ✅ Fetch startups created by the logged-in founder
exports.getMyStartup = async (req, res) => {
  try {
   
const startup = await Startup.findOne({ founderId: req.user.id });
res.status(200).json(startup); // returns either an object or null

  } catch (err) {
    res.status(500).json({ msg: "Error fetching startups", error: err.message });
  }
};

exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findOneAndDelete({
      _id: req.params.id,
      founderId: req.user.id,
    });

    if (!startup) {
      return res.status(404).json({ msg: "Startup not found or unauthorized" });
    }

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting", error: err.message });
  }
};

// ✅ Get all startups — used by investors to view opportunities
exports.getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.status(200).json(startups);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching all startups", error: err.message });
  }
};

// ✅ Get all bids received for all startups created by the current founder
exports.getMyStartupBids = async (req, res) => {
  try {
    const myStartups = await Startup.find({ founderId: req.user.id });
    const startupIds = myStartups.map((s) => s._id);

    const bids = await Bid.find({ startup: { $in: startupIds } })
      .populate({ path: "investor", select: "name" })
      .populate({ path: "startup", model: "Startup", select: "title" });

    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching startup bids", error: err.message });
  }
};
