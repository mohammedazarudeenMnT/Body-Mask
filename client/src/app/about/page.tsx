import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import AboutPageContent from "@/components/AboutPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("about");

  return {
    title: settings?.metaTitle || "About Us | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Learn about Body Mask, Madurai's premier destination for luxury bridal makeup and professional beauty services.",
    keywords: settings?.keywords || [
      "about body mask",
      "bridal studio madurai",
    ],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage ? [settings.ogImage] : ["/assets/about-og.jpg"],
    },
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <AboutPageContent />
    </main>
  );
}
