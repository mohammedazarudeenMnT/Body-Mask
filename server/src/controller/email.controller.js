import EmailConfiguration from "../model/EmailConfiguration.js";
import { encryptPassword, decryptPassword } from "../utils/encryption.js";
import { sendEmail } from "../config/sendmail.js";
import nodemailer from "nodemailer";

export const getEmailConfig = async (req, res) => {
  try {
    const config = await EmailConfiguration.findOne({ configId: "global" });
    const result = config ? { ...config._doc } : {};
    if (result.smtpPassword) result.smtpPassword = "********";
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmailConfig = async (req, res) => {
  try {
    const {
      smtpHost,
      smtpPort,
      smtpUsername,
      smtpPassword,
      senderEmail,
      secure,
    } = req.body;
    const updateData = {
      smtpHost,
      smtpPort,
      smtpUsername,
      senderEmail,
      secure,
      updatedAt: Date.now(),
    };

    if (smtpPassword && smtpPassword !== "********") {
      updateData.smtpPassword = encryptPassword(smtpPassword);
    }

    const config = await EmailConfiguration.findOneAndUpdate(
      { configId: "global" },
      updateData,
      { upsert: true, returnDocument: "after" },
    );

    const result = { ...config._doc };
    if (result.smtpPassword) result.smtpPassword = "********";
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const testEmailConfig = async (req, res) => {
  try {
    const { testEmail, config } = req.body;
    const subject = "Test Email - Body Mask";
    const message = "Your email configuration is working correctly!";

    await sendEmail(testEmail, subject, message, config);

    res.status(200).json({ message: "Test email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
