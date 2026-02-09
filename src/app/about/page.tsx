"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wifi, FlaskConical, Flower, Star, Quote } from "lucide-react";
import { LuxuryBrandMarquee } from "@/components/ui/luxury-brand-marquee";
import { EditorialTestimonial } from "@/components/ui/editorial-testimonial";

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
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-[#D4AF37]/30 pb-24 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src="/assets/about/bridal-hero.jpg"
          alt="Luxury Bridal Studio"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-28 hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-[#FDFBF7] leading-[1.05] drop-shadow-2xl">
              Our Story of <br />
              <span className="italic text-[#E5C775] font-light">
                Beauty &
              </span>{" "}
              <br />
              Dedication.
            </h1>
          </motion.div>
        </div>
      </section>

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
                <motion.div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/about/service-1.jpg"
                    alt="Service 1"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </motion.div>
                <motion.div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
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

                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full py-4 px-12 shadow-2xl text-white">
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

      {/* Journey Section (Kept as it was useful) */}
      <section className="py-24 px-6 md:px-16 lg:px-28">
        <div className="max-w-[1600px] mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-[#B8860B] font-serif text-xl tracking-widest uppercase">
              The Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1C1C1C]">
              Your Path to Radiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Consultation",
                desc: "We begin with a personalized session to understand your vision, skin type, and preferences.",
                img: "/assets/about/service-1.jpg",
              },
              {
                title: "Trials & Prep",
                desc: "Experience your look before the big day. We refine every detail to ensure absolute perfection.",
                img: "/assets/about/service-2.jpg",
              },
              {
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
                className="group space-y-6"
              >
                {/* Image Card */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-[#D4AF37]/10">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                  <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center font-serif text-xl text-[#B8860B]">
                    {idx + 1}
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <h3 className="text-3xl font-serif text-[#2C2C2C] group-hover:text-[#B8860B] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#666] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <button className="px-10 py-4 bg-[#B8860B] hover:bg-[#D4AF37] text-white font-serif tracking-widest uppercase text-sm rounded-full transition-colors duration-300 shadow-xl">
              Book Appointment
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
