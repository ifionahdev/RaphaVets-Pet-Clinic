import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createMulter } from "../middleware/multer.js";
import {
  getUserPets,
  getPetDetails,
  uploadPetImage,
  servePetImage,
} from "../controllers/petController.js";

const router = express.Router();

// Multer setup — allow 1 pet image only, up to 10MB
const upload = createMulter("pets", ["image/jpeg", "image/png", "image/jpg"], 10);

// Routes
router.get("/", verifyToken, getUserPets);
router.get("/:id", verifyToken, getPetDetails);
router.post("/:id/upload", verifyToken, upload.single("petImage"), uploadPetImage);

// Serve pet images
router.get("/images/:filename", verifyToken, servePetImage);

export default router;
