"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Defined exactly as per visual preference order
const servicesList = [
  {
    id: "hair",
    title: "Hair Styling",
    description:
      "Modern cuts, coloring, and bridal styling specialized for you.",
    image: "/assets/services/hair-styling.png",
  },
  {
    id: "skin",
    title: "Advanced Skin Treatments",
    description:
      "Better secrets skin wonder insane ethmo past ease ne versorless.",
    image: "/assets/services/skin-treatements.png",
  },
  {
    id: "nail",
    title: "Nail Art",
    description:
      "Richness sense at tierdon low kr hassing okrosete poor abenag weather.",
    image: "/assets/services/nail-art.png",
  },
  {
    id: "rating", // Special ID for the Rating Card
    title: "Why Choose Us",
    type: "rating",
  },
  {
    id: "manicure",
    title: "Premium Manicure",
    description: "Theinaurestoss at firts comm nuone secnre res ab srosstas.",
    image: "/assets/services/premium-manicure.png",
  },
  {
    id: "pedicure",
    title: "Anti Tan Pedicure",
    description:
      "Ferfon vecsalos ntomo notis a docesto ansocers stoms me tintioseat.",
    image: "/assets/services/pedicure.png",
  },
  {
    id: "facial",
    title: "Profanceal Facial",
    description:
      "Koyote vvorist po inlais ksrhon teodit dsemcpus min vesiseos.",
    image: "/assets/services/facial.png",
  },
  {
    id: "bridal",
    title: "Complete Bridal Makeup Packages",
    description:
      "Look radiant on your special day with our professional bridal makeup.",
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
            Exclusy Potedomfcn
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
                    Sciences
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
