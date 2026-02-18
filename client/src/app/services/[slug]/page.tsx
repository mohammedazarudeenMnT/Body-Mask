"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import HeroBanner from "@/components/HeroBanner";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServicePage({ params }: PageProps) {
  const { slug } = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await serviceApi.getServiceBySlug(slug);
        if (response.success) {
          setService(response.data);
        } else {
          setService(null);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-12 h-12 text-[#C5A367] animate-spin" />
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  // Transform Service to the format ServiceDetailClient expects
  // If the ServiceDetailClient expects a different structure, we adapt it here
  const adaptedService = {
    title: service.title,
    subtitle: service.description,
    heroImage: service.content?.heroImage || service.image,
    category: "Luxury Service", // Or add category to model
    description: {
      intro: service.description,
      main: service.content?.fullDescription || service.description,
      quote: "Beauty is an experience, not just a result.",
      quoteAuthor: "Body Mask Studio",
    },
    features: service.content?.features || [],
    benefits: service.content?.benefits || [],
    gallery: [
      { src: service.image, alt: service.title, label: "Main Feature" },
      ...(service.content?.gallery?.map((img, i) => ({
        src: img,
        alt: `${service.title} gallery ${i}`,
        label: "Artistry",
      })) || []),
    ],
  };

  // If gallery is empty or too short, we might want to add some defaults or handle it in the component
  if (adaptedService.gallery.length < 3) {
    // Add placeholders or duplicate if necessary for the layout
    adaptedService.gallery.push({
      src: service.image,
      alt: service.title,
      label: "Artistry",
    });
    adaptedService.gallery.push({
      src: service.image,
      alt: service.title,
      label: "Artistry",
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <HeroBanner
        pageKey={`service-${service.slug}`}
        fallbackTitle={service.title}
        fallbackSubtitle={service.description}
      />
      <ServiceDetailClient service={adaptedService} />
    </main>
  );
}
