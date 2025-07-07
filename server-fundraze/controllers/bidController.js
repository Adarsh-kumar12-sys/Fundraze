const Bid = require("../models/Bid");
const Startup = require("../models/Startup");

exports.createBid = async (req, res) => {
  try {
    const { startupId, amount, equity, royalty, conditions } = req.body;

    const bid = await Bid.create({
      investor: req.user.id,
      startup: startupId,
      amount,
      equity,
      royalty,
      conditions,
    });

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create bid", error: err.message });
  }
};

exports.getInvestorBids = async (req, res) => {
  try {
    const bids = await Bid.find({ investor: req.user.id }).populate({
      path: "startup",
      model: "Startup",
      select: "title tagline",
    });


    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch bids", error: err.message });
  }
};


exports.getBidsForStartup = async (req, res) => {
  try {
    const startups = await Startup.find({ founderId: req.user.id });
    const startupIds = startups.map((s) => s._id);

    const bids = await Bid.find({ startup: { $in: startupIds } }).populate("investor", "name email");
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch bids", error: err.message });
  }
};

exports.acceptBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate("startup");

    if (!bid || bid.startup.founderId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized to accept this bid" });
    }

    bid.status = "Accepted";
    await bid.save();
    res.status(200).json({ msg: "Bid accepted" });
  } catch (err) {
    res.status(500).json({ msg: "Error accepting bid", error: err.message });
  }
};

exports.rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate("startup");

    if (!bid || bid.startup.founderId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized to reject this bid" });
    }

    bid.status = "Rejected";
    await bid.save();
    res.status(200).json({ msg: "Bid rejected" });
  } catch (err) {
    res.status(500).json({ msg: "Error rejecting bid", error: err.message });
  }
};
