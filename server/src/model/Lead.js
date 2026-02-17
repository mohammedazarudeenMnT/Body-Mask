import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      enum: ["Form Submission", "Manual Entry"],
      default: "Form Submission",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Lost"],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Lead", leadSchema);
