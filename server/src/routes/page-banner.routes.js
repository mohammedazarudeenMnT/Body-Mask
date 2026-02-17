import express from "express";
import {
  getPageBanner,
  getAllPageBanners,
  upsertPageBanner,
  deletePageBanner,
} from "../controller/pageBanner.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/:pageKey", getPageBanner);

// Admin routes
router.get("/", requireAdmin, getAllPageBanners);
router.post("/", requireAdmin, upsertPageBanner);
router.delete("/:id", requireAdmin, deletePageBanner);

export default router;
