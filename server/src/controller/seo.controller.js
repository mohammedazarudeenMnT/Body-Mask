import SEOSettings from "../model/SEOSettings.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

export const getSEOSettings = async (req, res) => {
  try {
    const settings = await SEOSettings.find().sort({ pageName: 1 });
    const settingsWithUrls = settings.map((s) => ({
      ...s._doc,
      ogImage: s.ogImage ? getUrlFromPublicId(s.ogImage) : null,
    }));
    res.status(200).json(settingsWithUrls);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateSEOSettings = async (req, res) => {
  try {
    const { pageName } = req.params;
    const { metaTitle, metaDescription, keywords, ogImage } = req.body;
    let ogImagePublicId = undefined;

    if (ogImage && ogImage.startsWith("data:image")) {
      const existing = await SEOSettings.findOne({ pageName });
      if (existing?.ogImage) {
        await deleteFromCloudinary(existing.ogImage);
      }
      const uploadResult = await uploadToCloudinary(
        ogImage,
        `body_mask/seo/${pageName}`,
      );
      ogImagePublicId = uploadResult.public_id;
    }

    const updateData = {
      metaTitle: metaTitle?.substring(0, 60),
      metaDescription: metaDescription?.substring(0, 160),
      keywords,
      lastUpdatedBy: req.user?.id || "admin",
    };
    if (ogImagePublicId !== undefined) updateData.ogImage = ogImagePublicId;

    const settings = await SEOSettings.findOneAndUpdate(
      { pageName },
      updateData,
      { upsert: true, returnDocument: "after" },
    );

    res.status(200).json({
      success: true,
      data: {
        ...settings._doc,
        ogImage: settings.ogImage ? getUrlFromPublicId(settings.ogImage) : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
