"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageBannerApi, PageBanner } from "@/lib/page-banner-api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroBannerProps {
  pageKey?: string;
  imageSrc?: string; // Legacy support
  imageAlt?: string; // Legacy support
  fallbackTitle?: string;
  fallbackImage?: string;
  fallbackSubtitle?: string;
}

const HeroBanner = ({
  pageKey,
  imageSrc,
  imageAlt,
  fallbackTitle,
  fallbackImage,
  fallbackSubtitle,
}: HeroBannerProps) => {
  const [banner, setBanner] = useState<PageBanner | null>(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageKey) {
      const fetchBanner = async () => {
        try {
          const response = await pageBannerApi.getPageBanner(pageKey);
          if (response.success && response.data) {
            setBanner(response.data);
          }
        } catch (error) {
          console.error(`Error fetching banne r for ${pageKey}:`, error);
        } finally {
          setLoading(false);
        }
      };
      fetchBanner();
    }
  }, [pageKey]);

  useGSAP(
    () => {
      if (!imageRef.current) return;

      // Removed GSAP parallax because the container uses strict aspect ratio natively. 
      // Parallax requires the image to be intentionally larger than the container, 
      // otherwise it shears/crops the bottom or top depending on the scroll direction.

      // Entry animations - Removed since no text overlay
      // const tl = gsap.timeline();
      // tl.from(".hero-title", { ... }).from(".hero-subtitle", { ... });
    },
    { dependencies: [banner], scope: containerRef },
  );

  const image = banner?.imageUrl || imageSrc || fallbackImage || "";
  const title = banner !== null ? banner.title : fallbackTitle;
  const subtitle = banner !== null ? banner.subtitle : fallbackSubtitle;
  const altText = banner?.title || imageAlt || "Hero Banner";
  if (loading) {
    return (
      <section className="relative w-full h-[250px] md:h-[300px] lg:h-auto lg:aspect-[1920/630] mt-24 md:mt-[130px] overflow-hidden bg-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin border-2 border-[#c5a367] border-t-transparent rounded-full" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250px] md:h-[300px] lg:h-auto lg:aspect-[1920/630] mt-24 md:mt-[130px] overflow-hidden bg-[#0a0a0a] flex items-center justify-center"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        {image ? (
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={100}
            unoptimized={true}
          />
        ) : null}
      </div>

      {/* Dynamic Content Overlay - Removed for cleaner banner display */}

      {/* Decorative Border Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#C5A367]/50 to-transparent z-10" />
    </section>
  );
};

export default HeroBanner;
