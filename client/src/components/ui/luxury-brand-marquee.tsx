"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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

  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: marqueeRef },
  );

  return (
    <section className="py-10 border-y border-[#D4AF37]/10 bg-[#FDFBF7] overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#FDFBF7] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#FDFBF7] to-transparent z-10" />

      <div
        ref={marqueeRef}
        className="flex items-center gap-16 md:gap-32 whitespace-nowrap"
      >
        {brands.map((brand, idx) => (
          <span
            key={idx}
            className="text-2xl md:text-3xl font-serif text-[#D4AF37]/60 tracking-[0.2em] uppercase whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
