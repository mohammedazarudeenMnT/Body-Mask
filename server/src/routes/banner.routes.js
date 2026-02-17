import express from "express";
import {
  getBanners,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controller/banner.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET routes
router.get("/", getBanners); // Public: returns only active banners
router.get("/admin", requireAdmin, getAllBanners); // Admin: returns all banners

// Admin only routes
router.post("/", requireAdmin, createBanner);
router.put("/:id", requireAdmin, updateBanner);
router.delete("/:id", requireAdmin, deleteBanner);

export default router;
