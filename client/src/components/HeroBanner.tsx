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

      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Entry animations
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      }).from(
        ".hero-subtitle",
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4",
      );
    },
    { dependencies: [banner], scope: containerRef },
  );

  const image = banner?.imageUrl || imageSrc || fallbackImage || "";
  const title = banner?.title || fallbackTitle;
  const subtitle = banner?.subtitle || fallbackSubtitle;
  const altText = banner?.title || imageAlt || "Hero Banner";
  if (loading) {
    return (
      <section className="relative w-full lg:h-screen overflow-hidden bg-white pt-24 md:pt-0 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin border-2 border-[#c5a367] border-t-transparent rounded-full" />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="gpu-accelerated smooth-antialiased relative w-full h-[400px] md:h-[60vh] lg:h-[80vh] overflow-hidden bg-[#0a0a0a] flex items-center justify-center"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <Image
          src={image}
          alt={altText}
          fill
          className="object-cover opacity-80 will-change-transform"
          sizes="100vw"
          priority
        />
        {/* Luxury Vignette & Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Dynamic Content Overlay */}
      {(title || subtitle) && (
        <div className="relative z-10 text-center px-6" ref={contentRef}>
          <div className="hero-content">
            {title && (
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 drop-shadow-2xl tracking-tight opacity-0">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="hero-subtitle text-white/90 text-sm md:text-lg font-light tracking-[0.3em] uppercase drop-shadow-md opacity-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Decorative Border Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#C5A367]/50 to-transparent z-10" />
    </section>
  );
};

export default HeroBanner;
