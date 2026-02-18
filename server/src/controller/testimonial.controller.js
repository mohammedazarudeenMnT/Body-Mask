import Testimonial from "../model/Testimonial.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

/**
 * Convert a testimonial doc's clientImage (public_id) to a full Cloudinary URL.
 */
const testimonialWithUrl = (testimonial) => {
  if (!testimonial) return testimonial;
  const obj = testimonial._doc ? { ...testimonial._doc } : { ...testimonial };
  if (obj.clientImage) {
    obj.clientImage = getUrlFromPublicId(obj.clientImage);
  }
  return obj;
};

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    // Public only sees approved ones, admin sees all
    const query = isAdmin ? {} : { status: "Approved" };

    const testimonials = await Testimonial.find(query)
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonials.map(testimonialWithUrl),
    });
  } catch (error) {
    console.error("Get testimonials error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// Create a testimonial
export const createTestimonial = async (req, res) => {
  try {
    const testimonialData = { ...req.body };
    const isAdmin = req.user && req.user.role === "admin";

    if (isAdmin) {
      testimonialData.source = "Manual Entry";
      // Admin can set status directly, but default is Pending if not specified
      if (!testimonialData.status) testimonialData.status = "Approved";
    } else {
      testimonialData.source = "User Submitted";
      testimonialData.status = "Pending";
    }

    // Upload client image to Cloudinary
    if (
      testimonialData.clientImage &&
      testimonialData.clientImage.startsWith("data:image")
    ) {
      const uploadResult = await uploadToCloudinary(
        testimonialData.clientImage,
        "body_mask/testimonials",
      );
      testimonialData.clientImage = uploadResult.public_id;
    }

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json({
      success: true,
      data: testimonialWithUrl(testimonial),
      message:
        "Testimonial created successfully" +
        (isAdmin ? "" : ". It will be visible after approval."),
    });
  } catch (error) {
    console.error("Create testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// Update a testimonial (Admin only)
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle empty service string - convert to null or undefined to avoid CastError
    if (updateData.service === "") {
      updateData.service = null;
    }

    // Upload new client image to Cloudinary
    if (
      updateData.clientImage &&
      updateData.clientImage.startsWith("data:image")
    ) {
      const existing = await Testimonial.findById(id);
      if (existing?.clientImage) {
        await deleteFromCloudinary(existing.clientImage);
      }
      const uploadResult = await uploadToCloudinary(
        updateData.clientImage,
        "body_mask/testimonials",
      );
      updateData.clientImage = uploadResult.public_id;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      data: testimonialWithUrl(testimonial),
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
    });
  }
};

// Delete a testimonial (Admin only)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Clean up Cloudinary asset
    if (testimonial.clientImage) {
      await deleteFromCloudinary(testimonial.clientImage);
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};
