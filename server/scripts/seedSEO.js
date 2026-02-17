import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../src/config/database.js";
import SEOSettings from "../src/model/SEOSettings.js";

dotenv.config();

const seoPages = [
  {
    pageName: "home",
    metaTitle: "Body Mask Bridal Studio - Luxury Bridal & Makeup Artistry",
    metaDescription:
      "Experience luxury bridal services and professional makeup artistry at Body Mask Studio. Specialize in weddings, events, and personal styling.",
    keywords:
      "bridal studio, makeup artist, wedding makeup, beauty studio, professional makeup, bridal services",
  },
  {
    pageName: "services",
    metaTitle: "Our Services - Body Mask Bridal Studio",
    metaDescription:
      "Explore our premium bridal makeup, hair styling, and beauty services tailored for your special day.",
    keywords:
      "bridal makeup, hair styling, makeup services, beauty services, wedding preparation",
  },
  {
    pageName: "about",
    metaTitle: "About Body Mask - Professional Bridal Studio",
    metaDescription:
      "Learn about Body Mask's journey, expertise, and commitment to making your special day beautiful.",
    keywords:
      "about us, bridal studio, makeup artist, professional team, experience",
  },
  {
    pageName: "gallery",
    metaTitle: "Gallery - Body Mask Bridal Studio",
    metaDescription:
      "View our portfolio of beautiful bridal makeup transformations and styling work.",
    keywords:
      "bridal gallery, makeup portfolio, before and after, wedding photos, beauty transformations",
  },
  {
    pageName: "contact",
    metaTitle: "Contact Body Mask - Get in Touch",
    metaDescription:
      "Contact us for bookings, inquiries, and bridal consultations. Let's make your day special.",
    keywords:
      "contact us, booking, bridal inquiry, makeup consultation, event booking",
  },
];

const seedSEO = async () => {
  try {
    await connectDB();
    console.log(
      `✅ Connected to MongoDB. Database: ${mongoose.connection.db.databaseName}`,
    );

    let createdCount = 0;
    let existingCount = 0;

    for (const page of seoPages) {
      const existing = await SEOSettings.findOne({
        pageName: page.pageName,
      });

      if (existing) {
        console.log(`⏭️  Page "${page.pageName}" already exists. Skipping...`);
        existingCount++;
      } else {
        const newPage = new SEOSettings({
          ...page,
          lastUpdatedBy: "system",
        });
        await newPage.save();
        console.log(`✅ Created SEO settings for "${page.pageName}" page`);
        createdCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${createdCount} pages`);
    console.log(`   Already existed: ${existingCount} pages`);
    console.log(`   Total pages: ${createdCount + existingCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding SEO settings:", error);
    process.exit(1);
  }
};

seedSEO();
