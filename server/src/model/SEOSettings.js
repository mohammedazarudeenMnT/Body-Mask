import mongoose from "mongoose";

const seoSettingsSchema = new mongoose.Schema(
  {
    pageName: { type: String, required: true, unique: true, trim: true },
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    keywords: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    lastUpdatedBy: { type: String },
  },
  { timestamps: true },
);

seoSettingsSchema.index({ pageName: 1 });

export default mongoose.model("SEOSettings", seoSettingsSchema);
