"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { X, ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ force3D: true, lazy: false });

// Tiny blur placeholder for instant visual feedback
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwYAB10L/j1fKSgAAAAASUVORK5CYII=";

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
}

const ImageModal = ({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // Backdrop fade
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
      );

      // Close button entrance
      gsap.fromTo(
        closeBtnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.2 },
      );

      // Content entrance
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          delay: 0.1,
        },
      );
    },
    { scope: modalRef },
  );

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        closeBtnRef.current,
        { opacity: 0, scale: 0.8, duration: 0.2 },
        "-=0.2",
      )
      .to(modalRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#0a0a0a]/98 backdrop-blur-2xl"
      onClick={handleClose}
    >
      <button
        ref={closeBtnRef}
        className="absolute top-10 right-10 z-110 text-white/50 hover:text-white transition-colors p-4"
        onClick={handleClose}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold mr-4">
          Close
        </span>
        <X size={32} strokeWidth={1} className="inline-block" />
      </button>

      <div
        ref={contentRef}
        className="relative w-full h-full p-6 md:p-20 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh] md:h-[80vh] group">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-12 text-center max-w-2xl">
          <div className="h-px w-16 bg-[#C5A367] mx-auto mb-6" />
          <h3 className="text-white text-3xl md:text-5xl font-serif italic mb-4 tracking-tight">
            {image.label}
          </h3>
          <p className="text-[#C5A367] text-[10px] tracking-[0.5em] uppercase font-bold">
            Signature Transformation
          </p>
        </div>
      </div>
    </div>
  );
};

const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  description = "A curated collection of our finest transformations and artistic expressions.",
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // TITLE ANIMATION
      const title = sectionRef.current.querySelector(".gallery-title");
      if (title) {
        gsap.fromTo(
          title,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 90%",
            },
          },
        );
      }

      // IMAGE PARALLAX
      const items = sectionRef.current.querySelectorAll(".gallery-item");
      items.forEach((item, i) => {
        const img = item.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: (i % 3) * 0.2,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Intro badge fadein
      gsap.from(".gallery-badge", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gallery-badge",
          start: "top 90%",
          once: true,
        },
      });

      // CUSTOM MOUSE FOLLOWER
      const mouseFollower = mouseRef.current;
      if (mouseFollower) {
        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          gsap.to(mouseFollower, {
            x: clientX,
            y: clientY,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-20 md:py-24 overflow-hidden"
    >
      {/* MOUSE FOLLOWER */}
      <div
        ref={mouseRef}
        className="fixed top-0 left-0 w-24 h-24 -ml-12 -mt-12 rounded-full border border-[#C5A367]/30 pointer-events-none z-50 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-difference hidden lg:flex"
      >
        <div className="w-1 h-1 bg-[#C5A367] rounded-full" />
        <span className="absolute text-[8px] tracking-[0.4em] text-[#C5A367] uppercase font-bold opacity-0 transition-opacity duration-300 follower-text">
          View
        </span>
      </div>

      {/* LUXURY BACKGROUND TEXTURE */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/marble.png')] bg-cover mix-blend-overlay grayscale invert" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* ABSTRACT DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] border border-[#C5A367]/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-[5%] left-[-10%] w-[1000px] h-[1000px] border border-[#C5A367]/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-20">
        {/* UPPER TITLE: MINIMALIST & BOLD */}
        <div className="mb-22 md:mb-27">
          <div className="gallery-badge section-header">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-px bg-[#C5A367]" />
              <p className="text-[#C5A367] text-[10px] font-bold tracking-[0.8em] uppercase">
                Curated Exhibition . 26
              </p>
            </div>

            <h2 className="gallery-title text-7xl md:text-[10rem] lg:text-[14rem] font-serif text-white leading-[0.8] tracking-tighter opacity-0 translate-y-20 transition-all">
              Visual{" "}
              <span className="text-[#C5A367] italic font-light   font-serif">
                Artistry
              </span>
            </h2>
          </div>
        </div>

        {/* GALLERY GRID: ARCHITECTURAL ARCHE STYLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-22 md:gap-x-12 lg:gap-x-24">
          {images.map((image, idx) => {
            // Editorial layout offsets
            const offsets = [
              "lg:transform lg:translate-y-0",
              "lg:transform lg:translate-y-48",
              "lg:transform lg:translate-y-24",
              "lg:transform lg:translate-y-0",
              "lg:transform lg:translate-y-24",
              "lg:transform lg:translate-y-48",
            ];

            return (
              <div
                key={idx}
                className={cn(
                  "gallery-item group relative cursor-none",
                  offsets[idx % offsets.length],
                )}
                onClick={() => setSelectedImage(image)}
                onMouseEnter={() => {
                  if (mouseRef.current) {
                    gsap.to(mouseRef.current, {
                      scale: 1.5,
                      borderColor: "#C5A367",
                      background: "rgba(197, 163, 103, 0.1)",
                      duration: 0.1,
                    });
                    gsap.to(mouseRef.current.querySelector(".follower-text"), {
                      opacity: 1,
                      duration: 0.1,
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (mouseRef.current) {
                    gsap.to(mouseRef.current, {
                      scale: 1,
                      borderColor: "rgba(197, 163, 103, 0.3)",
                      background: "transparent",
                      duration: 0.1,
                    });
                    gsap.to(mouseRef.current.querySelector(".follower-text"), {
                      opacity: 0,
                      duration: 0.1,
                    });
                  }
                }}
              >
                {/* ARCH MASK CONTAINER */}
                <div className="relative aspect-4/5 overflow-hidden rounded-t-[200px] bg-[#1a1a1a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
                  {/* IMAGE WITH PARALLAX */}
                  <div className="absolute inset-x-0 -top-20 -bottom-20 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx < 3}
                      loading={idx < 3 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    {/* Artistic Overlay */}
                    <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute inset-0 border-20 border-[#0a0a0a] rounded-t-[200px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* HOVER TITLE OVERLAY (Mobile/Tablet fallback or subtle desktop hint) */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12 lg:hidden">
                    <h3 className="text-white text-3xl font-serif italic mb-2">
                      {image.label}
                    </h3>
                  </div>
                </div>

                {/* LABEL: REFINED SERIF for Desktop Layout */}
                <div className="mt-10 overflow-hidden">
                  <h3 className="text-white text-4xl font-serif italic tracking-tight group-hover:text-[#C5A367] transition-colors duration-500">
                    {image.label}
                  </h3>
                </div>

                {/* BACKGROUND DECORATIVE SHAPE */}
                <div className="absolute -inset-8 border border-[#C5A367]/0 group-hover:border-[#C5A367]/5 rounded-t-[220px] -z-10 transition-all duration-700 pointer-events-none transform group-hover:scale-[1.02]" />
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;
