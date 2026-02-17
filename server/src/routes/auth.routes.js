import express from "express";
import { resetPassword } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/reset-password", resetPassword);

export default router;
