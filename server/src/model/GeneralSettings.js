import mongoose from "mongoose";

const generalSettingsSchema = new mongoose.Schema(
  {
    settingsId: { type: String, default: "global", unique: true },
    companyName: { type: String, default: "Body Mask" },
    companyLogo: { type: String },
    companyDescription: { type: String },
    companyAddress: { type: String },
    companyEmail: { type: String },
    companyPhone: { type: String },
    workingHours: { type: String },
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      whatsapp: { type: String },
    },
    whatsappNumber: { type: String },
    termsAndConditions: { type: String },
    privacyPolicy: { type: String },
    lastUpdatedBy: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    googleMapEmbed: { type: String },
    footerNote: { type: String },
    favicon: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("GeneralSettings", generalSettingsSchema);
