"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import { ArrowRight } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

interface ServicesPageContentProps {
  initialServices?: Service[];
}

// Registry of SVG Icons for Rendering
const SVG_ICONS: Record<string, React.ReactNode> = {
  FacialMassage: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 11v2a5 5 0 0 1-10 0v-2" />
      <path d="M10 12h-1M14 12h1" />
      <path d="M12 14v1M11 16h2" />
      <path d="M7 9a5 5 0 0 1 10 0" />
      <path d="M12 4a3.5 3.5 0 0 0-3.5 3.5M12 4a3.5 3.5 0 0 1 3.5 3.5" />
      <path d="M5 8l2 3v3h1.5M19 8l-2 3v3h-1.5" />
      <path d="M3 10l2 3v3M21 10l-2 3v3" />
      <path d="M12 18v2M7 22c1-1.5 2.5-2 5-2s4 .5 5 2" />
    </svg>
  ),
  Lotus: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c0 0 5-3 5-9c0-3-5-9-5-9c0 0-5 6-5 9c0 6 5 9 5 9z" />
      <path d="M12 22c0 0 10-3 10-9c0-2-5-5-5-5c0 0 0 5-5 14z" />
      <path d="M12 22c0 0-10-3-10-9c0-2 5-5 5-5c0 0 0 5 5 14z" />
    </svg>
  ),
  HotStone: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="18" rx="8" ry="4" />
      <ellipse cx="12" cy="13" rx="6" ry="3" />
      <ellipse cx="12" cy="9" rx="4" ry="2" />
      <path d="M7 18v-2s0-2 5-2" />
      <path d="M9 13v-1s0-1 3-1" />
      <path d="M17 18v-2s0-2-5-2" />
      <path d="M15 13v-1s0-1-3-1" />
    </svg>
  ),
  Mirror: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M9 22h6" />
      <path d="M10 7c.5-1 1.5-1.5 2.5-1.5" />
    </svg>
  ),
  Comb: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M4 12v6" />
      <path d="M6 12v4" />
      <path d="M8 12v6" />
      <path d="M10 12v4" />
      <path d="M12 12v6" />
      <path d="M14 12v4" />
      <path d="M16 12v6" />
      <path d="M18 12v4" />
      <path d="M20 12v6" />
    </svg>
  ),
  NailPolish: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 12h10v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8z" />
      <path d="M9 12V4h6v8" />
      <path d="M9 2h6v2H9z" />
      <path d="M10 16h4" />
    </svg>
  ),
  Candle: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11h10v11H7z" />
      <path d="M12 11V8" />
      <path d="M12 8c-1.5-1.5-1.5-4 0-5c1.5 1.5 1.5 4 0 5z" />
      <path d="M9 16h6" />
    </svg>
  ),
  Perfume: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="12" rx="2" />
      <path d="M9 10V6h6v4" />
      <path d="M10 6V4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9 16h6" />
    </svg>
  ),
  MakeUpBrush: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h6v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V12z" />
      <path d="M9 12c0-3 1-6 2-8s2 5 2 8" />
      <path d="M13 12c0-3 .5-6 1-8c.5 2 1 5 1 8" />
      <path d="M8 12h8" />
    </svg>
  ),
  HairDryer: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 14H6c-2 0-3-1-3-3s1-3 3-3h12" />
      <path d="M15 14v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-5" />
      <path d="M18 8V6h4v8h-4v-2" />
      <line x1="7" y1="11" x2="11" y2="11" />
    </svg>
  ),
  Towel: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
      <path d="M4 8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M4 12h16" />
      <path d="M4 16h16" />
    </svg>
  ),
  Sparkles: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Scissors: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" x2="8.12" y1="4" y2="15.88" />
      <line x1="14.47" x2="20" y1="14.48" y2="20" />
      <line x1="8.12" x2="12" y1="8.12" y2="12" />
    </svg>
  ),
  Clock: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  User: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Camera: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Heart: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Star: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Palette: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
};

const DynamicIcon = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  const selectedIcon =
    name && SVG_ICONS[name] ? SVG_ICONS[name] : SVG_ICONS["Sparkles"];
  return <div className={className}>{selectedIcon}</div>;
};

