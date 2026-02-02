import express from "express";
import { chatWithGPT, getChatHistory } from "../controllers/chatController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// protect the chat endpoint
router.post("/chat", verifyToken, chatWithGPT);
router.get("/history", verifyToken, getChatHistory);

export default router;
