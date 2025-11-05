// routes/userRoute.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "✅ /api/users root reached" });
});
// ✅ Get user profile
router.get("/:id", verifyToken, getUserProfile);

// ✅ Update user profile
router.put("/:id", verifyToken, updateUserProfile);

router.get("/test", (req, res) => {
  res.json({ message: "User routes working!" });
});

export default router;