export default function ServicesPageContent({
  initialServices = [],
}: ServicesPageContentProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(initialServices.length === 0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialServices.length > 0) return;
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
      if (loading) return;

      ScrollTrigger.refresh();

      // Header animation
      gsap.fromTo(
        ".section-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%",
            once: true,
          },
        },
      );

      // Alternating rows animation
      const rows = gsap.utils.toArray(".service-row") as HTMLElement[];
      rows.forEach((row, i) => {
        const img = row.querySelector(".row-image");
        const content = row.querySelector(".row-content");

        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.5,
              ease: "expo.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                once: true,
              },
            },
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                once: true,
              },
            },
          );
        }
      });

      // Craft section animations
      gsap.fromTo(
        ".craft-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".craft-header",
            start: "top 90%",
            once: true,
          },
        },
      );

      const craftRows = gsap.utils.toArray(".technique-row") as HTMLElement[];
      craftRows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    },
    { scope: containerRef, dependencies: [loading] },
  );

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen selection:bg-[#C5A367] selection:text-white"
    >
      {/* ── Services Section (Pixel Perfect Capsule Layout) ────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-28 py-20 md:py-22 flex flex-col items-center">
        <div className="mx-auto max-w-[1400px] w-full">
          {/* Header */}
          <div className="section-header text-center mb-22">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C5A367]" />
              <p className="text-[#C5A367] text-[11px] font-bold tracking-[0.4em] uppercase">
                CURATED COLLECTIONS
              </p>
              <span className="w-8 h-px bg-[#C5A367]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#330000] leading-tight">
              The Art of <br />
              <span className="italic font-light opacity-80">
                Bridal Perfection
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader size="xl" />
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-20 md:space-y-32">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className={`service-row group relative flex flex-col md:flex-row overflow-hidden rounded-[32px] sm:rounded-[64px] md:rounded-[100px] lg:rounded-[200px] bg-[#F9F6F3] transition-all duration-700 hover:shadow-xl hover:shadow-black/5 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Part */}
                  <div className="row-image relative w-full md:w-1/2 aspect-4/3 sm:aspect-video md:aspect-auto md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
                    <Image
                      src={service.image || ""}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text Part */}
                  <div className="row-content w-full md:w-1/2 p-10 sm:p-14 md:p-16 lg:p-24 flex flex-col justify-center items-start text-left space-y-6 sm:space-y-8">
                    {/* Placeholder for Icon from dashboard */}
                    <div className="text-[#C5A367] opacity-90">
                      <DynamicIcon
                        name={service.content?.features?.[0]?.icon}
                        className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#330000] leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#777] font-sans leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                      {service.description}
                    </p>

                    <Link
                      href={`/services/${service.slug}`}
                      className="relative overflow-hidden group/btn px-8 sm:px-10 md:px-12 py-3 md:py-4 bg-[#212121] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center justify-center min-w-[140px] md:min-w-[180px]"
                    >
                      <span className="relative z-10 font-sans tracking-[0.3em]">
                        READ MORE
                      </span>
                      {/* The Gold Accent Sidebar - Moved to Left per screenshot */}
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] md:w-[6px] bg-linear-to-b from-[#C5A367] to-[#8B7344] transition-all duration-300 group-hover/btn:w-full group-hover/btn:opacity-10" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── The Craft Section (Refined for Consistency) ──────────────────── */}
      {/* <section className="relative bg-[#330000] px-6 md:px-16 lg:px-28 py-32 overflow-hidden rounded-t-[100px] md:rounded-t-[200px] -mt-20 z-10">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: `url("/assets/noise.png")` }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="craft-header text-center mb-24">
            <p className="text-[#C5A367] text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
              OUR PROCESS
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Crafting{" "}
              <span className="italic text-[#C5A367]/80">Timeless</span>{" "}
              Artistry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {TECHNIQUES.map((t) => (
              <div key={t.number} className="technique-row group space-y-8">
                <div className="relative aspect-square overflow-hidden rounded-full border border-white/5 p-4 group-hover:border-[#C5A367]/30 transition-colors duration-500">
                  <div className="relative w-full h-full overflow-hidden rounded-full">
                    <Image
                      src={t.image}
                      alt={t.label}
                      fill
                      className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 font-serif text-7xl text-[#C5A367]/10 group-hover:text-[#C5A367]/20 transition-colors duration-500">
                    {t.number}
                  </span>
                </div>

                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-serif text-white tracking-wide">
                    {t.label}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-[28ch] mx-auto">
                    {t.copy}
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <span className="font-serif text-3xl text-[#C5A367]">
                      {t.stat}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                      {t.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex gap-12">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <p className="font-serif text-4xl text-[#C5A367] mb-1">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="px-12 py-5 bg-[#C5A367] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-[#330000] transition-all duration-500 shadow-xl shadow-black/20"
            >
              Reserve Your Date
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
