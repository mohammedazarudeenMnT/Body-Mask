import cloudinary from "../config/cloudinary.js";

export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return null;
  try {
    const urlWithoutQuery = url.split("?")[0];
    const parts = urlWithoutQuery.split("/upload/");
    if (parts.length < 2) return null;

    const afterUpload = parts[1];
    const pathParts = afterUpload.split("/");
    let versionIndex = -1;
    for (let i = pathParts.length - 1; i >= 0; i--) {
      if (pathParts[i].match(/^v\d+$/)) {
        versionIndex = i;
        break;
      }
    }
    const startIndex = versionIndex !== -1 ? versionIndex + 1 : 0;
    const publicIdWithExt = pathParts.slice(startIndex).join("/");
    const publicId = publicIdWithExt.split(".")[0];
    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export const getUrlFromPublicId = (publicId, customOptions = {}) => {
  if (!publicId) return null;
  if (publicId.startsWith("http")) return publicId;

  return cloudinary.url(publicId, {
    secure: true,
    quality: "auto",
    fetch_format: "auto",
    ...customOptions,
  });
};

export const uploadToCloudinary = async (
  file,
  folder = "body_mask",
  customPublicId = null,
) => {
  try {
    const options = {
      folder,
      resource_type: "auto",
    };
    if (customPublicId) options.public_id = customPublicId;
    const result = await cloudinary.uploader.upload(file, options);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export const deleteFromCloudinary = async (identifier) => {
  try {
    const publicId = identifier.startsWith("http")
      ? getPublicIdFromUrl(identifier)
      : identifier;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
};
