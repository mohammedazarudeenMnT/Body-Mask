"use client";

import { Star, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#111111] text-white pt-24 pb-16 w-full mt-24 overflow-visible">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-[#BF953F] font-serif text-3xl md:text-4xl tracking-[0.2em] uppercase mb-20 text-center border-b border-[#BF953F]/20 pb-6 w-full max-w-md">
          Why Choose Us
        </h2>

        {/* 4-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full items-start relative pb-12">
          {/* Column 1: Ratings */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 pt-2">
            <div className="flex space-x-1.5 mb-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#BF953F] fill-[#BF953F]"
                />
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-serif text-2xl text-white tracking-wide">
                Top Rated:
              </p>
              <p className="text-gray-300 text-sm leading-relaxed max-w-[220px]">
                We are proud of our{" "}
                <span className="text-[#BF953F] font-bold">
                  4.9 star rating
                </span>{" "}
                from{" "}
                <span className="text-white font-semibold">
                  36+ Google reviews
                </span>
                .
              </p>
            </div>
          </div>

          {/* Column 2: Amenities */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
            <h3 className="font-serif text-[#FBF5B7] tracking-wider opacity-70 uppercase text-xs font-bold mb-1 h-5 flex items-end">
              Modern Amenities
            </h3>
            <h4 className="font-serif text-[#BF953F] text-2xl">
              Complimentary WiFi
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] pt-1">
              Relax in our comfortable seating areas with refreshments while you
              wait for your premium service.
            </p>
          </div>

          {/* Column 3: Scheduling */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
            <h3 className="font-serif text-[#FBF5B7] tracking-wider opacity-70 uppercase text-xs font-bold mb-1 h-5 flex items-end">
              Flexible Scheduling
            </h3>
            <h4 className="font-serif text-[#BF953F] text-2xl">
              Open 7 days a week
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] pt-1">
              We accommodate early morning and late evening slots to fit your
              busy lifestyle.
            </p>
          </div>

          {/* Column 4: WhatsApp Button (Overlapping) */}
          <div className="relative h-10 lg:h-auto flex justify-center lg:justify-end mt-8 lg:mt-0">
            <button className="absolute -top-32 lg:-top-44 right-auto lg:-right-4 w-44 h-44 lg:w-52 lg:h-52 rounded-full bg-[#D4A5A5] text-white flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(212,165,165,0.4)] hover:-translate-y-2 transition-all duration-500 group z-20 p-6 text-center border-[6px] border-[#111111]">
              <span className="font-serif text-xl lg:text-3xl leading-none mb-2 drop-shadow-md">
                Book via
              </span>
              <span className="font-serif text-xl lg:text-3xl italic font-light drop-shadow-md">
                WhatsApp
              </span>
              <MessageCircle className="w-6 h-6 mt-3 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-md" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex space-x-3 mt-20 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
