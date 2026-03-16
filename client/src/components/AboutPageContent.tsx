import Image from "next/image";
import { Wifi, FlaskConical, Flower, Star } from "lucide-react";
import { LuxuryBrandMarquee } from "@/components/ui/luxury-brand-marquee";

import { LuxuryJourney } from "@/components/LuxuryJourney";
import HeroBanner from "@/components/HeroBanner";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

export default function AboutPageContent() {
  return (
    <RevealWrapper>
      {/* 1. HERO SECTION */}
      <HeroBanner
        pageKey="about"
        fallbackTitle="About Us"
        fallbackSubtitle="Luxury Bridal Studio & Professional Makeup"
      />

      {/* 2. FEATURED IN MARQUEE */}
      <div className="relative z-10 -mt-10 mb-10">
        <LuxuryBrandMarquee />
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <section className="px-6 md:px-16 lg:px-28 py-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* LEFT COLUMN (lg:span-7) */}
          <div className="lg:col-span-7 space-y-16">
            {/* Founder's Vision */}
            <div className="fade-section space-y-8">
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
                  Welcome to Body Mask Bridal Studio.
                </p>
                <p>
                  I am Raadha, the founder of Body Mask Bridal Studio. With a deep passion for beauty and bridal artistry, I started this studio to help every bride feel confident, elegant, and beautiful on her special day. Our goal is to enhance natural beauty and create a flawless bridal look that reflects each bride’s personality and style.
                </p>
                <p>
                  At Body Mask Bridal Studio, we specialize in professional bridal makeup, skincare treatments, and beauty services designed especially for weddings and special occasions. We use high-quality products and modern techniques to ensure long-lasting, stunning results.
                </p>
                <p>
                  Every bride is unique, and we believe that your makeup should highlight your individuality while making you feel comfortable and radiant. From pre-bridal care to the final bridal look, we are committed to giving you a memorable beauty experience.
                </p>
              </div>

              <div className="pt-4 mt-2">
                <p className="text-xl font-serif text-[#1C1C1C] leading-snug">
                  Let Body Mask Bridal Studio be a part of your beautiful journey.
                </p>
              </div>

            </div>



          </div>

          {/* RIGHT COLUMN (lg:span-5) - Gallery + Ratings */}
          <div className="lg:col-span-5 space-y-10 flex flex-col h-full pt-4">
            {/* Founder Portrait Section */}
            <div className="fade-section space-y-6">
              <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#C5A367]/20 group">
                <Image
                  src="/assets/about/DSS_2581_Work.jpg.jpeg"
                  alt="Founder of Body Mask Bridal Studio"

                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />

                {/* Elegant Overlay Detail */}
                <div className="absolute inset-0 border-[12px] border-white/10 m-4 rounded-[1.5rem] pointer-events-none"></div>

                {/* Name Badge - Redesigned for High Contrast */}
                <div className="absolute bottom-8 left-8 right-8 bg-[#1a1a1a]/95 backdrop-blur-md border border-[#C5A367]/40 p-6 rounded-2xl shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <p className="text-[#C5A367] text-xs tracking-[0.2em] uppercase mb-1.5 font-bold">
                    Lead Artist & Founder
                  </p>
                  <p className="text-white text-3xl font-serif italic">
                    Mrs. Raadha


                  </p>
                </div>

              </div>

              {/* Subtle quote or detail below image */}
              <p className="text-center text-gray-400 font-serif italic text-lg pt-4">
                "Artistry meets Soul"
              </p>
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

      {/* 6. LUXURY JOURNEY (Redesigned Timeline) */}

      <LuxuryJourney />
    </RevealWrapper>
  );
}
