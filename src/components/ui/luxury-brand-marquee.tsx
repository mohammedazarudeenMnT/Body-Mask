"use client";

import { motion } from "framer-motion";

export function LuxuryBrandMarquee() {
  const brands = [
    "VOGUE",
    "HARPER'S BAZAAR",
    "ELLE",
    "COSMOPOLITAN",
    "BRIDES TODAY",
    "FEMINA",
    "GRAZIA",
    "VOGUE",
    "HARPER'S BAZAAR",
    "ELLE",
    "COSMOPOLITAN",
    "BRIDES TODAY",
    "FEMINA",
    "GRAZIA",
  ];

  return (
    <section className="py-10 border-y border-[#D4AF37]/10 bg-[#FDFBF7] overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-16 md:gap-32 inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {brands.map((brand, idx) => (
          <span
            key={idx}
            className="text-2xl md:text-3xl font-serif text-[#D4AF37]/60 tracking-[0.2em] uppercase whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
