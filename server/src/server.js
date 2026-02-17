import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

import { connectDB } from "./config/database.js";
import { initAuth } from "./lib/auth.js";
import authRoutes from "./routes/auth.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import seoRoutes from "./routes/seo.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import pageBannerRoutes from "./routes/page-banner.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500 ? "🔴" : res.statusCode >= 400 ? "🟡" : "🟢";
    const path = req.originalUrl || req.url;
    console.log(
      `${statusColor} ${res.statusCode} ${req.method} ${path} - ${duration}ms`,
    );
  });

  next();
});

app.use(cookieParser());

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    const auth = initAuth();
    console.log("✅ Better Auth initialized");

    // Better Auth API Handler
    app.use("/api/auth", toNodeHandler(auth));

    // Express middleware for JSON (MUST be after Better Auth handler)
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/settings", settingsRoutes);
    app.use("/api/seo", seoRoutes);
    app.use("/api/banners", bannerRoutes);
    app.use("/api/page-banners", pageBannerRoutes);
    app.use("/api/services", serviceRoutes);
    app.use("/api/offers", offerRoutes);
    app.use("/api/leads", leadRoutes);
    app.use("/api/testimonials", testimonialRoutes);

    app.get("/", (req, res) => {
      res.send("Body Mask Backend is running");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
