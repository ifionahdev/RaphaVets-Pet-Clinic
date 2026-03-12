import express from "express";
import {
    getSymptomsBySpecies
} from "../../controllers/vet_controllers/diagnosticController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);
router.use(allowRoles(3)); // Only allow vets
// Get symptoms for a specific species
    router.get("/symptoms/:species", getSymptomsBySpecies);

export default router;