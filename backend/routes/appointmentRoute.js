import express from "express";
import { 
    getAllServices,
    getAllTime,
    bookAppointment,
 } from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/services", getAllServices);
router.get("/time", getAllTime);

// Protected routes
router.post("/book", verifyToken, bookAppointment);
export default router;