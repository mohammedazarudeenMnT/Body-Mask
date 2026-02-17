import express from "express";
import {
  getSEOSettings,
  updateSEOSettings,
} from "../controller/seo.controller.js";
import { requireAdminOrSignedRequest } from "../middleware/signature.middleware.js";

const router = express.Router();

// SEO settings should be public for GET if needed on frontend, but update requires admin or signed request
router.get("/", getSEOSettings);
router.post("/:pageName", requireAdminOrSignedRequest, updateSEOSettings);

export default router;
