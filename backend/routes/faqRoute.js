import express from "express";
import {
  getAllFAQs,
  getFAQsByCategory,
  getFAQById,
  getFAQCategoryById,
  getAllFAQCategories
} from "../controllers/faqsController.js";

const router = express.Router();

// Get all FAQ categories
router.get("/categories/all", getAllFAQCategories);

// Get all FAQs
router.get("/", getAllFAQs);

// Get FAQs by category
router.get("/category/:categoryId", getFAQsByCategory);

// Get FAQ by ID
router.get("/:id", getFAQById);

// Get FAQ category by ID
router.get("/category-info/:id", getFAQCategoryById);

export default router;
