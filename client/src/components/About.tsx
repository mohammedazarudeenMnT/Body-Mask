"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Left Column Animation
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Right Column Animation
      gsap.from(rightColRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: rightColRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-[#Fdfbf7]"
    >
      {/* Background Texture/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/about/bg/about=section-bg.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ">
          {/* Left Column: Images */}
          <div ref={leftColRef} className="relative order-last lg:order-first">
            {/* Main Image Frame */}
            <div className="relative z-10 border border-[#C5A367]/30 p-4 bg-white/50 backdrop-blur-sm shadow-xl rounded-sm rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm">
                <Image
                  src="/assets/about/about section-img.jpg"
                  alt="About Body Mask Studio"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#C5A367]/10 -z-10 rounded-full blur-2xl" />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#D4A5A5]/10 -z-10 rounded-full blur-2xl" />
          </div>

          {/* Right Column: Text Content */}
          <div ref={rightColRef} className="space-y-8 text-center lg:text-left">
            {/* Section Header */}
            <div>
              <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                Redefining <span className="text-[#C5A367] italic">Bridal</span>{" "}
                <br />
                Elegance
              </h2>
            </div>

            {/* Divider */}
            <div className="w-20 h-[2px] bg-[#C5A367] mx-auto lg:mx-0" />

            {/* Description */}
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p className="text-lg">
                At{" "}
                <strong className="text-[#1a1a1a] font-medium">
                  Body Mask Boutique & Bridal Studio
                </strong>
                , located in Prasanna Colony, Madurai, we are a leading name in
                the beauty industry. We cater to all your grooming needs with a
                touch of luxury and care.
              </p>
              <p>
                With a dedicated team of skilled professionals, we offer
                top-notch beauty services ranging from hair care and skin
                treatments to complete bridal makeovers. Whether you're a
                regular client or a first-time visitor, we ensure you look and
                feel your absolute best.
              </p>
            </div>

            {/* Signature / Button */}
            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link href="/about">
                {" "}
                <button className="group relative px-8 py-3 bg-[#1a1a1a] text-white font-medium tracking-wide overflow-hidden rounded-sm">
                  <span className="relative z-10 flex items-center gap-2">
                    Read More{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-[#C5A367] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>
              </Link>
              {/* Founder Name / Signature mockup */}
              <div className="text-right">
                <span className="block font-serif text-xl text-[#C5A367] italic">
                  Lakshmi Priya
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  Founder & Lead Artist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
