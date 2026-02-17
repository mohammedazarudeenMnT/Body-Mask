import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controller/testimonial.controller.js";
import { requireAdmin, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getTestimonials);
router.post("/", optionalAuth, createTestimonial);

// Admin routes
router.put("/:id", requireAdmin, updateTestimonial);
router.delete("/:id", requireAdmin, deleteTestimonial);

export default router;
