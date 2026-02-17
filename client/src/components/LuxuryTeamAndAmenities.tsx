"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, FlaskConical, Flower, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LuxuryTeamAndAmenities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      teamItemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          });
        }
      });
    },
    { scope: sectionRef },
  );

  const team = [
    {
      name: "Sr. Hair Stylist",
      img: "/assets/about/team-1.jpg",
      bio: "Expert in luxury bridal hairstyles",
    },
    {
      name: "Master Makeup Artist",
      img: "/assets/about/team-2.jpg",
      bio: "Defining elegance with every stroke",
    },
    {
      name: "Skin Care Expert",
      img: "/assets/about/team-3.jpg",
      bio: "Certified clinical aesthetician",
    },
  ];

  const amenities = [
    {
      label: "High-Speed WiFi",
      icon: <Wifi className="w-6 h-6" />,
      desc: "Stay connected in luxury",
    },
    {
      label: "Skin Consultation",
      icon: <FlaskConical className="w-6 h-6" />,
      desc: "Personalized clinical care",
    },
    {
      label: "Organic Products",
      icon: <Flower className="w-6 h-6" />,
      desc: "Purest botanical essence",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-28 bg-white border-y border-[#B8860B]/10"
    >
      <div className="max-w-[1600px] mx-auto space-y-24">
        {/* Team Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-serif text-[#1C1C1C]">
              The Artisans
            </h3>
            <p className="text-[#4A4A4A] max-w-lg font-light">
              Meet the professionals who dedicate their craft to your beauty.
              Each member brings years of expertise and a refined aesthetic
              vision.
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-24 bg-[#B8860B]/30" />
            <Sparkles className="w-5 h-5 text-[#B8860B]" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {team.map((member, idx) => (
            <div
              key={idx}
              ref={(el) => {
                teamItemsRef.current[idx] = el;
              }}
              className="group space-y-6"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#B8860B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-serif text-[#1C1C1C]">
                  {member.name}
                </h4>
                <p className="text-[#6B6B6B] text-sm uppercase tracking-widest">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Section */}
        <div className="pt-24 border-t border-[#B8860B]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="p-4 bg-[#FDFBF7] rounded-full border border-[#B8860B]/20 text-[#B8860B]">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h5 className="text-lg font-semibold text-[#1C1C1C]">
                    {item.label}
                  </h5>
                  <p className="text-[#6B6B6B] text-sm font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
