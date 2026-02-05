"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Types
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  offset?: number; // Added for responsive carousel logic
}

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text?: string;
}

const galleryImages: GalleryImage[] = [
  { id: "1", src: "/assets/gallery/gallery-1.png", alt: "Bridal Portrait 1" },
  { id: "2", src: "/assets/gallery/gallery-2.png", alt: "Hair Styling 2" },
  { id: "3", src: "/assets/gallery/gallery-3.png", alt: "Bridal Centerpiece" },
  { id: "4", src: "/assets/gallery/gallery-4.png.jpg", alt: "Beauty Shot 4" },
  { id: "5", src: "/assets/gallery/gallery-5.png.jpg", alt: "Detail Shot 5" },
  { id: "6", src: "/assets/gallery/gallery-1.png", alt: "Bridal Portrait 6" },
  { id: "7", src: "/assets/gallery/gallery-2.png", alt: "Hair Styling 7" },
  {
    id: "8",
    src: "/assets/gallery/gallery-3.png",
    alt: "Bridal Centerpiece 8",
  },
  { id: "9", src: "/assets/gallery/gallery-4.png.jpg", alt: "Beauty Shot 9" },
];

const leftTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Body Hara",
    avatar: "/assets/gallery/gallery-1.png",
    rating: 5,
    text: "Absolutely stunning work! Felt like a princess.",
  },
  {
    id: "2",
    name: "Body Mara",
    avatar: "/assets/gallery/gallery-2.png",
    rating: 5,
    text: "Detailed and professional service.",
  },
  {
    id: "3",
    name: "Hodho Mumie",
    avatar: "/assets/gallery/gallery-3.png",
    rating: 5,
    text: "Best salon experience in Madurai.",
  },
  {
    id: "4",
    name: "Hody Curla",
    avatar: "/assets/gallery/gallery-4.png.jpg",
    rating: 5,
    text: "Loved the ambiance and care.",
  },
];

export default function GalleryTestimonials() {
  const [activeImageIndex, setActiveImageIndex] = useState(2);

  // Responsive Visible Images Logic
  // We explicitly calculate the list of images to show based on the active index
  // so we can maintain the "Infinite Loop" visual on all screens.
  const visibleImages = useMemo(() => {
    const images = [];
    const total = galleryImages.length;
    // We want 5 images centered on the active index.
    // Offsets: -2, -1, 0, +1, +2
    for (let i = -2; i <= 2; i++) {
      // Handle wrapping correctly for negative numbers
      const index = (activeImageIndex + i + total) % total;
      images.push({ ...galleryImages[index], offset: i });
    }
    return images;
  }, [activeImageIndex]);

  const nextGallery = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  const prevGallery = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden w-full">
      <div className="w-full">
        {/* Full Width Container - No Border */}
        <div className="bg-white relative">
          {/* HEADER: Diamonds & Serif */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 md:gap-6">
              {/* Diamond Accent Left */}
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
              <h2
                className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-center"
                style={{ letterSpacing: "0.05em" }}
              >
                Gallery & Testimonials
              </h2>
              {/* Diamond Accent Right */}
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-[#2B2622] mt-4">
              What Our Clients Say
            </h3>
          </motion.div>

          {/* SPOTLIGHT GALLERY CAROUSEL */}
          <div className="mb-16 md:mb-24 relative w-full">
            <div className="flex justify-center items-center h-[350px] md:h-[450px] relative w-full perspective-1000">
              <AnimatePresence mode="popLayout">
                {visibleImages.map((img) => {
                  const isCenter = img.offset === 0;
                  const isNeighbor = Math.abs(img.offset) === 1;
                  const isOuter = Math.abs(img.offset) === 2;

                  // Responsive Visibility:
                  // Mobile: Only Center visible (or center + tiny slivers) -> Let's show 1 main, hide others or absolute them
                  // Tablet: Center + Neighbors visible
                  // Desktop: All 5 visible

                  // We'll use CSS classes to control visibility per breakpoint
                  let visibilityClass = "flex"; // Default visible
                  if (isOuter) visibilityClass = "hidden lg:flex"; // Hide outer on < lg
                  if (isNeighbor) visibilityClass = "hidden md:flex lg:flex"; // Hide neighbors on < md

                  // Actually, for a smoother mobile experience, showing just 1 is best.
                  // But 'hidden' removes them from flow, breaking 'justify-center'.
                  // We should use absolute positioning for the 'stack' or just flex.

                  // Better approach for this specific design: Flex row with gap, items shrink/grow.
                  // But we want the center LARGE.

                  return (
                    <motion.div
                      key={img.id + "-" + img.offset}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        scale: isCenter ? 1.1 : isNeighbor ? 0.9 : 0.8,
                        opacity: isCenter ? 1 : 0.7,
                        filter: isCenter ? "grayscale(0%)" : "grayscale(40%)",
                        zIndex: isCenter ? 50 : 10,
                        x: 0,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={cn(
                        "relative cursor-pointer rounded-sm overflow-hidden flex-shrink-0 transition-shadow duration-500 mx-1 md:mx-4",
                        isCenter
                          ? "shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-[#C5A367]/30"
                          : "",
                        visibilityClass,
                      )}
                      style={{
                        // Dynamic sizing based on state
                        width: isCenter ? "min(100%, 280px)" : "180px", // Slightly larger center
                        height: isCenter ? "min(450px, 80vw)" : "300px",
                      }}
                      onClick={() => {
                        // Calculate new index based on offset relative to current
                        const newIndex =
                          (activeImageIndex +
                            img.offset +
                            galleryImages.length) %
                          galleryImages.length;
                        setActiveImageIndex(newIndex);
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Nav Arrows - Always visible, customized for mobile touch targets */}
            <button
              onClick={prevGallery}
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#C5A367] shadow-lg text-[#C5A367] hover:bg-[#C5A367] hover:text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextGallery}
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#C5A367] shadow-lg text-[#C5A367] hover:bg-[#C5A367] hover:text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* TESTIMONIALS SECTION - Constrained width for readability */}
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
                {leftTestimonials.map((t) => (
                  <div key={t.id} className="flex gap-4 items-start group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden border border-[#C5A367]/30 group-hover:border-[#C5A367] transition-colors">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-[#2B2622] font-semibold text-sm md:text-base tracking-wide">
                        {t.name}
                      </h4>
                      <div className="flex gap-0.5 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#C5A367] text-[#C5A367]"
                          />
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px]">
                        {t.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Floating Google Card */}
            <div className="relative mt-4 lg:mt-0 lg:pl-10 w-full">
              {/* 3D Floating Effect Card */}
              <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-10 transform transition-transform lg:-translate-x-8 lg:-translate-y-4 hover:-translate-y-2 lg:hover:-translate-y-6 duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {/* Google G Logo */}
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
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
        </div>
      </div>
    </section>
  );
}
