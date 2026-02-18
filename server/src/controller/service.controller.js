import Service from "../model/Service.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

/**
 * Helper: Upload a single image field if it's base64, return public_id.
 */
const processImageField = async (value, folder) => {
  if (!value) return value;
  if (value.startsWith("data:image")) {
    const result = await uploadToCloudinary(value, folder);
    return result.public_id;
  }
  return value; // already a public_id or URL
};

/**
 * Helper: Convert a service doc's image fields from public_ids to full URLs.
 */
const serviceWithUrls = (service) => {
  if (!service) return service;
  const obj = service._doc ? { ...service._doc } : { ...service };

  if (obj.image) {
    obj.image = getUrlFromPublicId(obj.image);
  }
  if (obj.content) {
    obj.content = { ...obj.content };
    if (obj.content.heroImage) {
      obj.content.heroImage = getUrlFromPublicId(obj.content.heroImage);
    }
    if (obj.content.gallery && obj.content.gallery.length > 0) {
      obj.content.gallery = obj.content.gallery.map((img) =>
        img ? getUrlFromPublicId(img) : img,
      );
    }
  }
  return obj;
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const { category } = req.query;

    let query = isAdmin ? {} : { isActive: true };

    if (category && category !== "All") {
      query = { ...query, title: category };
    }

    const services = await Service.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: services.map(serviceWithUrls),
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

// Get single service by slug
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const isAdmin = req.user && req.user.role === "admin";
    const query = isAdmin ? { slug } : { slug, isActive: true };

    const service = await Service.findOne(query);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: serviceWithUrls(service),
    });
  } catch (error) {
    console.error("Get service by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service detail",
    });
  }
};

// Get single service by ID (Internal/Admin)
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: serviceWithUrls(service),
    });
  } catch (error) {
    console.error("Get service by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service detail",
    });
  }
};

// Create service
export const createService = async (req, res) => {
  try {
    const serviceData = { ...req.body };

    // Check if slug exists
    if (serviceData.slug) {
      const existing = await Service.findOne({ slug: serviceData.slug });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A service with this slug already exists",
        });
      }
    }

    // Upload images to Cloudinary
    serviceData.image = await processImageField(
      serviceData.image,
      "body_mask/services",
    );

    if (serviceData.content) {
      serviceData.content = { ...serviceData.content };
      serviceData.content.heroImage = await processImageField(
        serviceData.content.heroImage,
        "body_mask/services/hero",
      );
      if (serviceData.content.gallery?.length > 0) {
        serviceData.content.gallery = await Promise.all(
          serviceData.content.gallery.map((img) =>
            processImageField(img, "body_mask/services/gallery"),
          ),
        );
      }
    }

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: serviceWithUrls(service),
    });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const existing = await Service.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Handle main image
    if (updateData.image && updateData.image.startsWith("data:image")) {
      if (existing.image) await deleteFromCloudinary(existing.image);
      updateData.image = await processImageField(
        updateData.image,
        "body_mask/services",
      );
    }

    // Handle content images
    if (updateData.content) {
      updateData.content = { ...updateData.content };

      // Hero image
      if (
        updateData.content.heroImage &&
        updateData.content.heroImage.startsWith("data:image")
      ) {
        if (existing.content?.heroImage) {
          await deleteFromCloudinary(existing.content.heroImage);
        }
        updateData.content.heroImage = await processImageField(
          updateData.content.heroImage,
          "body_mask/services/hero",
        );
      }

      // Gallery images
      if (updateData.content.gallery?.length > 0) {
        updateData.content.gallery = await Promise.all(
          updateData.content.gallery.map(async (img, idx) => {
            if (img && img.startsWith("data:image")) {
              // Delete old gallery image at same index if it existed
              const oldGalleryImg = existing.content?.gallery?.[idx];
              if (oldGalleryImg) await deleteFromCloudinary(oldGalleryImg);
              return processImageField(img, "body_mask/services/gallery");
            }
            return img;
          }),
        );
      }

      // Clean up removed gallery images
      if (existing.content?.gallery) {
        const newGalleryLength = updateData.content.gallery?.length || 0;
        for (
          let i = newGalleryLength;
          i < existing.content.gallery.length;
          i++
        ) {
          if (existing.content.gallery[i]) {
            await deleteFromCloudinary(existing.content.gallery[i]);
          }
        }
      }
    }

    const service = await Service.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    res.json({
      success: true,
      message: "Service updated successfully",
      data: serviceWithUrls(service),
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Clean up all Cloudinary assets
    if (service.image) await deleteFromCloudinary(service.image);
    if (service.content?.heroImage)
      await deleteFromCloudinary(service.content.heroImage);
    if (service.content?.gallery) {
      await Promise.all(
        service.content.gallery
          .filter(Boolean)
          .map((img) => deleteFromCloudinary(img)),
      );
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};
