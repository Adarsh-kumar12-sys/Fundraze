const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Profile route
router.get("/profile", protect, getProfile);

module.exports = router;
