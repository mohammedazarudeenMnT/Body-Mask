import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../src/model/Service.js";
import { connectDB } from "../src/config/database.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services = [
  {
    title: "Bridal Makeup",
    description:
      "Exquisite bridal makeup to make your special day unforgettable.",
    image: "/assets/services/bridal-makup.png",
    content: {
      heroImage: "/assets/banner/bridal-makup-banner.jpg",
      fullDescription:
        "Our bridal makeup service is designed to highlight your natural beauty while ensuring you look stunning in photos and in person. We use premium, long-lasting products to ensure your look stays fresh throughout your special day. From traditional to contemporary styles, our experts work with you to create the perfect look.",
      features: [
        {
          icon: "Sparkles",
          title: "HD Makeup",
          description: "High-definition makeup for flawless photos.",
        },
        {
          icon: "Clock",
          title: "Long-Lasting",
          description: "Waterproof and sweat-proof application.",
        },
        {
          icon: "User",
          title: "Personalized",
          description: "Customized look to match your outfit and style.",
        },
      ],
      benefits: [
        {
          icon: "Camera",
          title: "Photo Ready",
          description: "Look perfect from every angle.",
        },
        {
          icon: "Heart",
          title: "Stress Free",
          description: "Relax while we transform you.",
        },
        {
          icon: "Star",
          title: "Expert Artists",
          description: "Services by certified professionals.",
        },
      ],
      gallery: [
        "/assets/services/bridal-makup.png",
        "/assets/services/makeup.png",
      ],
    },
  },
  {
    title: "Hair Styling",
    description:
      "Professional hair styling for any occasion, from cuts to complex updos.",
    image: "/assets/services/hair-styling.png",
    content: {
      heroImage: "/assets/services/hair-styling.png",
      fullDescription:
        "Whether you need a fresh cut, color, or an elegant updo for an event, our expert stylists are here to create the perfect look for you. We stay updated with the latest trends and techniques.",
      features: [
        {
          icon: "Scissors",
          title: "Precision Cuts",
          description: "Styles that suit your face shape.",
        },
        {
          icon: "Palette",
          title: "Custom Color",
          description: "Ammonia-free organic colors available.",
        },
        {
          icon: "Zap",
          title: "Treatments",
          description: "Keratin and spa treatments for healthy hair.",
        },
      ],
      benefits: [
        {
          icon: "Smile",
          title: "Confident Look",
          description: "Walk out feeling your best.",
        },
        {
          icon: "Shield",
          title: "Hair Health",
          description: "Products that nourish your hair.",
        },
      ],
      gallery: [
        "/assets/services/hair-styling.png",
        "/assets/services/hair-care-styling.png",
      ],
    },
  },
  {
    title: "Advanced Facials",
    description: "Rejuvenating facial treatments tailored to your skin type.",
    image: "/assets/services/facial.png",
    content: {
      heroImage: "/assets/services/facial.png",
      fullDescription:
        "Experience deep cleansing and rejuvenation with our advanced facial treatments. We analyze your skin type to provide the most effective treatment for a radiant glow, using top-tier dermatological products.",
      features: [
        {
          icon: "Droplet",
          title: "Hydration",
          description: "Deep moisturizing for dry skin.",
        },
        {
          icon: "Sun",
          title: "Glow Boost",
          description: "Vitamin C treatments for radiance.",
        },
        {
          icon: "Activity",
          title: "Anti-Aging",
          description: "Collagen boosting therapies.",
        },
      ],
      benefits: [
        {
          icon: "Feather",
          title: "Soft Skin",
          description: "Remove dead skin cells and impurities.",
        },
        {
          icon: "Refresh Ccw",
          title: "Youthful Look",
          description: "Reduce fine lines and wrinkles.",
        },
      ],
      gallery: [
        "/assets/services/facial.png",
        "/assets/services/skuncare-and-facials.png",
      ],
    },
  },
  {
    title: "Nail Art",
    description: "Creative and trendy nail art designs to express your style.",
    image: "/assets/services/nail-art.png",
    content: {
      heroImage: "/assets/services/nail-art.png",
      fullDescription:
        "Express yourself with our creative nail art services. From simple elegance to intricate designs, our nail technicians can bring your vision to life using gel, acrylics, and more.",
      features: [
        {
          icon: "Brush",
          title: "Custom Designs",
          description: "Hand-painted art by skilled technicians.",
        },
        {
          icon: "Layers",
          title: "Gel Polish",
          description: "Long-lasting, chip-free finish.",
        },
        {
          icon: "Star",
          title: "Extensions",
          description: "Acrylic and gel extensions available.",
        },
      ],
      benefits: [
        {
          icon: "ThumbsUp",
          title: "Durability",
          description: "Nails that last for weeks.",
        },
        {
          icon: "Heart",
          title: "Style Statement",
          description: "Unique designs that stand out.",
        },
      ],
      gallery: [
        "/assets/services/nail-art.png",
        "/assets/services/nails-manicure.png",
      ],
    },
  },
  {
    title: "Pedicure Spa",
    description: "Relaxing pedicure services to pamper your feet.",
    image: "/assets/services/pedicure.png",
    content: {
      heroImage: "/assets/services/pedicure.png",
      fullDescription:
        "Treat your feet to a relaxing pedicure. Our spa pedicure includes soaking, exfoliation, massage, and polish for the ultimate pampering session. Perfect for tired feet.",
      features: [
        {
          icon: "Coffee",
          title: "Relaxing Soak",
          description: "Herbal foot bath.",
        },
        {
          icon: "Move",
          title: "Massage",
          description: "Reflexology-based foot massage.",
        },
        {
          icon: "Scissors",
          title: "Grooming",
          description: "Cuticle care and shaping.",
        },
      ],
      benefits: [
        {
          icon: "Activity",
          title: "Circulation",
          description: "Improves blood flow in feet.",
        },
        {
          icon: "Smile",
          title: "Hygiene",
          description: "Prevents nail diseases and callus buildup.",
        },
      ],
      gallery: ["/assets/services/pedicure.png"],
    },
  },
  {
    title: "Premium Manicure",
    description: "Luxurious manicure treatments for soft, beautiful hands.",
    image: "/assets/services/premium-manicure.png",
    content: {
      heroImage: "/assets/services/premium-manicure.png",
      fullDescription:
        "Keep your hands looking their best with our premium manicure services. We focus on nail health and cuticle care for a polished look. Choose from a wide range of colors.",
      features: [
        {
          icon: "Droplet",
          title: "Moisturizing",
          description: "Paraffin wax dip for softness.",
        },
        {
          icon: "Sun",
          title: "Polishing",
          description: "High-shine buffing or polish.",
        },
      ],
      benefits: [
        {
          icon: "Hand",
          title: "Soft Hands",
          description: "Rehydrate dry skin.",
        },
        {
          icon: "Eye",
          title: "Clean Look",
          description: "Neat and professional appearance.",
        },
      ],
      gallery: [
        "/assets/services/premium-manicure.png",
        "/assets/services/nails-manicure.png",
      ],
    },
  },
  {
    title: "Skin Treatments",
    description: "Targeted treatments for specific skin concerns.",
    image: "/assets/services/skin-treatements.png",
    content: {
      heroImage: "/assets/services/skin-treatements.png",
      fullDescription:
        "Address specific skin concerns such as acne, pigmentation, or aging with our targeted skin treatments using advanced technology and specialist products.",
      features: [
        {
          icon: "Target",
          title: "Acne Control",
          description: "Treatments to reduce breakouts.",
        },
        {
          icon: "Sun",
          title: "Pigmentation",
          description: "Reduce dark spots and uneven tone.",
        },
      ],
      benefits: [
        {
          icon: "Shield",
          title: "Protection",
          description: "Strengthen skin barrier.",
        },
        {
          icon: "Smile",
          title: "Confidence",
          description: "Clearer, healthier skin.",
        },
      ],
      gallery: [
        "/assets/services/skin-treatements.png",
        "/assets/services/skuncare-and-facials.png",
      ],
    },
  },
  {
    title: "Professional Waxing",
    description: "Smooth and gentle waxing services for long-lasting results.",
    image: "/assets/services/waxing.png",
    content: {
      heroImage: "/assets/services/waxing.png",
      fullDescription:
        "Achieve smooth, hair-free skin with our professional waxing services. We use high-quality wax (Rica, Chocolate, etc.) to minimize discomfort and ensure long-lasting results.",
      features: [
        {
          icon: "Feather",
          title: "Gentle Wax",
          description: "Suitable for sensitive skin.",
        },
        {
          icon: "Check",
          title: "Hygienic",
          description: "No double-dipping policy.",
        },
      ],
      benefits: [
        {
          icon: "Clock",
          title: "Long Lasting",
          description: "Hair-free for weeks.",
        },
        {
          icon: "Sun",
          title: "Exfoliation",
          description: "Removes dead skin along with hair.",
        },
      ],
      gallery: ["/assets/services/waxing.png"],
    },
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing services
    await Service.deleteMany({});
    console.log("Cleared existing services");

    // Insert new services
    await Service.insertMany(services);
    console.log("Seeded services successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
