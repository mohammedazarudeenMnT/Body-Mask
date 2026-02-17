import crypto from "crypto";
import { fromNodeHeaders } from "better-auth/node";
import { initAuth } from "../lib/auth.js";

/**
 * Middleware to verify HMAC signatures for public API requests OR
 * verify admin session for dashboard requests.
 */
export const requireAdminOrSignedRequest = async (req, res, next) => {
  try {
    // 1. Check for Admin Session (Dashboard/Internal access)
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session && session.user.role === "admin") {
      req.user = session.user;
      return next();
    }

    // 2. Allow GET requests from official Frontend without signature
    const origin = req.headers.origin;
    const referer = req.headers.referer;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    const isFromFrontend =
      (origin &&
        (origin === frontendUrl ||
          origin.startsWith(frontendUrl.replace(/\/$/, "")))) ||
      (referer && referer.startsWith(frontendUrl));

    if (req.method === "GET" && isFromFrontend) {
      return next();
    }

    // 3. Check for HMAC Signature (Public server-side or non-browser access)
    const signature = req.headers["x-signature"];
    const timestamp = req.headers["x-timestamp"];
    const secret = process.env.API_SHARED_SECRET;

    if (!signature || !timestamp || !secret) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Protected API",
      });
    }

    // Re-calculate the expected signature
    const rawPath = (req.baseUrl + req.path).toLowerCase();
    const path =
      rawPath.endsWith("/") && rawPath.length > 1
        ? rawPath.slice(0, -1)
        : rawPath;
    const method = req.method.toUpperCase();
    const payload = `${method}:${path}:${timestamp}`;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature === expectedSignature) {
      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid API signature",
    });
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal authorization error",
    });
  }
};
