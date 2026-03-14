import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
      default: null,
      validate: {
        validator: function(v) {
          // Allow null or valid ObjectId
          return v === null || mongoose.Types.ObjectId.isValid(v);
        },
        message: 'Invalid event type ID'
      }
    },
    status: {
      type: String,
      enum: ["Published", "Hidden"],
      default: "Published",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", gallerySchema);
