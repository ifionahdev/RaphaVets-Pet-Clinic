import express from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { createMulter } from "../../middleware/multer.js";

const router = express.Router();

const upload = createMulter(
  "ml-temp",
  ["image/jpeg", "image/png", "image/jpg"],
  10
);

router.post("/predict", upload.single("file"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const mlUrl = process.env.ML_URL || "http://localhost:8000";
    const response = await axios.post(
      `${mlUrl}/predict`,
      formData,
      { headers: formData.getHeaders() }
    );
    fs.unlinkSync(req.file.path);
    res.json(response.data);

  } catch (error) {
    // Clean up uploaded file in case of error
    if (req.file?.path) fs.unlinkSync(req.file.path);
    
    console.error("ML error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

export default router;
