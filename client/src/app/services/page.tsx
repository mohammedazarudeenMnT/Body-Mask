import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import HeroBanner from "@/components/HeroBanner";
import ServicesPageContent from "@/components/ServicesPageContent";

import { serviceApi } from "@/lib/service-api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("services");

  return {
    title: settings?.metaTitle || "Our Services | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Explore our range of luxury bridal makeup, professional beauty treatments, and expert styling services in Madurai.",
    keywords: settings?.keywords || [
      "bridal makeup services",
      "beauty treatments",
    ],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage
        ? [settings.ogImage]
        : ["/assets/services-og.jpg"],
    },
  };
}

export default async function ServicesPage() {
  const servicesRes = await serviceApi
    .getServices()
    .catch(() => ({ success: false, data: [] }));

  return (
    <main className="min-h-screen bg-cream smooth-antialiased">
      <HeroBanner
        pageKey="services"
        fallbackTitle="Our Services"
        fallbackSubtitle="Luxury Treatments & Professional Artistry"
      />
      <ServicesPageContent
        initialServices={servicesRes.success ? servicesRes.data : []}
      />
    </main>
  );
}
