import express from "express";
import {
  getEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
} from "../controller/event-type.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getEventTypes);

// Admin routes
router.get("/:id", requireAdmin, getEventTypeById);
router.post("/", requireAdmin, createEventType);
router.put("/:id", requireAdmin, updateEventType);
router.delete("/:id", requireAdmin, deleteEventType);

export default router;
