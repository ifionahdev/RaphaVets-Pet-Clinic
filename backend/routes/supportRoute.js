import express from 'express';
import { sendSupportMessage } from '../controllers/supportController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/support - allow both authenticated and guest submissions
router.post('/', verifyToken, sendSupportMessage);

// For guests who don't pass token in header we also support unauthenticated posts
router.post('/guest', sendSupportMessage);

export default router;
