const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();

// ✅ CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS","HEAD", "TRACE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); 



app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/ai", require("./routes/aiAssistantRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes"));
app.use("/api/startups", require("./routes/startupRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Fundraze API is running");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
