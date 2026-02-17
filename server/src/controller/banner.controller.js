import { Banner } from "../model/Banner.js";

/**
 * Get all active banners for public frontend
 */
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

/**
 * Get all banners for admin dashboard
 */
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Error fetching admin banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners for admin",
    });
  }
};

/**
 * Create a new banner
 */
export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, link, order, isActive } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const banner = await Banner.create({
      title,
      subtitle,
      imageUrl,
      link,
      order,
      isActive,
    });

    res.status(201).json({
      success: true,
      data: banner,
      message: "Banner created successfully",
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create banner",
    });
  }
};

/**
 * Update a banner
 */
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const banner = await Banner.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
      message: "Banner updated successfully",
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update banner",
    });
  }
};

/**
 * Delete a banner
 */
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};
