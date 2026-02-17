import { fromNodeHeaders } from "better-auth/node";
import { initAuth } from "../lib/auth.js";

/**
 * Middleware to check if the user is authenticated and has the admin role.
 */
export const requireAdmin = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user || session.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access required",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization",
    });
  }
};

/**
 * Middleware to optionally check if the user is authenticated.
 * Attaches user to req if authenticated, otherwise continues.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session && session.user) {
      req.user = session.user;
    }
    next();
  } catch (error) {
    // If it fails, just continue as unauthenticated
    next();
  }
};
