import Offer from "../model/Offer.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getUrlFromPublicId,
} from "../utils/cloudinary-helper.js";

/**
 * Convert an offer doc's imageUrl (public_id) to a full Cloudinary URL.
 */
const offerWithUrl = (offer) => {
  if (!offer) return offer;
  const obj = offer._doc ? { ...offer._doc } : { ...offer };
  if (obj.imageUrl) {
    obj.imageUrl = getUrlFromPublicId(obj.imageUrl);
  }
  return obj;
};

// Get all offers
export const getOffers = async (req, res) => {
  try {
    const { published } = req.query;
    const query = {};
    if (published === "true") {
      query.isPublished = true;
    }

    const offers = await Offer.find(query).sort({ createdAt: -1 });

    res.json(offers.map(offerWithUrl));
  } catch (error) {
    console.error("Get offers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch offers",
    });
  }
};

// Get single offer
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }
    res.json(offerWithUrl(offer));
  } catch (error) {
    console.error("Get offer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch offer",
    });
  }
};

// Create offer
export const createOffer = async (req, res) => {
  try {
    const offerData = { ...req.body };

    if (offerData.imageUrl && offerData.imageUrl.startsWith("data:image")) {
      const uploadResult = await uploadToCloudinary(
        offerData.imageUrl,
        "body_mask/offers",
      );
      offerData.imageUrl = uploadResult.public_id;
    }

    const newOffer = new Offer(offerData);
    await newOffer.save();
    res.status(201).json({
      success: true,
      data: offerWithUrl(newOffer),
    });
  } catch (error) {
    console.error("Create offer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create offer",
    });
  }
};

// Update offer
export const updateOffer = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.imageUrl && updateData.imageUrl.startsWith("data:image")) {
      const existing = await Offer.findById(req.params.id);
      if (existing?.imageUrl) {
        await deleteFromCloudinary(existing.imageUrl);
      }
      const uploadResult = await uploadToCloudinary(
        updateData.imageUrl,
        "body_mask/offers",
      );
      updateData.imageUrl = uploadResult.public_id;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" },
    );
    if (!updatedOffer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }
    res.json({
      success: true,
      data: offerWithUrl(updatedOffer),
    });
  } catch (error) {
    console.error("Update offer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update offer",
    });
  }
};

// Delete offer
export const deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Clean up Cloudinary asset
    if (deletedOffer.imageUrl) {
      await deleteFromCloudinary(deletedOffer.imageUrl);
    }

    res.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    console.error("Delete offer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete offer",
    });
  }
};
