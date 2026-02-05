"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Defined exactly as per visual preference order
const servicesList = [
  {
    id: "hair",
    title: "Hair Care",
    description: "Professional styling and treatments for a fresh, new look.",
    image: "/assets/services/hair-styling.png",
  },
  {
    id: "skin",
    title: "Skin Care",
    description: "Advanced facial treatments to rejuvenate your glow.",
    image: "/assets/services/skin-treatements.png",
  },
  {
    id: "nail",
    title: "Nails",
    description: "Premium Manicure and Anti-Tan Pedicure services.",
    image: "/assets/services/nail-art.png",
  },
  {
    id: "rating", // Special ID for the Rating Card
    title: "Why Choose Us",
    type: "rating",
  },
  {
    id: "makup",
    title: "Makeup Services",
    description: "Professional makeup for all occasions.",
    image: "/assets/services/premium-manicure.png",
  },
  {
    id: "pedicure",
    title: "Anti Tan Pedicure",
    description: "Rejuvenate your feet with our anti-tan pedicure treatments.",
    image: "/assets/services/pedicure.png",
  },
  {
    id: "removal",
    title: "Hair Removal",
    description: "Professional waxing services for smooth skin.",
    image: "/assets/services/facial.png", // Placeholder reuse
  },
  {
    id: "bridal",
    title: "Bridal Services",
    description: "Complete bridal makeup packages for your special day.",
    image: "/assets/services/bridal-makup.png",
  },
];

const Services = () => {
  return (
    <section className="relative px-4 md:px-8 py-20 bg-cream">
      <div className="mx-auto max-w-[1600px]">
        {/* Header - Centered as per new layout structure suggestion, or keep previous left alignment? 
            The image has header hidden/top. We keep our generic header or minimal.
        */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-gold-600 uppercase mb-3">
            SERVICES{" "}
          </p>
          <h2 className="text-5xl font-serif text-gray-900">
            Body Mask Bridal Studio
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => {
            // Special Render for Rating Card
            if (service.type === "rating") {
              return (
                <div
                  key={service.id}
                  className="flex flex-col items-center justify-start h-full pt-4"
                >
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                    CUSTOMER SATISFACTION
                  </p>
                  <h3 className="font-serif text-xl text-gray-800 mb-6">
                    WHY CHOOSE US
                  </h3>

                  <div className="relative w-full aspect-square max-w-[280px]">
                    <Image
                      src="/assets/rating/rating.png"
                      alt="4.9/5.0 Star Rating"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              );
            }

            // Standard Service Card
            return (
              <div
                key={service.id}
                className="group relative bg-[#F5F0EB] p-3 transition-transform hover:-translate-y-1 duration-300"
              >
                {/* Double Border / Frame Effect Container */}
                <div className="h-full w-full border border-[#DCCA9C] p-6 flex flex-col items-center text-center">
                  {/* Image/Icon Area */}
                  <div className="relative w-full h-40 mb-6 mt-4">
                    <Image
                      src={service.image || ""}
                      alt={service.title}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[#666666] max-w-[20ch]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
