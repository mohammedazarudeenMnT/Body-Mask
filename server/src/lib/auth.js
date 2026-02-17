import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import mongoose from "mongoose";
import { sendEmail } from "../config/sendmail.js";

let authInstance = null;

export const initAuth = () => {
  if (authInstance) return authInstance;

  authInstance = betterAuth({
    database: mongodbAdapter(mongoose.connection.getClient().db("body_mask")),

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
      defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      },
    },

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      sendResetPassword: async ({ user, url, token }) => {
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

        const emailHtml = `
          <h1>Reset Your Password</h1>
          <p>Hello ${user.name || "User"},</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
        `;

        await sendEmail(
          user.email,
          "Reset Your Password - Body Mask",
          emailHtml,
        );
      },
    },

    plugins: [
      admin({
        adminUserIds: [],
      }),
    ],

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000/api/auth",

    trustedOrigins: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000",
      "http://localhost:5000",
    ],

    redirects: {
      resetPassword: process.env.FRONTEND_URL || "http://localhost:3000",
    },
  });

  return authInstance;
};

export const getAuth = () => {
  if (!authInstance) {
    throw new Error("Auth not initialized. Call initAuth() first.");
  }
  return authInstance;
};
