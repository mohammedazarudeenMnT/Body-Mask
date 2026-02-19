"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  testimonialApi,
  Testimonial as TestimonialType,
} from "@/lib/testimonial-api";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ force3D: true, lazy: false });
}

// Types
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  offset?: number;
}

interface GalleryTestimonialsProps {
  initialTestimonials?: TestimonialType[];
  initialServices?: Service[];
}

export default function GalleryTestimonials({
  initialTestimonials = [],
  initialServices = [],
}: GalleryTestimonialsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(2);
  const [testimonials, setTestimonials] =
    useState<TestimonialType[]>(initialTestimonials);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(
    initialTestimonials.length === 0 && initialServices.length === 0,
  );

  // Helper to build gallery images from services
  const buildGallery = (services: Service[]) => {
    const images: GalleryImage[] = [];
    services.forEach((service) => {
      if (service.image) {
        images.push({
          id: `service-${service._id}`,
          src: service.image,
          alt: service.title,
        });
      }
      if (service.content?.gallery && service.content.gallery.length > 0) {
        service.content.gallery.forEach((galleryUrl, gIdx) => {
          if (galleryUrl) {
            images.push({
              id: `gallery-${service._id}-${gIdx}`,
              src: galleryUrl,
              alt: `${service.title} Gallery ${gIdx + 1}`,
            });
          }
        });
      }
    });
    return images;
  };

  // Build initial gallery from props
  useEffect(() => {
    if (initialServices.length > 0) {
      const images = buildGallery(initialServices);
      if (images.length > 0) {
        setGalleryImages(images);
        setActiveImageIndex(Math.min(2, images.length - 1));
      }
    }
  }, [initialServices]);

  // Fetch testimonials and gallery images from APIs
  useEffect(() => {
    if (initialTestimonials.length > 0 && initialServices.length > 0) return;

    const fetchData = async () => {
      try {
        const [testimonialRes, servicesRes] = await Promise.all([
          testimonialApi
            .getTestimonials()
            .catch(() => ({ success: false, data: [] })),
          serviceApi.getServices().catch(() => ({ success: false, data: [] })),
        ]);

        // Set testimonials
        if (testimonialRes.success && testimonialRes.data?.length > 0) {
          setTestimonials(testimonialRes.data);
        }

        // Build gallery images from all services' gallery content
        if (servicesRes.success && servicesRes.data?.length > 0) {
          const images = buildGallery(servicesRes.data);
          if (images.length > 0) {
            setGalleryImages(images);
            setActiveImageIndex(Math.min(2, images.length - 1));
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialTestimonials.length, initialServices.length]);

  const displayTestimonials = useMemo(() => {
    if (testimonials.length > 0) return testimonials.slice(0, 4);
    return [];
  }, [testimonials]);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Responsive Visible Images Logic
  const visibleImages = useMemo(() => {
    if (galleryImages.length === 0) return [];
    const images = [];
    const total = galleryImages.length;
    for (let i = -2; i <= 2; i++) {
      const index = (activeImageIndex + i + total) % total;
      images.push({ ...galleryImages[index], offset: i });
    }
    return images;
  }, [activeImageIndex, galleryImages]);

  useGSAP(
    () => {
      if (loading || galleryImages.length === 0) return;

      // Recalculate positions after dynamic content renders
      ScrollTrigger.refresh();

      // Header animation
      gsap.fromTo(
        ".gallery-header",
        { opacity: 1, y: 0 },
        {
          opacity: 1,
          y: -20,
          duration: 0.6,
          force3D: true,
          scrollTrigger: {
            trigger: ".gallery-header",
            start: "top 85%",
            once: true,
          },
        },
      );

      // Carousel entrance
      gsap.fromTo(
        ".gallery-item-container",
        { opacity: 1, scale: 1 },
        {
          opacity: 1,
          scale: 1.05,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [loading, galleryImages] },
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateCarousel = contextSafe((direction: "next" | "prev") => {
    if (isAnimating.current || galleryImages.length === 0) return;
    isAnimating.current = true;

    const items = gsap.utils.toArray(
      ".gallery-item-container",
    ) as HTMLElement[];

    gsap.to(items, {
      opacity: 0.5,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        if (direction === "next") {
          setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
        } else {
          setActiveImageIndex(
            (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
          );
        }

        setTimeout(() => {
          gsap.fromTo(
            ".gallery-item-container",
            { opacity: 0.5, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.8)",
              force3D: true,
              onComplete: () => {
                isAnimating.current = false;
              },
            },
          );
        }, 50);
      },
    });
  });

  const nextGallery = () => animateCarousel("next");
  const prevGallery = () => animateCarousel("prev");

  // Don't render if no data at all
  if (
    !loading &&
    galleryImages.length === 0 &&
    displayTestimonials.length === 0
  )
    return null;

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-24 bg-white overflow-hidden w-full"
    >
      <div className="w-full">
        {/* Full Width Container */}
        <div className="bg-white relative">
          {/* HEADER */}
          <div className="gallery-header text-center mb-10 md:mb-16">
            <div className="flex items-center justify-center gap-3 md:gap-6">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
              <h2
                className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-center"
                style={{ letterSpacing: "0.05em" }}
              >
                Gallery & Testimonials
              </h2>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-[#2B2622] mt-4">
              What Our Clients Say
            </h3>
          </div>

          {/* GALLERY CAROUSEL */}
          {galleryImages.length > 0 ? (
            <div className="mb-16 md:mb-24 relative w-full">
              <div
                ref={galleryRef}
                className="flex justify-center items-center h-[350px] md:h-[450px] relative w-full perspective-1000 gpu-accelerated"
              >
                {visibleImages.map((img) => {
                  const isCenter = img.offset === 0;
                  const isNeighbor = Math.abs(img.offset!) === 1;
                  const isOuter = Math.abs(img.offset!) === 2;

                  let visibilityClass = "flex";
                  if (isOuter) visibilityClass = "hidden lg:flex";
                  if (isNeighbor) visibilityClass = "hidden md:flex lg:flex";

                  return (
                    <div
                      key={img.id + "-" + img.offset}
                      className={cn(
                        "gallery-item-container relative cursor-pointer rounded-sm overflow-hidden shrink-0 transition-all duration-500 mx-1 md:mx-4 gpu-accelerated",
                        isCenter
                          ? "shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-[#C5A367]/30"
                          : "opacity-70 grayscale-40",
                        visibilityClass,
                      )}
                      style={{
                        width: isCenter ? "min(100%, 280px)" : "180px",
                        height: isCenter ? "min(450px, 80vw)" : "300px",
                        zIndex: isCenter ? 50 : 10,
                        transform: `scale(${isCenter ? 1.1 : isNeighbor ? 0.9 : 0.8})`,
                      }}
                      onClick={() => {
                        if (isCenter) return;
                        if (img.offset && img.offset > 0) nextGallery();
                        else prevGallery();
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        priority={img.offset === 0}
                        loading={img.offset === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Nav Arrows */}
              <button
                onClick={prevGallery}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#C5A367] shadow-lg text-[#C5A367] hover:bg-[#C5A367] hover:text-white transition-all focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextGallery}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#C5A367] shadow-lg text-[#C5A367] hover:bg-[#C5A367] hover:text-white transition-all focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          ) : loading ? (
            /* Loading skeleton for gallery */
            <div className="mb-16 md:mb-24 flex justify-center items-center h-[350px] md:h-[450px] gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`gallery-skeleton-${i}`}
                  className={cn(
                    "rounded-sm bg-gray-100 animate-pulse shrink-0",
                    i === 1
                      ? "w-[280px] h-[400px]"
                      : "w-[180px] h-[300px] hidden md:block",
                  )}
                />
              ))}
            </div>
          ) : null}

          {/* TESTIMONIALS SECTION */}
          {displayTestimonials.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* LEFT: Review Grid */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-8 border-b border-[#C5A367]/20 pb-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#2B2622] font-bold">
                    Client Love
                  </h3>
                  <span className="text-[#C5A367] font-serif text-base md:text-lg flex items-center gap-1 cursor-pointer hover:underline underline-offset-4">
                    View All <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {displayTestimonials.map((t) => (
                    <div
                      key={t._id}
                      className="flex gap-4 items-start group testimonial-card"
                    >
                      <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full overflow-hidden border border-[#C5A367]/30 group-hover:border-[#C5A367] transition-colors">
                        {t.clientImage ? (
                          <Image
                            src={t.clientImage}
                            alt={t.clientName}
                            fill
                            className="object-cover"
                            sizes="48px"
                            loading="eager"
                          />
                        ) : (
                          <div className="w-full h-full bg-cream flex items-center justify-center text-[#C5A367] font-bold text-xs">
                            {t.clientName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-sans text-[#2B2622] font-semibold text-sm md:text-base tracking-wide">
                          {t.clientName}
                        </h4>
                        <div className="flex gap-0.5 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3 md:w-3.5 md:h-3.5",
                                i < t.rating
                                  ? "fill-[#C5A367] text-[#C5A367]"
                                  : "text-gray-200",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px]">
                          {t.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Floating Google Card */}
              <div className="relative mt-4 lg:mt-0 lg:pl-10 w-full google-card-wrapper">
                <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-10 transform transition-transform lg:-translate-x-8 lg:-translate-y-4 hover:-translate-y-2 lg:hover:-translate-y-6 duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="font-bold text-gray-800 text-sm">
                        Google
                      </span>
                    </div>
                    <Star className="w-6 h-6 md:w-8 md:h-8 fill-[#C5A367] text-[#C5A367]" />
                  </div>

                  <blockquote className="font-serif text-lg md:text-2xl text-[#2B2622] leading-relaxed italic mb-6">
                    The best salon in Madurai... treated to the finest care and
                    attention.
                  </blockquote>

                  <div className="flex gap-1.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-[#C5A367] text-[#C5A367]"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-wider uppercase">
                    Based on 38 Verified Google Reviews
                  </p>
                </div>

                {/* Decorative Elements behind card */}
                <div className="absolute top-4 right-4 bottom-[-10px] left-4 bg-[#F9F5F0] rounded-2xl -z-10 border border-[#C5A367]/10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
