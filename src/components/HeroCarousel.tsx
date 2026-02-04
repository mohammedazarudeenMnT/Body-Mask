"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Using the same images as before
const images = [
  { id: 1, src: "/assets/nails-manicure.png", alt: "Nail Art & Care" },
  { id: 2, src: "/assets/skuncare-and-facials.png", alt: "Radiant Skincare" },
  { id: 3, src: "/assets/hair-care-styling.png", alt: "Expert Hair Styling" },
  { id: 4, src: "/assets/body-mask.png", alt: "Holistic Body Masks" },
];

const HeroCarousel = () => {
  return (
    <section className="relative w-full   lg:h-screen overflow-hidden bg-white group pt-24 md:pt-0">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="w-full  lg:h-screen"
      >
        <CarouselContent className="h-full ml-0">
          {images.map((img) => (
            <CarouselItem
              key={img.id}
              className="pl-0 h-full relative  lg:min-h-full"
            >
              <div className="relative w-full h-full">
                <img
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows - Responsive Positioning */}
        <CarouselPrevious
          className="left-2 sm:left-4 md:left-8 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-white/30 bg-black/10 text-white hover:bg-white/20 hover:text-white hover:border-white transition-all disabled:opacity-0"
          variant="outline"
        />

        <CarouselNext
          className="right-2 sm:right-4 md:right-8 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-white/30 bg-black/10 text-white hover:bg-white/20 hover:text-white hover:border-white transition-all disabled:opacity-0"
          variant="outline"
        />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
