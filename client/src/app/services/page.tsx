"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Global performance defaults
  gsap.defaults({ force3D: true, lazy: false });
}

const TECHNIQUES = [
  {
    number: "I",
    label: "Airbrush Foundation",
    tag: "Signature Technique",
    copy: "An ultra-fine mist of pigment fused directly to the skin — weightless, seamless, and built to survive a twelve-hour ceremony under any light.",
    stat: "14h",
    statLabel: "Average wear time",
    image: "/assets/services/makeup.png",
    align: "left" as const,
  },
  {
    number: "II",
    label: "Gold Facial Ritual",
    tag: "Pre-Bridal Treatment",
    copy: "24K collagen gold leaf pressed into deep-cleansed skin. Luminosity that no highlight powder can replicate — it comes from within.",
    stat: "3×",
    statLabel: "Visible glow improvement",
    image: "/assets/services/facial.png",
    align: "right" as const,
  },
  {
    number: "III",
    label: "Sculptural Hair Draping",
    tag: "Artistry",
    copy: "Hair treated as architecture. Every pin, braid, and drape is load-bearing — designed to stay immaculate from the mandap to the last dance.",
    stat: "0",
    statLabel: "Touch-ups required",
    image: "/assets/services/hair-styling.png",
    align: "left" as const,
  },
];

const TRUST_STATS = [
  { value: "500+", label: "Brides Styled" },
  { value: "8+", label: "Years of Artistry" },
  { value: "100%", label: "Genuine Reviews" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceApi.getServices();
        if (response.success) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useGSAP(
    () => {
      // Header animation
      gsap.from(".craft-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".craft-header",
          start: "top 90%",
        },
      });

      // Services Grid entrance
      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
        },
      });

      // Technique rows animation
      const rows = gsap.utils.toArray(".technique-row") as HTMLElement[];
      rows.forEach((row) => {
        const text = row.querySelector(".technique-text");
        const img = row.querySelector(".technique-image img");

        if (text) {
          gsap.from(text, {
            opacity: 0,
            x: row.classList.contains("md:[&>*:first-child]:order-2")
              ? 50
              : -50,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (img) {
          gsap.from(img, {
            scale: 1.15,
            opacity: 0,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Trust stats animation
      gsap.from(".trust-stat", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".trust-stats-footer",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-cream smooth-antialiased"
    >
      {/* Hero Banner Section */}
      <HeroBanner
        pageKey="services"
        fallbackTitle="Our Services"
        fallbackSubtitle="Luxury Treatments & Professional Artistry"
      />

      {/* Services Section */}
      <section className="relative px-6 md:px-16 lg:px-28 py-32 bg-[#0a0a0a]">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="mb-20">
            <p className="text-[#C5A367] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              OUR EXPERTISE
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white max-w-2xl leading-tight">
              Crafting Timeless <br />
              <span className="text-white/40 italic">Beauty & Elegance</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#C5A367] animate-spin" />
            </div>
          ) : (
            /* 4-Column Grid */
            <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="service-card group relative h-[500px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:border-[#C5A367]/50 gpu-accelerated"
                >
                  <Image
                    src={service.image || ""}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-serif text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed max-w-[25ch] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── The Craft Section (Enhanced Premium Presentation) ───────────────────────── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Subtle noise grain for atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-[1600px]">
          {/* Section header */}
          <div className="craft-header px-6 md:px-16 lg:px-28 pt-28 pb-14 border-b border-[#C5A367]/15 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[#C5A367] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                THE CRAFT
              </p>
              <h2 className="text-4xl md:text-6xl font-serif text-white max-w-xl leading-tight">
                Techniques Built for <br className="hidden md:block" />
                <span className="text-white/28 italic">Lasting Beauty</span>
              </h2>
            </div>
            <p className="text-sm text-white/40 max-w-[24ch] leading-relaxed md:text-right">
              Each method is chosen for the bride, not applied by default.
            </p>
          </div>

          {/* Alternating image / text rows */}
          {TECHNIQUES.map((t) => (
            <div
              key={t.number}
              className={`
                technique-row group grid border-b border-[#C5A367]/15 cursor-default
                grid-cols-1 md:grid-cols-2 gpu-accelerated
                ${t.align === "right" ? "md:[&>*:first-child]:order-2" : ""}
              `}
            >
              {/* Image cell */}
              <div className="technique-image relative overflow-hidden min-h-[280px] md:min-h-[380px]">
                <Image
                  src={t.image}
                  alt={t.label}
                  fill
                  className="object-cover opacity-45 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Roman numeral ghost */}
                <span
                  className={`
                    absolute bottom-5 font-serif text-[6rem] leading-none select-none
                    text-[#C5A367]/[0.18] pointer-events-none
                    ${t.align === "right" ? "left-5" : "right-5"}
                  `}
                  aria-hidden="true"
                >
                  {t.number}
                </span>
              </div>

              {/* Text cell */}
              <div className="technique-text flex flex-col justify-center gap-6 px-10 md:px-16 py-14 transition-colors duration-500 group-hover:bg-[#C5A367]/[0.04]">
                <p className="text-[#C5A367] text-[11px] font-bold tracking-[0.28em] uppercase">
                  {t.tag}
                </p>

                <h3 className="font-serif text-3xl md:text-[2.5rem] leading-tight text-white">
                  {t.label}
                </h3>

                {/* Expanding rule */}
                <div className="h-px bg-[#C5A367] w-8 group-hover:w-14 transition-all duration-500" />

                <p className="text-sm text-white/50 leading-relaxed max-w-[38ch]">
                  {t.copy}
                </p>

                {/* Stat */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-serif text-5xl text-[#C5A367] opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    {t.stat}
                  </span>
                  <span className="text-xs text-white/35 tracking-wide uppercase">
                    {t.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Footer strip — trust numbers + CTA */}
          <div className="trust-stats-footer px-6 md:px-16 lg:px-28 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex gap-10 md:gap-14">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="trust-stat">
                  <p className="font-serif text-3xl text-[#C5A367] leading-none">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-white/35 uppercase tracking-widest mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 border border-[#C5A367]/35 hover:border-[#C5A367] text-white/70 hover:text-[#C5A367] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
            >
              Book Your Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
