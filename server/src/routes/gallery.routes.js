import express from "express";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controller/gallery.controller.js";
import { requireAdmin, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getGalleryItems);

// Admin routes
router.post("/", requireAdmin, createGalleryItem);
router.put("/:id", requireAdmin, updateGalleryItem);
router.delete("/:id", requireAdmin, deleteGalleryItem);

export default router;
