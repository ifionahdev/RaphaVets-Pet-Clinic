import express from "express";
import { getOwnersWithPets } from "../../controllers/admin_controllers/ownerAndPetsController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/owners-with-pets",
  verifyToken,          // must be logged in
  allowRoles(2, 3),     // 2 = Admin, 3 = Veterinarian
  getOwnersWithPets
);

export default router;
