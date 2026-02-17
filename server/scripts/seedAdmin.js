import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/model/User.js";
import { connectDB } from "../src/config/database.js";

import { initAuth } from "../src/lib/auth.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const email = process.argv[2] || process.env.ADMIN_EMAIL;
    if (!email) {
      console.error(
        "Please provide an email address: node seedAdmin.js <email> or set ADMIN_EMAIL in .env",
      );
      process.exit(1);
    }
    const normalizedEmail = email.toLowerCase().trim();
    await connectDB();
    console.log(
      `Connected to MongoDB. Current Database: ${mongoose.connection.db.databaseName}`,
    );

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log(
        `User ${normalizedEmail} not found in collection "${User.collection.name}". Attempting to create...`,
      );
      const auth = initAuth();
      try {
        await auth.api.signUpEmail({
          body: {
            name: process.env.ADMIN_NAME || "Studio Admin",
            email: normalizedEmail,
            password: process.env.ADMIN_PASSWORD || "admin_password_123",
            isActive: true,
          },
        });
        console.log("User created via Better Auth.");
      } catch (authError) {
        if (authError.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          console.log(
            "User already exists in Better Auth. Proceeding to update role.",
          );
        } else {
          throw authError;
        }
      }
      user = await User.findOne({ email: normalizedEmail });
    }

    if (!user) {
      // Fallback: try finding by email case-insensitively if direct match failed
      user = await User.findOne({
        email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
      });
    }

    if (!user) {
      throw new Error(
        `Failed to retrieve user ${normalizedEmail} after creation/check.`,
      );
    }

    user.role = "admin";
    await user.save();

    console.log(`\n✅ Successfully promoted ${normalizedEmail} to admin role.`);
    console.log(`📧 Email: ${normalizedEmail}`);
    if (process.env.ADMIN_PASSWORD) {
      console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`);
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
