import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import HeroBanner from "@/components/HeroBanner";
import GalleryPageContent from "@/components/GalleryPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("gallery");

  return {
    title:
      settings?.metaTitle ||
      "Visual Artistry Gallery | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Explore our curated collection of stunning bridal transformations and luxury beauty services. Witness the artistry of Body Mask Studio.",
    keywords: settings?.keywords || ["bridal gallery", "makeup portfolio"],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage
        ? [settings.ogImage]
        : ["/assets/gallery-og.jpg"],
    },
  };
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <HeroBanner
        pageKey="gallery"
        fallbackTitle="Visual Artistry"
        fallbackSubtitle="A curated collection of our finest transformations."
      />
      <GalleryPageContent />
    </main>
  );
}
