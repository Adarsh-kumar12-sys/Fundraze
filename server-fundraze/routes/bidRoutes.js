const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createBid,
  getInvestorBids,
  getBidsForStartup,
  acceptBid,
  rejectBid,
} = require("../controllers/bidController");

router.post("/", protect, createBid);
router.get("/my-bids", protect, getInvestorBids);
router.get("/startup-bids", protect, getBidsForStartup);
router.patch("/:id/accept", protect, acceptBid);
router.patch("/:id/reject", protect, rejectBid);

module.exports = router;
