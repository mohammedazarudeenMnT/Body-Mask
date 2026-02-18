"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Fallback list if API fails
const fallbackServicesList = [
  {
    _id: "hair",
    title: "Hair Care",
    description: "Professional styling and treatments for a fresh, new look.",
    image: "/assets/services/hair-styling.png",
    slug: "hair-care",
  },
  {
    _id: "skin",
    title: "Skin Care",
    description: "Advanced facial treatments to rejuvenate your glow.",
    image: "/assets/services/facial.png",
    slug: "skin-care",
  },
  {
    _id: "nail",
    title: "Nails",
    description: "Premium Manicure and Anti-Tan Pedicure services.",
    image: "/assets/services/nail-art.png",
    slug: "nails",
  },
  {
    _id: "makup",
    title: "Makeup Services",
    description: "Professional makeup for all occasions.",
    image: "/assets/services/makeup.png",
    slug: "makeup-services",
  },
  {
    _id: "pedicure",
    title: "Anti Tan Pedicure",
    description: "Rejuvenate your feet with our anti-tan pedicure treatments.",
    image: "/assets/services/pedicure.png",
    slug: "anti-tan-pedicure",
  },
  {
    _id: "removal",
    title: "Hair Removal",
    description: "Professional waxing services for smooth skin.",
    image: "/assets/services/waxing.png",
    slug: "hair-removal",
  },
  {
    _id: "bridal",
    title: "Bridal Services",
    description: "Complete bridal makeup packages for your special day.",
    image: "/assets/services/bridal-makup.png",
    slug: "bridal-services",
  },
] as unknown as Service[];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current || !scrollRef.current) return;

      const scrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      if (amountToScroll > 0) {
        gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Individual cards animation
      gsap.utils.toArray(".service-card").forEach((card: any) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: amountToScroll > 0 ? undefined : undefined,
            start: "left right",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getServices();
        if (res.success && res.data) {
          setServices(res.data);
        } else {
          setServices(fallbackServicesList);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
        setServices(fallbackServicesList);
      }
    };
    fetchServices();
  }, []);

  const servicesList = services.length > 0 ? services : fallbackServicesList;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/patterns/texture.png')] bg-repeat" />
      </div>

      <div className="min-h-screen flex flex-col justify-center py-20">
        {/* Header - Fixed or Scrolling? We'll make it part of the flow */}
        <div className="px-6 md:px-16 mb-12">
          <p className="text-[#C5A367] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            EXPERTISE & ARTISTRY
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white max-w-4xl leading-tight">
            Elevating Bridal Beauty <br />
            <span className="text-white/40 italic">to an Art Form</span>
          </h2>
        </div>

        {/* Horizontal Scroll Content */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-8 px-6 md:px-16 pb-12 w-max items-stretch"
        >
          {servicesList.map((service, index) => (
            <Link
              href={`/services/${service.slug || service._id}`}
              key={service._id}
              className="service-card group shrink-0 w-[280px] md:w-[350px] lg:w-[450px] relative overflow-hidden rounded-2xl block"
            >
              <div className="aspect-4/5 relative w-full overflow-hidden">
                <Image
                  src={service.image || "/assets/services/default.png"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, (max-width: 1200px) 450px, 600px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#C5A367] text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    SERVICE {index + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Aesthetic Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#C5A367]/30 to-transparent" />
    </section>
  );
};

export default Services;
