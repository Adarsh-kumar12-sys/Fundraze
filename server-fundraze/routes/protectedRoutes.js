const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User"); // ✅ Make sure to import this

// Existing dashboard route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    msg: `Welcome to your dashboard, ${req.user.id}`,
    type: req.user.type,
  });
});

// ✅ Add this new route
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email type");
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
