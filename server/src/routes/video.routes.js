import express from "express";
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controller/video.controller.js";
import { requireAdmin, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route (only Published videos for public)
router.get("/", optionalAuth, getVideos);

// Admin routes
router.post("/", requireAdmin, createVideo);
router.put("/:id", requireAdmin, updateVideo);
router.delete("/:id", requireAdmin, deleteVideo);

export default router;
