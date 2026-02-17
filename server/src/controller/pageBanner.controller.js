import { PageBanner } from "../model/PageBanner.js";

export const getPageBanner = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const banner = await PageBanner.findOne({ pageKey, isActive: true });

    res.status(200).json({
      success: true,
      data: banner,
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
      data: banners,
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

    const banner = await PageBanner.findOneAndUpdate(
      { pageKey: pageKey.toLowerCase() },
      {
        title,
        subtitle,
        imageUrl,
        isActive: isActive !== undefined ? isActive : true,
      },
      { returnDocument: "after", upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      data: banner,
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
    await PageBanner.findByIdAndDelete(id);
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
