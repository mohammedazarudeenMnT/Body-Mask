import nodemailer from "nodemailer";
import EmailConfiguration from "../model/EmailConfiguration.js";
import { decryptPassword } from "../utils/encryption.js";

export async function getEmailConfig(configOverride = null) {
  try {
    // If an override is provided (e.g., during testing unsaved settings), use it
    if (configOverride) {
      return {
        host: configOverride.smtpHost,
        port: configOverride.smtpPort || 587,
        auth: {
          user: configOverride.smtpUsername,
          pass:
            configOverride.smtpPassword === "********"
              ? decryptPassword(
                  (await EmailConfiguration.findOne({ configId: "global" }))
                    ?.smtpPassword,
                )
              : configOverride.smtpPassword,
        },
        from: configOverride.senderEmail,
        secure: configOverride.secure,
      };
    }

    const emailConfigResult = await EmailConfiguration.findOne({
      configId: "global",
    });
    if (!emailConfigResult) {
      // Fallback to env variables
      return {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        from: process.env.SMTP_FROM,
        secure: process.env.SMTP_SECURE === "true",
      };
    }

    return {
      host: emailConfigResult.smtpHost,
      port: emailConfigResult.smtpPort,
      auth: {
        user: emailConfigResult.smtpUsername,
        pass: decryptPassword(emailConfigResult.smtpPassword),
      },
      from: emailConfigResult.senderEmail,
      secure: emailConfigResult.secure,
    };
  } catch (error) {
    console.error("Error getting email configuration:", error);
    return null;
  }
}

export async function sendEmail(
  userEmail,
  subject,
  message,
  configOverride = null,
) {
  try {
    const emailConfig = await getEmailConfig(configOverride);
    if (!emailConfig) {
      throw new Error("Email configuration could not be loaded.");
    }

    // Dynamic Validation based on presence of values
    const missingFields = [];
    if (!emailConfig.host) missingFields.push("SMTP Host");
    if (!emailConfig.auth.user) missingFields.push("SMTP User");
    if (!emailConfig.auth.pass) missingFields.push("SMTP Password");
    if (!emailConfig.from) missingFields.push("From Email");

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required email configuration: ${missingFields.join(", ")}`,
      );
    }

    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });

    await transporter.sendMail({
      from: emailConfig.from,
      to: userEmail,
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}
