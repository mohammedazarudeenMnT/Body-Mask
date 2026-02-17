import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    clientImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Approved", "Pending"],
      default: "Pending",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false,
    },
    source: {
      type: String,
      enum: ["User Submitted", "Manual Entry"],
      default: "User Submitted",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Testimonial", testimonialSchema);
