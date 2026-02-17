import express from "express";
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controller/offer.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getOffers);
router.get("/:id", getOfferById);

// Admin routes
router.post("/", requireAdmin, createOffer);
router.put("/:id", requireAdmin, updateOffer);
router.delete("/:id", requireAdmin, deleteOffer);

export default router;
