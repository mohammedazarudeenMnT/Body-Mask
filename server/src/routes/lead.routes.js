import express from "express";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controller/lead.controller.js";
import { requireAdmin, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route (for contact form)
router.post("/", optionalAuth, createLead);

// Admin routes
router.get("/", requireAdmin, getLeads);
router.put("/:id", requireAdmin, updateLead);
router.delete("/:id", requireAdmin, deleteLead);

export default router;
