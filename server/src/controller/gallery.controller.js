import Gallery from "../model/Gallery.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

/**
 * Helper: Convert a gallery doc's image public_id to full URL.
 */
const itemWithUrl = (item) => {
  if (!item) return item;
  const obj = item._doc ? { ...item._doc } : { ...item };
  if (obj.publicId) {
    obj.imageUrl = getUrlFromPublicId(obj.publicId);
  }
  return obj;
};

// Get all gallery items (public: only Published, admin: all)
export const getGalleryItems = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const query = isAdmin ? {} : { status: "Published" };

    const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: items.map(itemWithUrl),
    });
  } catch (error) {
    console.error("Get gallery items error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items",
    });
  }
};

// Create a gallery item (Admin only)
export const createGalleryItem = async (req, res) => {
  try {
    const { title, image, status, order } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
      });
    }

    let publicId = "";
    if (image.startsWith("data:image")) {
      const result = await uploadToCloudinary(image, "body_mask/gallery");
      publicId = result.public_id;
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid image format. Base64 expected.",
          });
    }

    const item = await Gallery.create({
      title,
      imageUrl: getUrlFromPublicId(publicId),
      publicId,
      status: status || "Published",
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: itemWithUrl(item),
      message: "Gallery item added successfully",
    });
  } catch (error) {
    console.error("Create gallery item error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create gallery item",
      error: error.message,
    });
  }
};

// Update a gallery item (Admin only)
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, status, order } = req.body;

    const existing = await Gallery.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    const updateData = { title, status, order };

    if (image && image.startsWith("data:image")) {
      // Delete old image
      if (existing.publicId) {
        await deleteFromCloudinary(existing.publicId);
      }
      // Upload new image
      const result = await uploadToCloudinary(image, "body_mask/gallery");
      updateData.publicId = result.public_id;
      updateData.imageUrl = getUrlFromPublicId(result.public_id);
    }

    const item = await Gallery.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: itemWithUrl(item),
      message: "Gallery item updated successfully",
    });
  } catch (error) {
    console.error("Update gallery item error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update gallery item",
    });
  }
};

// Delete a gallery item (Admin only)
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    // Delete from Cloudinary
    if (item.publicId) {
      await deleteFromCloudinary(item.publicId);
    }

    await Gallery.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery item error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete gallery item",
    });
  }
};
