"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, CheckCircle, ArrowRight, Quote, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import BookAppointmentButton from "@/components/BookAppointmentButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ force3D: true, lazy: false });
}

// Tiny blur placeholder for instant visual feedback
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwYAB10L/j1fKSgAAAAASUVORK5CYII=";

interface ServiceData {
  title: string;
  subtitle: string;
  heroImage: string;
  category: string;
  description: {
    intro: string;
    main: string;
    quote: string;
    quoteAuthor: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  gallery?: string[];
}

interface ServiceDetailClientProps {
  service: ServiceData;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Left column content stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(".animate-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        force3D: true,
      });

      gsap.from(mediaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: mediaRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(quoteRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(ctaRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)",
        force3D: true,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* Description Section */}
      <section className="relative w-full py-20 md:py-24 overflow-hidden bg-[#Fdfbf7]">
        {/* Background Texture - Refined Marble */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/marble.png"
            alt="Background Texture"
            fill
            className="object-cover opacity-40 mix-blend-multiply"
            sizes="100vw"
            loading="eager"
          />
        </div>

        {/* Decorative Lighting Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-bl from-[#C5A367]/10 via-transparent to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-[#D4A5A5]/10 via-transparent to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left Column - Text Content (Span 7) */}
            <div ref={leftColRef} className="lg:col-span-7 space-y-12">
              <div className="animate-item space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#C5A367]" />
                  <span className="text-[#C5A367] text-xs font-black tracking-[0.4em] uppercase">
                    {service.category}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1a1a] leading-[1.1] tracking-tighter">
                  {service.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-4">
                      {i === service.title.split(" ").length - 1 ? (
                        <span className="text-[#C5A367] italic font-light">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </h2>
                <div className="w-24 h-px bg-[#C5A367]/30" />
              </div>

              {/* Description Body */}
              <div className="animate-item space-y-8">
                <div 
                  className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-[#C5A367] first-letter:leading-none ql-editor !p-0"
                  dangerouslySetInnerHTML={{ __html: service.description.intro }}
                />

                <div 
                  className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl ql-editor !p-0"
                  dangerouslySetInnerHTML={{ __html: service.description.main }}
                />

              </div>

              {/* Features Grid */}
              <div className="animate-item pt-8 space-y-10">
                <div className="flex items-center gap-6">
                  <h3 className="font-serif text-2xl text-[#1a1a1a]">
                    Signature Features
                  </h3>
                  <div className="flex-1 h-px bg-[#C5A367]/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group cursor-default hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-6 h-6 rounded-full border border-[#C5A367]/30 flex items-center justify-center group-hover:bg-[#C5A367] group-hover:border-[#C5A367] transition-all duration-300">
                        <CheckCircle className="w-3 h-3 text-[#C5A367] group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-semibold text-gray-900 tracking-wide uppercase transition-colors group-hover:text-[#C5A367]">
                          {feature.title}
                        </span>
                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="animate-item pt-8 space-y-10">
                  <div className="flex items-center gap-6">
                    <h3 className="font-serif text-2xl text-[#1a1a1a]">
                      Exclusive Benefits
                    </h3>
                    <div className="flex-1 h-px bg-[#C5A367]/10" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {service.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="p-6 bg-white border border-[#C5A367]/10 rounded-2xl shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-300"
                      >
                        <h4 className="text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">
                          {benefit.title}
                        </h4>
                        <div 
                          className="text-xs text-gray-600 font-light leading-relaxed ql-editor !p-0"
                          dangerouslySetInnerHTML={{ __html: benefit.description }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Media (Span 5) */}
            <div
              ref={mediaRef}
              className="lg:col-span-5 relative lg:sticky lg:top-32"
            >
              {/* Luxury Editorial Stack of 'Other' Images */}
              <div className="relative h-[600px] w-full group">
                {/* Primary 'Other' Image */}
                <div className="absolute inset-0 z-10 border border-white/50 shadow-2xl rounded-sm overflow-hidden transform -rotate-2 hover:rotate-0 hover:translate-y-[-10px] transition-all duration-700">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                    <p className="text-[8px] tracking-[0.4em] uppercase text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {service.title}
                    </p>
                  </div>
                </div>

                {/* Secondary 'Other' Image - Overlapping Bottom Left */}

                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 border border-[#C5A367]/10 rounded-full flex items-center justify-center p-12 -z-10 group-hover:scale-110 transition-transform duration-1000">
                  <div className="w-full h-full border border-[#C5A367]/5 rounded-full animate-spin [animation-duration:20s]" />
                </div>
              </div>

              {/* Glassmorphic Quote Card */}
              <div
                ref={quoteRef}
                className="relative -mt-24 ml-8 lg:ml-12 -mr-8 z-20 bg-white/70 backdrop-blur-xl p-10 lg:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-[#C5A367]/10"
              >
                <Quote className="absolute top-8 left-8 text-[#C5A367]/20 w-12 h-12" />
                <blockquote className="relative z-10 font-serif text-2xl md:text-3xl text-[#1a1a1a] leading-tight italic mb-8">
                  {service.description.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#C5A367]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A367] font-black">
                      {service.description.quoteAuthor}
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-1">
                      Lead Visionary Artist
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <div
                ref={ctaRef}
                className="mt-16 flex justify-center lg:justify-start"
              >
                <BookAppointmentButton
                  className="group relative flex items-center gap-6 bg-[#1a1a1a] text-white px-10 py-5 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-[#C5A367]/20 active:scale-95 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.3em] uppercase">
                    <Calendar className="w-4 h-4" />
                    Reserve Your Session
                  </span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-[#C5A367] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                </BookAppointmentButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Portfolio Section - Luxury Editorial Style */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#C5A367]" />
                  <span className="text-[#C5A367] text-[10px] font-bold tracking-[0.4em] uppercase">
                    Artist Portfolio
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a]">
                  Service <span className="text-[#C5A367] italic">Gallery</span>
                </h2>
              </div>
              <p className="text-gray-500 text-sm font-light max-w-md leading-relaxed">
                A visual journey through our signature transformations for this
                exclusive service. Every look is a unique masterpiece.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {service.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-700 hover:shadow-2xl hover:shadow-[#C5A367]/20",
                    idx === 0 || idx === 3 ? "md:row-span-2 aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${service.title} Gallery ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <Plus className="text-white w-8 h-8 font-light" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
