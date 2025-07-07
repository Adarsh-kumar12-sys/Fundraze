const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startup: { type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true },
  amount: { type: Number, required: true },
  equity: { type: Number },
  royalty: { type: Number },
  conditions: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
}, { timestamps: true });

module.exports = mongoose.model("Bid", bidSchema);
