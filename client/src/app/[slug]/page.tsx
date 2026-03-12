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
  try {
    const response = await serviceApi.getServiceBySlug(slug);
    if (!response.success || !response.data) {
      return { title: "Service Not Found | Body Mask" };
    }
    const service = response.data;
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${service.title} | Luxury Bridal Service | Body Mask`,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        images: [
          service.content?.heroImage || service.image,
          ...previousImages,
        ],
      },
    };
  } catch (error) {
    return { title: "Service | Body Mask Bridal Studio" };
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  let service = null;

  try {
    const response = await serviceApi.getServiceBySlug(slug);
    if (response.success) {
      service = response.data;
    }
  } catch (error) {
    console.error("Error fetching service:", error);
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

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
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
