"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, FlaskConical, Flower, Star } from "lucide-react";
import { LuxuryBrandMarquee } from "@/components/ui/luxury-brand-marquee";
import { EditorialTestimonial } from "@/components/ui/editorial-testimonial";
import { LuxuryJourney } from "@/components/LuxuryJourney";
import HeroBanner from "@/components/HeroBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade in sections
      const sections = gsap.utils.toArray(".fade-section") as HTMLElement[];
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* 1. HERO SECTION */}
      <HeroBanner
        pageKey="about"
        fallbackTitle="About Us"
        fallbackSubtitle="Luxury Bridal Studio & Professional Makeup"
      />

      {/* 2. FEATURED IN MARQUEE */}
      <div className="relative z-10 -mt-10 mb-10">
        <LuxuryBrandMarquee />
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <section className="px-6 md:px-16 lg:px-28 py-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* LEFT COLUMN (lg:span-7) */}
          <div className="lg:col-span-7 space-y-16">
            {/* Founder's Vision */}
            <div className="fade-section space-y-8">
              <div className="space-y-3">
                <span className="text-[#B8860B] font-serif text-2xl font-bold tracking-wide block">
                  Founder&apos;s Quote
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C1C1C] leading-[1.15]">
                  Redefining Elegance <br /> in Madurai
                </h2>
              </div>

              <div className="space-y-6 text-[#4A4A4A] text-lg leading-relaxed font-light max-w-2xl">
                <p>
                  Posuere a reawino a or top-notch beauty and grooming,
                  chusttince the road to where checkuonol adcaowd eposcopie,
                  Madurai.
                </p>
                <p>
                  Founded with a passion for timeless beauty, Body Mask has
                  evolved into Madurai&apos;s premier destination for luxury
                  grooming.
                </p>
              </div>

              <div className="pt-8 mt-4">
                <blockquote className="text-3xl md:text-4xl font-serif italic text-[#2C2C2C] leading-snug">
                  &ldquo;Every bride deserves to feel royal,&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[2px] w-8 bg-[#1C1C1C]" />
                  <span className="text-lg font-serif italic text-[#1C1C1C] font-medium">
                    Founder
                  </span>
                </div>
              </div>
            </div>

            {/* Team & Amenities */}
            <div className="fade-section space-y-12 pt-4">
              <h3 className="text-4xl font-serif text-[#463C2F]">
                Team & Amenities
              </h3>

              {/* Team Circles */}
              <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-xl">
                {[
                  { name: "Hair Stylist", img: "/assets/about/team-1.jpg" },
                  { name: "Makeup Artist", img: "/assets/about/team-2.jpg" },
                  {
                    name: "Skilled Professionals",
                    img: "/assets/about/team-3.jpg",
                  },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-[#D4AF37]/40 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#4A4A4A]">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amenities Icons */}
              <div className="grid grid-cols-3 gap-8 md:gap-12 pt-4 max-w-xl">
                {[
                  {
                    label: "Free WiFi",
                    icon: <Wifi className="w-8 h-8 text-[#B8860B]" />,
                  },
                  {
                    label: "Skin Professional",
                    icon: <FlaskConical className="w-8 h-8 text-[#B8860B]" />,
                  },
                  {
                    label: "Skin Clinic",
                    icon: <Flower className="w-8 h-8 text-[#B8860B]" />,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center space-y-3"
                  >
                    <span className="block text-[#B8860B]">{item.icon}</span>
                    <span className="text-sm font-medium text-[#6B6B6B]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (lg:span-5) - Gallery + Ratings */}
          <div className="lg:col-span-5 space-y-10 flex flex-col h-full pt-4">
            {/* Gallery Grid */}
            <div className="space-y-6">
              {/* Top Row Images */}
              <div className="grid grid-cols-2 gap-6">
                <div className="fade-section relative aspect-4/3 rounded-3xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/about/service-1.jpg"
                    alt="Service 1"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="fade-section relative aspect-4/3 rounded-3xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/about/service-2.jpg"
                    alt="Service 2"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>

              {/* Main Interior Image */}
              <div className="fade-section relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/assets/about/studio-interior.jpg"
                  alt="Interior"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* Ratings Pill */}
            <div className="flex justify-end pt-8">
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-current" />
                  ))}
                </div>

                <div className="bg-linear-to-r from-[#D4AF37] to-[#B8860B] rounded-full py-4 px-12 shadow-2xl text-white">
                  <span className="font-bold text-3xl tracking-wide">
                    4.99{" "}
                    <span className="text-sm font-normal opacity-90 uppercase ml-2 pl-3 border-l border-white/40">
                      ratings
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL TESTIMONIALS */}
      <EditorialTestimonial />

      {/* 6. LUXURY JOURNEY (Redesigned Timeline) */}
      <LuxuryJourney />
    </div>
  );
}
