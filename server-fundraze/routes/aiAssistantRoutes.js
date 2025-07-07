const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/assistant", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
        process.env.VITE_GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: question }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 No response available.";

    res.json({ answer: reply });
  } catch (err) {
    console.error("Gemini AI error:", err);
    res.status(500).json({ answer: "AI assistant failed. Try again later." });
  }
});

module.exports = router;
