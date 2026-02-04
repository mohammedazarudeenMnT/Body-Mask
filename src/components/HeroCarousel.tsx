"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/assets/nails-manicure.png",
  "/assets/skuncare-and-facials.png",
  "/assets/hair-care-styling.png",
  "/assets/body-mask.png",
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Slides */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          {/* Subtle gradient for arrow visibility, kept minimal as requested */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      ))}

      {/* Carousel Controls */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-between items-center px-4 md:px-8">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[2px] transition-all duration-300 ${
              index === currentSlide
                ? "bg-white opacity-100"
                : "bg-white opacity-30 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
