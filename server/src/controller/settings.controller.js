import GeneralSettings from "../model/GeneralSettings.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

export const getGeneralSettings = async (req, res) => {
  try {
    const settings = await GeneralSettings.findOne({ settingsId: "global" });
    if (settings && settings.companyLogo) {
      settings.companyLogo = getUrlFromPublicId(settings.companyLogo);
    }
    if (settings && settings.favicon) {
      settings.favicon = getUrlFromPublicId(settings.favicon);
    }
    res.status(200).json(settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGeneralSettings = async (req, res) => {
  try {
    const { companyLogo, favicon, ...otherSettings } = req.body;
    let logoPublicId = undefined;
    let faviconPublicId = undefined;

    if (companyLogo && companyLogo.startsWith("data:image")) {
      const existing = await GeneralSettings.findOne({ settingsId: "global" });
      if (existing?.companyLogo) {
        await deleteFromCloudinary(existing.companyLogo);
      }
      const uploadResult = await uploadToCloudinary(
        companyLogo,
        "body_mask/logo",
      );
      logoPublicId = uploadResult.public_id;
    }

    if (favicon && favicon.startsWith("data:image")) {
      const existing = await GeneralSettings.findOne({ settingsId: "global" });
      if (existing?.favicon) {
        await deleteFromCloudinary(existing.favicon);
      }
      const uploadResult = await uploadToCloudinary(
        favicon,
        "body_mask/favicon",
      );
      faviconPublicId = uploadResult.public_id;
    }

    const updateData = {
      ...otherSettings,
      lastUpdatedBy: req.user?.id || "admin",
    };
    if (logoPublicId !== undefined) updateData.companyLogo = logoPublicId;
    if (faviconPublicId !== undefined) updateData.favicon = faviconPublicId;

    const settings = await GeneralSettings.findOneAndUpdate(
      { settingsId: "global" },
      updateData,
      { upsert: true, returnDocument: "after" },
    );

    res.status(200).json({
      ...settings._doc,
      companyLogo: settings.companyLogo
        ? getUrlFromPublicId(settings.companyLogo)
        : null,
      favicon: settings.favicon ? getUrlFromPublicId(settings.favicon) : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
