import mongoose from "mongoose";

const emailConfigurationSchema = new mongoose.Schema(
  {
    configId: { type: String, default: "global", unique: true },
    smtpHost: { type: String },
    smtpPort: { type: Number },
    smtpUsername: { type: String },
    smtpPassword: { type: String },
    senderEmail: { type: String },
    secure: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("EmailConfiguration", emailConfigurationSchema);
