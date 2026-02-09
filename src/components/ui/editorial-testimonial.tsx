"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Body Mask transformed my wedding day into a fairytale. The attention to detail was impeccable.",
    author: "Priya Sharma",
    role: "Bride",
    image: "/assets/about/team-1.jpg", // Using existing team image as placeholder
  },
  {
    id: 2,
    quote:
      "The ambiance is pure luxury. I've never felt more pampered in my life. Truly a royal experience.",
    author: "Anitha Raj",
    role: "Tech Executive",
    image: "/assets/about/team-2.jpg",
  },
  {
    id: 3,
    quote:
      "From the consultation to the final look, everything was flawless. Highly recommended.",
    author: "Meera Krishnan",
    role: "Fashion Designer",
    image: "/assets/about/team-3.jpg",
  },
];

export function EditorialTestimonial() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 md:px-16 lg:px-28 bg-[#FFFBF2] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Large Index & Quote */}
          <div className="space-y-12 relative z-10">
            <motion.span
              className="text-[120px] md:text-[180px] font-serif leading-none text-[#D4AF37]/10 absolute -top-20 -left-10 select-none"
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              0{active + 1}
            </motion.span>

            <div className="relative">
              <Quote className="w-12 h-12 text-[#B8860B] mb-8 opacity-50" />
              <div className="h-[200px] md:h-[240px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-serif text-[#1C1C1C] leading-snug"
                  >
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group"
                >
                  <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group"
                >
                  <ArrowRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="h-[1px] flex-1 bg-[#D4AF37]/20" />
            </div>
          </div>

          {/* Right: Modern Image Card */}
          <div className="relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-auto rounded-full overflow-hidden border border-[#D4AF37]/20 p-2">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="relative w-full h-full bg-gray-100"
                  >
                    <Image
                      src={testimonials[active].image}
                      alt={testimonials[active].author}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Info */}
                <div className="absolute bottom-10 left-0 right-0 text-center">
                  <div className="inline-block bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-lg">
                    <h4 className="font-serif text-xl text-[#1C1C1C]">
                      {testimonials[active].author}
                    </h4>
                    <p className="text-sm text-[#B8860B] uppercase tracking-widest">
                      {testimonials[active].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
