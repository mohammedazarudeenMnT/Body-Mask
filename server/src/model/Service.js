import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Detailed Content for Service Page
    content: {
      heroImage: {
        type: String,
        default: "",
      },
      fullDescription: {
        type: String,
        default: "",
      },
      features: [
        {
          icon: String,
          title: String,
          description: String,
        },
      ],
      benefits: [
        {
          icon: String,
          title: String,
          description: String,
        },
      ],
      gallery: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate slug from title if not provided
// Auto-generate slug from title if not provided
serviceSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

export default mongoose.model("Service", serviceSchema);
