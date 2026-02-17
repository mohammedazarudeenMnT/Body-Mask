"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "A MASTERPIECE OF ELEGANCE.",
    subQuote:
      "Body Mask transformed my wedding vision into a living reality. Their artistic precision in high-end bridal grooming is truly unparalleled in South India.",
    author: "PRIYA SHARMA",
    role: "International Bride",
    image: "/assets/about/team-1.jpg",
  },
  {
    id: 2,
    quote: "PURE SYMPHONY OF LUXURY.",
    subQuote:
      "The attention to every micro-detail, from the skin prep to the final silk touch, made me feel like royalty. It's not just a service; it's a bespoke experience.",
    author: "ANITHA RAJ",
    role: "Creative Director",
    image: "/assets/about/team-2.jpg",
  },
  {
    id: 3,
    quote: "THE BRIDAL GOLD STANDARD.",
    subQuote:
      "They don't just apply makeup; they craft an identity. My look was timeless, sophisticated, and breathed luxury in every single frame captured.",
    author: "MEERA KRISHNAN",
    role: "Fashion Editorialist",
    image: "/assets/about/team-3.jpg",
  },
];

export function EditorialTestimonial() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subQuoteRef = useRef<HTMLParagraphElement>(null);
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateIn = contextSafe((onComplete?: () => void) => {
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      imageRef.current,
      { clipPath: "inset(0 100% 0 0)", scale: 1.2, filter: "brightness(0.5)" },
      {
        clipPath: "inset(0 0% 0 0)",
        scale: 1,
        filter: "brightness(1)",
        duration: 1.4,
        ease: "expo.inOut",
      },
    )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8",
      )
      .fromTo(
        subQuoteRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        authorInfoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      );
  });

  const transitionTo = contextSafe((index: number) => {
    if (isAnimating.current || index === active) return;
    isAnimating.current = true;

    const tlOut = gsap.timeline({
      onComplete: () => {
        setActive(index);
        // We use a small delay to let React state update before animating back in
        setTimeout(() => animateIn(), 10);
      },
    });

    tlOut
      .to([titleRef.current, subQuoteRef.current, authorInfoRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.in",
      })
      .to(
        imageRef.current,
        {
          clipPath: "inset(0 0 0 100%)",
          duration: 0.6,
          ease: "expo.in",
        },
        "-=0.2",
      );
  });

  const next = () => transitionTo((active + 1) % testimonials.length);
  const prev = () =>
    transitionTo((active - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-16 lg:px-28 bg-[#FDFBF7] overflow-hidden min-h-[900px] flex items-center"
    >
      <div className="max-w-[1500px] mx-auto w-full">
        {/* Header Label */}
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <div className="h-[1px] w-24 bg-[#BF953F]/40" />
          <span className="text-[#BF953F] text-xs font-bold tracking-[0.5em] uppercase">
            Client Memoirs
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* CONTENT - LEFT */}
          <div className="order-2 lg:order-1 relative">
            {/* Big Decorative Quote Icon */}
            <Quote className="absolute -top-16 -left-12 w-24 h-24 text-[#BF953F]/10 stroke-[1px]" />

            <div className="space-y-12 max-w-xl relative z-10">
              <h2
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1C1C1C] leading-[1.1]"
              >
                {testimonials[active].quote}
              </h2>

              <div className="space-y-8">
                <p
                  ref={subQuoteRef}
                  className="text-xl md:text-2xl font-light text-[#4A4A4A] leading-relaxed italic border-l-2 border-[#BF953F]/30 pl-8"
                >
                  &ldquo;{testimonials[active].subQuote}&rdquo;
                </p>

                <div
                  ref={authorInfoRef}
                  className="flex items-center gap-8 group"
                >
                  <div className="flex flex-col">
                    <span className="text-2xl font-serif text-[#1C1C1C] tracking-wide">
                      {testimonials[active].author}
                    </span>
                    <span className="text-[#BF953F] text-xs font-bold tracking-widest uppercase mt-1">
                      {testimonials[active].role}
                    </span>
                  </div>

                  {/* Decorative Line that extends on hover */}
                  <div className="h-[1px] flex-1 bg-[#BF953F]/20 group-hover:bg-[#BF953F]/50 transition-colors duration-500" />
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-10 pt-10">
                <div className="flex gap-4">
                  <button
                    onClick={prev}
                    className="w-14 h-14 border border-[#BF953F]/20 rounded-full flex items-center justify-center hover:bg-[#BF953F] hover:text-white transition-all duration-300 group"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={next}
                    className="w-14 h-14 border border-[#BF953F]/20 rounded-full flex items-center justify-center hover:bg-[#BF953F] hover:text-white transition-all duration-300 group"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-serif italic text-2xl text-[#1C1C1C]">
                    0{active + 1}
                  </span>
                  <div className="w-12 h-[1px] bg-[#BF953F]/30" />
                  <span className="text-sm font-medium text-[#BF953F]/60 tracking-widest uppercase">
                    / 0{testimonials.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL - RIGHT */}
          <div className="order-1 lg:order-2 relative group">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden shadow-[30px_30px_0px_0px_#F5F0E6]"
            >
              <Image
                src={testimonials[active].image}
                alt={testimonials[active].author}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1C1C1C]/40 via-transparent to-transparent" />

              {/* Corner Accents */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/40" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/40" />
            </div>

            {/* Decorative Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-[#BF953F] text-white p-12 hidden xl:block shadow-2xl z-20">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-[#FCF6BA] rounded-full"
                    />
                  ))}
                </div>
                <p className="text-xl font-serif italic tracking-wide">
                  Luxury <br /> Redefined
                </p>
              </div>
            </div>

            {/* Background Shape */}
            <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-[#BF953F]/5 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
