"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wifi, FlaskConical, Flower, Star } from "lucide-react";
import { LuxuryBrandMarquee } from "@/components/ui/luxury-brand-marquee";
import { EditorialTestimonial } from "@/components/ui/editorial-testimonial";
import HeroBanner from "@/components/HeroBanner";

/**
 * STRICT PIXEL-PERFECT "ABOUT US" PAGE
 * Matches layout structure of about-page-ui.jpg:
 * - Hero with Text Overlay
 * - Left Col: Vision -> Team -> Amenities
 * - Right Col: Gallery -> Ratings
 */

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37]/30 ">
      {/* 1. HERO SECTION */}
      <HeroBanner
        imageSrc="/assets/about/bridal-hero.jpg"
        imageAlt="Luxury Bridal Studio"
      />

      {/* 2. FEATURED IN MARQUEE (New Magic MCP Section) */}
      <div className="relative z-10 -mt-10 mb-10">
        <LuxuryBrandMarquee />
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <section className="px-6 md:px-16 lg:px-28 py-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* LEFT COLUMN (lg:span-7) */}
          <div className="lg:col-span-7 space-y-16">
            {/* Founder's Vision */}
            <motion.div {...fadeIn} className="space-y-8">
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
            </motion.div>

            {/* Team & Amenities */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="space-y-12 pt-4"
            >
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
            </motion.div>
          </div>

          {/* RIGHT COLUMN (lg:span-5) - Gallery + Ratings */}
          <div className="lg:col-span-5 space-y-10 flex flex-col h-full pt-4">
            {/* Gallery Grid */}
            <div className="space-y-6">
              {/* Top Row Images */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/about/service-1.jpg"
                    alt="Service 1"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </motion.div>
                <motion.div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/about/service-2.jpg"
                    alt="Service 2"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </motion.div>
              </div>

              {/* Main Interior Image */}
              <motion.div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/assets/about/studio-interior.jpg"
                  alt="Interior"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
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

      {/* 4. MAGIC MCP SECTIONS (Testimonials & Journey) */}

      {/* Editorial Testimonial Slider */}
      <EditorialTestimonial />

      {/* Journey Section - Redesigned */}
      <section className="relative py-24 px-6 md:px-16 lg:px-28 overflow-hidden bg-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A367]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A5A5]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1600px] mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
              <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                The Journey
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C1C1C]">
              Your Path to <span className="italic text-[#C5A367]">Radiance</span>
            </h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Experience a personalized journey designed to make your special day unforgettable
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                title: "Consultation",
                desc: "We begin with a personalized session to understand your vision, skin type, and preferences.",
                img: "/assets/about/service-1.jpg",
              },
              {
                number: "02",
                title: "Trials & Prep",
                desc: "Experience your look before the big day. We refine every detail to ensure absolute perfection.",
                img: "/assets/about/trial-and-prep.png",
              },
              {
                number: "03",
                title: "The Big Day",
                desc: "Relax and let us work our magic. We ensure you step out looking and feeling like royalty.",
                img: "/assets/about/studio-interior.jpg",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative"
              >
                {/* Connecting Line (Desktop Only)
                {idx < 2 && (
                  <div className="hidden md:block absolute top-32 left-full w-full h-[2px] bg-linear-to-r from-[#C5A367] to-transparent -z-10" />
                )} */}

                {/* Card */}
                <div className="relative space-y-6">
                  {/* Image Frame */}
                  <div className="relative border border-[#C5A367]/30 p-3 bg-white shadow-xl rounded-sm hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Step Number Badge */}
                      <div className="absolute top-4 left-4 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <span className="font-serif text-2xl font-bold text-[#C5A367]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 px-2 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] group-hover:text-[#C5A367] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-8"
          >
            <button className="group relative px-10 py-4 bg-[#1a1a1a] text-white font-medium tracking-wide overflow-hidden rounded-sm shadow-xl">
              <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold">
                Book Your Appointment
              </span>
              <div className="absolute inset-0 bg-[#C5A367] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
