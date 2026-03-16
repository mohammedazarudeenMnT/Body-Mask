"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookAppointmentButton from "@/components/BookAppointmentButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "The Vision",
    subtitle: "Personalized Consultation",
    desc: "We begin by understanding your unique style, skin tone, and bridal dreams. Our experts curate a look that is uniquely yours.",
    image: "/assets/about/service-1.jpg",
  },
  {
    number: "02",
    title: "The Preparation",
    subtitle: "Trials & Perfection",
    desc: "Experience your transformation before the big day. We refine every detail, from hair texture to highlight intensity.",
    image: "/assets/about/service-2.jpg",
  },
  {
    number: "03",
    title: "The Celebration",
    subtitle: "Your Radiant Moment",
    desc: "On your special day, we bring the vision to life in our serene studio sanctuary, ensuring you feel like royalty.",
    image: "/assets/about/studio-interior.jpg",
  },
];

export function LuxuryJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Progress line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }

      // Step animations
      const stepItems = gsap.utils.toArray(".journey-step") as HTMLElement[];
      stepItems.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-16 lg:px-28 bg-[#FDFBF7] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-4 text-[#B8860B] uppercase tracking-[0.3em] text-xs font-bold">
            <span className="h-px w-8 bg-[#B8860B]" />
            Your Experience
            <span className="h-px w-8 bg-[#B8860B]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-[#1C1C1C]">
            The Journey <span className="italic">to</span> Radiance
          </h2>
        </div>

        {/* Mission & Vision - Integrated Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 border-b border-[#B8860B]/10 pb-20">
          <div className="space-y-6">
            <h3 className="text-4xl font-serif text-[#1C1C1C] flex items-center gap-4">
              <span className="w-12 h-px bg-[#B8860B]/30" />
              Mission
              <span className="w-12 h-px bg-[#B8860B]/30" />
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light text-xl italic max-w-xl mx-auto">
              "Our mission at Body Mask Bridal Studio is to enhance every bride’s natural beauty with professional makeup and skincare services. We aim to provide high-quality bridal artistry, personalized beauty care, and a relaxing experience so every bride feels confident, radiant, and special on her big day."
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-4xl font-serif text-[#1C1C1C] flex items-center gap-4">
              <span className="w-12 h-px bg-[#B8860B]/30" />
              Vision
              <span className="w-12 h-px bg-[#B8860B]/30" />
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light text-xl italic max-w-xl mx-auto">
              "Our vision is to become a trusted and leading bridal beauty studio known for creativity, quality, and customer satisfaction. We strive to make every bride look and feel her best while creating beautiful memories for their most important moments."
            </p>
          </div>
        </div>


        {/* Timeline Content */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#B8860B]/20 hidden md:block">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-[#B8860B] origin-top scale-y-0"
            />
          </div>

          <div className="space-y-40">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`journey-step flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-1/2 space-y-6 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <span className="text-6xl font-serif text-[#B8860B]/10 block font-bold">
                    {step.number}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-serif text-[#1C1C1C]">
                      {step.title}
                    </h3>
                    <p className="text-[#B8860B] font-medium tracking-wide uppercase text-sm">
                      {step.subtitle}
                    </p>
                  </div>
                  <p className="text-[#6B6B6B] leading-relaxed font-light text-lg max-w-lg mx-auto md:mx-0 ms-auto">
                    {step.desc}
                  </p>
                </div>

                {/* Vertical Center Dot (Desktop Only) */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-[#FDFBF7] border-2 border-[#B8860B] hidden md:block" />

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-4/3 rounded-sm overflow-hidden shadow-2xl group">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 border-15 border-white/20 m-4 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-40 text-center">
          <BookAppointmentButton
            className="px-12 py-5 bg-[#1C1C1C] text-white font-serif italic text-xl hover:bg-[#B8860B] transition-colors duration-500 rounded-sm shadow-xl group"
          >
            Start Your Journey
            <span className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </BookAppointmentButton>
        </div>
      </div>
    </section>
  );
}
