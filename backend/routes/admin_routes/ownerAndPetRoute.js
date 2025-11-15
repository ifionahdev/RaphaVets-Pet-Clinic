import express from "express";
import { 
    getOwnersWithPets,
    getBreed,
    getSpecies,
    createPet,
    } from "../../controllers/admin_controllers/ownerAndPetsController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/owners-with-pets",
  verifyToken,          
  allowRoles(2, 3),     
  getOwnersWithPets
);

router.get(
  "/breeds",
  verifyToken,           
  allowRoles(2, 3),      
  getBreed
);

router.get(
  "/species",
  verifyToken,
  allowRoles(2, 3),
  getSpecies
);

router.post("/add-pets", verifyToken, createPet);



export default router;
