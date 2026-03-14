import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { serviceApi } from "@/lib/service-api";
import HeroBanner from "@/components/HeroBanner";
import ServiceDetailClient from "@/components/ServiceDetailClient";
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  if (slug.includes('.') || ["favicon.ico", "robots.txt", "sitemap.xml", "track"].includes(slug)) {
    return { title: "Not Found | Body Mask" };
  }

  try {
    const response = await serviceApi.getServiceBySlug(slug);
    if (!response.success || !response.data) {
      return { title: "Service Not Found | Body Mask" };
    }
    const service = response.data;
    const previousImages = (await parent).openGraph?.images || [];

    // Use SEO fields if available, otherwise fall back to service data
    const metaTitle = service.seo?.metaTitle || 
      `${service.title} | Luxury Bridal Service | Body Mask`;
    const metaDescription = service.seo?.metaDescription || service.description;
    const keywords = service.seo?.keywords?.split(',').map(k => k.trim()) || [];
    const ogImage = service.seo?.ogImage || 
      service.content?.heroImage || 
      service.image;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords.length > 0 ? keywords : undefined,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [ogImage, ...previousImages],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: [ogImage],
      },
    };
  } catch (error) {
    return { title: "Service | Body Mask Bridal Studio" };
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  if (slug.includes('.') || ["favicon.ico", "robots.txt", "sitemap.xml"].includes(slug)) {
    notFound();
  }

  let service = null;

  try {
    const response = await serviceApi.getServiceBySlug(slug);
    if (response.success) {
      service = response.data;
    }
  } catch (error: any) {
    if (error.response?.status !== 404) {
      console.error("Error fetching service:", error);
    }
  }

  if (!service) {
    notFound();
  }

  // Transform Service to the format ServiceDetailClient expects
  const adaptedService = {
    title: service.title,
    subtitle: service.description,
    heroImage: service.image, // Use the Main Portrait image for the side feature
    category: "Luxury Service",
    description: {
      intro: service.description,
      main: service.content?.fullDescription || service.description,
      quote: "Beauty is an experience, not just a result.",
      quoteAuthor: "Body Mask Studio",
    },
    features: service.content?.features || [],
    benefits: service.content?.benefits || [],
    gallery: service.content?.gallery || [],
  };

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seo?.metaDescription || service.description,
    provider: {
      "@type": "BeautySalon",
      name: "Body Mask Bridal Studio",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madurai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    image: service.seo?.ogImage || service.content?.heroImage || service.image,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <HeroBanner
        pageKey={`service-${service.slug}`}
        fallbackTitle={service.title}
        fallbackSubtitle={service.description}
        fallbackImage={service.content?.heroImage || service.image} // Use Wide Banner if available
      />
      <ServiceDetailClient service={adaptedService} />
    </main>
  );
}
