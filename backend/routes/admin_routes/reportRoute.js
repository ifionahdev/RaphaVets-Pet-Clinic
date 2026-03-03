import express from 'express';
import { getReportsData } from "../../controllers/admin_controllers/reportsController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

// Protect this route with admin/vet authentication
router.get('/reports', verifyToken, allowRoles(2, 3), getReportsData);

export default router;