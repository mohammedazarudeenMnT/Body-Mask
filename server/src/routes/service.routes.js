import express from "express";
import {
  getServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controller/service.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

// Admin routes
router.get("/admin/:id", requireAdmin, getServiceById);
router.post("/", requireAdmin, createService);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

export default router;
