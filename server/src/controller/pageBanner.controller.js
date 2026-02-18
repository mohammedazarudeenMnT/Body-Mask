import { PageBanner } from "../model/PageBanner.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

/**
 * Convert a page banner doc's imageUrl (public_id) to a full Cloudinary URL.
 */
const pageBannerWithUrl = (banner) => {
  if (!banner) return banner;
  const obj = banner._doc ? { ...banner._doc } : { ...banner };
  if (obj.imageUrl) {
    obj.imageUrl = getUrlFromPublicId(obj.imageUrl);
  }
  return obj;
};

export const getPageBanner = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const banner = await PageBanner.findOne({ pageKey, isActive: true });

    res.status(200).json({
      success: true,
      data: pageBannerWithUrl(banner),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPageBanners = async (req, res) => {
  try {
    const banners = await PageBanner.find().sort({ pageKey: 1 });
    res.status(200).json({
      success: true,
      data: banners.map(pageBannerWithUrl),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const upsertPageBanner = async (req, res) => {
  try {
    const { pageKey, title, subtitle, imageUrl, isActive } = req.body;

    let imagePublicId = imageUrl;
    if (imageUrl && imageUrl.startsWith("data:image")) {
      // Delete old image if updating an existing banner
      const existing = await PageBanner.findOne({
        pageKey: pageKey.toLowerCase(),
      });
      if (existing?.imageUrl) {
        await deleteFromCloudinary(existing.imageUrl);
      }
      const uploadResult = await uploadToCloudinary(
        imageUrl,
        `body_mask/page-banners`,
      );
      imagePublicId = uploadResult.public_id;
    }

    const banner = await PageBanner.findOneAndUpdate(
      { pageKey: pageKey.toLowerCase() },
      {
        title,
        subtitle,
        imageUrl: imagePublicId,
        isActive: isActive !== undefined ? isActive : true,
      },
      { returnDocument: "after", upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      data: pageBannerWithUrl(banner),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePageBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await PageBanner.findByIdAndDelete(id);

    // Clean up Cloudinary asset
    if (banner?.imageUrl) {
      await deleteFromCloudinary(banner.imageUrl);
    }

    res.status(200).json({
      success: true,
      message: "Page banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
