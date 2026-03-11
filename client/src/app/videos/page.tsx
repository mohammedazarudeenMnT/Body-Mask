import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import { VideoSection } from "@/components/VideoSection";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("videos").catch(() => null);

  return {
    title: settings?.metaTitle || "Videos | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Watch our luxury body mask treatments and bridal beauty services in action. Explore our curated YouTube video collection.",
    keywords: settings?.keywords || [
      "body mask videos",
      "bridal makeup video Madurai",
      "beauty treatment video",
    ],
    openGraph: {
      title: settings?.metaTitle || "Videos | Body Mask Bridal Studio",
      description:
        settings?.metaDescription ||
        "Watch our luxury body mask treatments in action.",
      images: settings?.ogImage ? [settings.ogImage] : ["/assets/og-image.jpg"],
    },
  };
}

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#121212] pt-24">
      <VideoSection />
    </main>
  );
}
