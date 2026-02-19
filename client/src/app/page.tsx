import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import { bannerApi } from "@/lib/banner-api";
import { serviceApi } from "@/lib/service-api";
import { testimonialApi } from "@/lib/testimonial-api";
import ModernHeroCarousel from "@/components/HeroCarousel";
import About from "@/components/About";
import Services from "@/components/Services";
import GalleryTestimonials from "@/components/GalleryTestimonials";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("home");

  return {
    title: settings?.metaTitle || "Body Mask Bridal Studio | Luxury Artistry",
    description:
      settings?.metaDescription ||
      "Madurai's premier destination for luxury bridal makeup and professional beauty services.",
    keywords: settings?.keywords || [
      "bridal makeup",
      "makeup artist Madurai",
      "wedding styling",
    ],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage ? [settings.ogImage] : ["/assets/og-image.jpg"],
    },
  };
}

export default async function Home() {
  const [bannersRes, servicesRes, testimonialsRes] = await Promise.all([
    bannerApi.getBanners().catch(() => ({ success: false, data: [] })),
    serviceApi.getServices().catch(() => ({ success: false, data: [] })),
    testimonialApi
      .getTestimonials()
      .catch(() => ({ success: false, data: [] })),
  ]);

  return (
    <main className="min-h-screen bg-cream">
      <ModernHeroCarousel
        initialBanners={bannersRes.success ? bannersRes.data : []}
      />
      <About />
      <Services initialServices={servicesRes.success ? servicesRes.data : []} />
      <GalleryTestimonials
        initialServices={servicesRes.success ? servicesRes.data : []}
        initialTestimonials={
          testimonialsRes.success ? testimonialsRes.data : []
        }
      />
    </main>
  );
}
