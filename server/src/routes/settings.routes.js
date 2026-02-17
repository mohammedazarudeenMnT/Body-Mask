import express from "express";
import {
  getEmailConfig,
  updateEmailConfig,
  testEmailConfig,
} from "../controller/email.controller.js";
import {
  getGeneralSettings,
  updateGeneralSettings,
} from "../controller/settings.controller.js";
import { requireAdminOrSignedRequest } from "../middleware/signature.middleware.js";

const router = express.Router();

// All settings routes require admin access or signed request
router.use(requireAdminOrSignedRequest);

router.get("/general", getGeneralSettings);
router.post("/general", updateGeneralSettings);
router.get("/email", getEmailConfig);
router.post("/email", updateEmailConfig);
router.post("/email/test", testEmailConfig);

export default router;
