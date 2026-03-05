import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createMulter } from "../middleware/multer.js";
import {
  getUserPets,
  getPetDetails,
  uploadPetImage
} from "../controllers/petController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PET_UPLOADS_DIR = path.resolve(__dirname, "..", "..", "uploads", "pets");

// Multer setup — allow 1 pet image only, up to 10MB
const upload = createMulter("pets", ["image/jpeg", "image/png", "image/jpg"], 10);

// Routes
router.get("/", verifyToken, getUserPets);
router.get("/:id", verifyToken, getPetDetails);
router.post("/:id/upload", verifyToken, upload.single("petImage"), uploadPetImage);

// Serve pet images
router.get("/images/:filename", (req, res) => {
  const filename = decodeURIComponent(req.params.filename);
  const imagePath = path.join(PET_UPLOADS_DIR, filename);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("❌ Error sending file:", err);
      res.status(404).send("❌ Image not found");
    }
  });
});

export default router;
