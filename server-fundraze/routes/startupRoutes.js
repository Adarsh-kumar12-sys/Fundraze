const express = require("express");
const router = express.Router();

const {
  createStartup,
  getMyStartup,
  deleteStartup,
  getAllStartups,
  getMyStartupBids,
} = require("../controllers/startupController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ✅ Create startup with video & optional doc
router.post(
  "/create",
  protect,
  upload.fields([
    { name: "pitchVideo", maxCount: 1 },
    { name: "supportingDoc", maxCount: 1 },
  ]),
  createStartup
);

// ✅ Get all startups for investor
router.get("/all", protect, getAllStartups);

// ✅ Get founder's own startups
router.get("/my-startup", protect, getMyStartup);


// ✅ Delete startup
router.delete("/:id", protect, deleteStartup);

// ✅ Get bids received for founder's startups
router.get("/my-bids", protect, (req, res, next) => {
  
  next();
}, getMyStartupBids);

module.exports = router;
