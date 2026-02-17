import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    expiryDate: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
