import Offer from "../model/Offer.js";

// Get all offers
export const getOffers = async (req, res) => {
  try {
    const { published } = req.query;
    const query = {};
    if (published === "true") {
      query.isPublished = true;
    }

    const offers = await Offer.find(query).sort({ createdAt: -1 });

    res.json(offers);
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
    res.json(offer);
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
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.status(201).json({
      success: true,
      data: newOffer,
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
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
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
      data: updatedOffer,
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
