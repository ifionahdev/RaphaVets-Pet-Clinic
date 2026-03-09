import express from "express";
import axios from "axios";

const router = express.Router();

// ML base URL (single env var). Append species routes where used.
const ML_BASE = (process.env.ML_URL || "http://localhost:5001").replace(
  /\/+$/g,
  "",
);
const ML_BACKENDS = {
  dog: `${ML_BASE}/predict_disease/dog`,
  cat: `${ML_BASE}/predict_disease/cat`,
};

/**
 * POST /predict
 * Body: { species: "dog"|"cat", symptoms: [{ feature_name, symptom_name }, ...] }
 */
router.post("/", async (req, res) => {
  try {
    const { species, symptoms } = req.body;

    const formattedSpecies = species.toLowerCase(); // Normalize species input

    // Basic validation
    if (!formattedSpecies || !["dog", "cat"].includes(formattedSpecies)) {
      return res.status(400).json({ error: "Invalid or missing species." });
    }
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "No symptoms provided." });
    }

    // Decide ML endpoint
    const mlUrl = ML_BACKENDS[formattedSpecies];

    // Forward data to FastAPI
    const response = await axios.post(
      mlUrl,
      { symptoms }, // send body as JSON
      { timeout: 60000 }, // 60s timeout
    );

    // Return ML results
    return res.status(200).json(response.data);
  } catch (err) {
    console.error("Prediction error:", err.message);

    // Timeout or connection error
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ error: "ML service timed out." });
    }

    return res
      .status(500)
      .json({ error: "Failed to get prediction from ML service." });
  }
});

export default router;
