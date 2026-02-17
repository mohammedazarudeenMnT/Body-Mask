"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { bannerApi, Banner } from "@/lib/banner-api";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const HeroCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannerApi.getBanners();
        if (response.success) {
          setBanners(response.data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateSlideContent = contextSafe((index: number) => {
    // Small delay to ensure Embla has transitioned
    setTimeout(() => {
      const currentSlide = containerRef.current?.querySelectorAll(
        '[data-slot="carousel-item"]',
      )[index];
      if (!currentSlide) return;

      const title = currentSlide.querySelector("h2");
      const subtitle = currentSlide.querySelector("p");

      // Reset other slides
      const allText = containerRef.current?.querySelectorAll("h2, p");
      if (allText) {
        gsap.set(allText, {
          opacity: 0,
          y: 30,
        });
      }

      const tl = gsap.timeline();
      tl.to(title, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }).to(
        subtitle,
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        "-=0.6",
      );
    }, 100);
  });

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      animateSlideContent(api.selectedScrollSnap());
    });

    // Animate first slide on load
    animateSlideContent(0);
  }, [api, banners]);

  if (loading) {
    return (
      <section className="relative w-full lg:h-screen overflow-hidden bg-white pt-24 md:pt-0 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin border-2 border-[#c5a367] border-t-transparent rounded-full" />
      </section>
    );
  }

  // Fallback to static images if no banners are available
  const displayBanners: Banner[] =
    banners.length > 0
      ? banners
      : [
          {
            _id: "1",
            imageUrl: "/assets/skuncare-and-facials.png",
            title: "Radiant Skincare",
            subtitle: "Bridal Elegance",
            link: "",
            isActive: true,
            order: 0,
            createdAt: "",
            updatedAt: "",
          },
          {
            _id: "2",
            imageUrl: "/assets/hair-care-styling.png",
            title: "Expert Hair Styling",
            subtitle: "Luxe Treatment",
            link: "",
            isActive: true,
            order: 1,
            createdAt: "",
            updatedAt: "",
          },
          {
            _id: "3",
            imageUrl: "/assets/body-mask.png",
            title: "Holistic Body Masks",
            subtitle: "Pure Relaxation",
            link: "",
            isActive: true,
            order: 2,
            createdAt: "",
            updatedAt: "",
          },
          {
            _id: "4",
            imageUrl: "/assets/nails-manicure.png",
            title: "Nail Art & Care",
            subtitle: "Perfect Finish",
            link: "",
            isActive: true,
            order: 3,
            createdAt: "",
            updatedAt: "",
          },
        ];

  return (
    <section
      ref={containerRef}
      className="relative w-full lg:h-screen overflow-hidden bg-white group pt-24 md:pt-0"
    >
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full lg:h-screen"
      >
        <CarouselContent className="h-full ml-0">
          {displayBanners.map((banner, index) => {
            const content = (
              <div className="relative w-full h-[230px] sm:h-[400px] md:h-[510px] lg:h-screen">
                <Image
                  src={banner.imageUrl || "/placeholder.svg"}
                  alt={banner.title || "Banner"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-6">
                  {banner.title && (
                    <h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-serif mb-4 drop-shadow-lg opacity-0">
                      {banner.title}
                    </h2>
                  )}
                  {banner.subtitle && (
                    <p className="text-white/90 text-sm md:text-lg lg:text-xl font-light tracking-widest uppercase mb-8 opacity-0">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <CarouselItem
                key={banner._id}
                className="pl-0 relative h-[230px] sm:h-[400px] md:h-[510px] lg:h-screen"
              >
                {banner.link ? (
                  <Link href={banner.link}>{content}</Link>
                ) : (
                  content
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          className="left-2 sm:left-4 md:left-8 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-white/30 bg-black/10 text-white hover:bg-white/20 hover:text-white hover:border-white transition-all disabled:opacity-0"
          variant="outline"
        />

        <CarouselNext
          className="right-2 sm:right-4 md:right-8 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-white/30 bg-black/10 text-white hover:bg-white/20 hover:text-white hover:border-white transition-all disabled:opacity-0"
          variant="outline"
        />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
