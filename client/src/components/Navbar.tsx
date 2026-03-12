"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useDynamicLogo } from "@/hooks/useDynamicLogo";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";

const Navbar = () => {
  const pathname = usePathname();
  const logoUrl = useDynamicLogo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
  const [services, setServices] = useState<Partial<Service>[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/Professional-Makeup-Artist-Madurai" },
    { name: "SERVICES", href: "/services" },
    { name: "OFFERS", href: "/Bridal-Makeup-Artist-Madurai" },
    { name: "GALLERY", href: "/Luxury-Bridal-Salon-Madurai" },
    { name: "VIDEOS", href: "/videos" },
    { name: "CONTACT", href: "/Best-Makeup-Artist-in-Madurai" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getServices();
        if (res.success && res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices([
            { _id: "hair", title: "Hair Care", slug: "hair-care" },
            { _id: "skin", title: "Skin Care", slug: "skin-care" },
            { _id: "nail", title: "Nails", slug: "nails" },
            { _id: "makup", title: "Makeup Services", slug: "makeup-services" },
            { _id: "pedicure", title: "Anti Tan Pedicure", slug: "anti-tan-pedicure" },
            { _id: "removal", title: "Hair Removal", slug: "hair-removal" },
            { _id: "bridal", title: "Bridal Services", slug: "bridal-services" },
          ]);
        }
      } catch (error) {
        setServices([
          { _id: "hair", title: "Hair Care", slug: "hair-care" },
          { _id: "skin", title: "Skin Care", slug: "skin-care" },
          { _id: "bridal", title: "Bridal Services", slug: "bridal-services" },
        ]);
      }
    };
    fetchServices();
  }, []);

  useGSAP({ scope: containerRef });

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      gsap.fromTo(
        ".mobile-link",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Premium Parlour Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#C5A367] text-[9px] md:text-[11px] font-sans font-medium tracking-[0.3em] uppercase py-2 text-center px-4 w-full flex justify-center items-center gap-4 relative z-20 shadow-md">
        <span className="hidden md:inline-block w-12 h-px bg-[#C5A367]/40"></span>
        <span>Experience Luxury at Body Mask Bridal Studio</span>
        <span className="hidden md:inline-block w-12 h-px bg-[#C5A367]/40"></span>
      </div>

      <nav
        ref={containerRef}
        className="relative w-full bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border-b border-[#C5A367]/20 transition-all duration-300"
      >
        {/* Marble Texture Background Overlay - Softer for premium look */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: "url('/assets/marble.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Container - Flex Layout for Responsiveness */}
        <div className="relative z-10 w-full h-auto md:h-24 max-w-[1920px] mx-auto flex items-center justify-between pr-4 md:pr-8 lg:pr-12">
          {/* Logo Section with Dark Maroon Background */}
          <div className="relative flex items-center justify-center bg-[#2B0000] self-stretch px-6 py-4 md:py-0 md:px-10 lg:px-14 shadow-[8px_0_20px_-5px_rgba(0,0,0,0.4)] rounded-br-[2.5rem] md:rounded-br-[4rem] border-b-2 border-r-2 border-[#C5A367] overflow-visible">
            {/* Extension for ultra-wide screens to fill the left void */}
            <div className="absolute top-0 right-[99%] w-[50vw] h-full bg-[#2B0000] border-b-2 border-[#C5A367]"></div>

            {/* Elegant parlour inner gold border detail */}
            <div className="absolute inset-1.5 md:inset-2.5 border border-[#C5A367]/30 rounded-br-[2rem] md:rounded-br-[3.5rem] pointer-events-none"></div>

            {/* Subtle gold accent light on the right edge */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-[#C5A367] to-transparent opacity-80 blur-[1px]"></div>

            <Link href="/" className="relative h-14 w-36 md:h-20 md:w-52 shrink-0 z-10 transition-transform duration-700 hover:scale-105">
              <Image
                src={logoUrl}
                alt="Body Mask Bridal Studio"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(197,163,103,0.3)]"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 144px, 208px"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name} className={link.name === "SERVICES" ? "relative group" : ""}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-xs lg:text-sm font-sans font-medium tracking-[0.15em] transition-colors duration-300 relative group-hover:text-[#C5A367] ${isActive && link.name !== "SERVICES"
                          ? "text-[#C5A367] font-bold"
                          : "text-gray-800 hover:text-[#C5A367]"
                        }`}
                    >
                      {link.name}
                      {link.name === "SERVICES" && (
                        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180 text-[#C5A367]" />
                      )}
                      <span
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#C5A367] transition-all duration-300 ${isActive && link.name !== "SERVICES" ? "w-1/2" : "w-0 group-hover:w-1/2"
                          }`}
                      ></span>
                    </Link>

                    {/* Desktop Dropdown for Services - Parlour Style */}
                    {link.name === "SERVICES" && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-[36px] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 w-64 z-50">
                        <div className="bg-white/95 backdrop-blur-xl border border-[#C5A367]/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-b-xl py-3 flex flex-col relative before:absolute before:-top-[8px] before:left-1/2 before:-translate-x-1/2 before:border-[4px] before:border-transparent before:border-b-[#C5A367]/50 mt-[-1px]">
                          <div className="px-5 py-2 mb-2 border-b border-[#C5A367]/20 flex items-center justify-center">
                            <span className="text-[9px] text-[#C5A367] tracking-[0.3em] uppercase font-bold text-center">Our Treatments</span>
                          </div>
                          {services.map(service => (
                            <Link
                              key={service._id}
                              href={`/${service.slug || service._id}`}
                              className="group/item px-5 py-3 text-[11px] lg:text-xs font-sans font-semibold tracking-[0.1em] text-gray-700 hover:text-[#C5A367] hover:bg-[#C5A367]/5 flex items-center justify-between transition-all duration-300 uppercase border-b border-gray-100/50 last:border-none"
                            >
                              <span>{service.title}</span>
                              <span className="text-[#C5A367] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/Best-Makeup-Artist-in-Madurai"
              className="group relative inline-flex items-center justify-center px-7 py-2.5 text-xs lg:text-sm font-sans font-semibold tracking-[0.2em] text-[#2B0000] uppercase border-none overflow-hidden transition-all duration-500 shrink-0 hover:shadow-[0_0_20px_rgba(197,163,103,0.4)] rounded-sm bg-gradient-to-r from-[#C5A367] via-[#E2C792] to-[#C5A367] bg-[length:200%_auto] hover:bg-right"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1A1A1A]">
                Book Appointment
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden opacity-0"
          >
            <ul className="flex flex-col gap-4 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name} className="mobile-link">
                    {link.name === "SERVICES" ? (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href={link.href}
                            className={`text-sm font-sans font-medium tracking-[0.15em] transition-colors duration-300 block py-1 ${isActive
                                ? "text-[#C5A367] font-bold"
                                : "text-gray-800 hover:text-[#C5A367]"
                              }`}
                            onClick={(e) => {
                              if (isServicesMobileOpen) {
                                gsap.to(menuRef.current, {
                                  height: 0,
                                  opacity: 0,
                                  duration: 0.3,
                                  onComplete: () => setIsMenuOpen(false),
                                });
                              }
                            }}
                          >
                            {link.name}
                          </Link>
                          <button
                            onClick={() => setIsServicesMobileOpen(!isServicesMobileOpen)}
                            className="p-1 focus:outline-none text-gray-800"
                          >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isServicesMobileOpen ? "rotate-180 text-[#C5A367]" : ""}`} />
                          </button>
                        </div>

                        {/* Mobile Dropdown Sub-menu */}
                        <div className={`overflow-hidden transition-all duration-300 ${isServicesMobileOpen ? "max-h-96 opacity-100 mt-2 mb-2" : "max-h-0 opacity-0"}`}>
                          <ul className="flex flex-col gap-2 pl-4 border-l-2 border-[#C5A367]/30 py-1">
                            {services.map((service, idx) => (
                              <li key={service._id} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-300 ${isServicesMobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                                <Link
                                  href={`/${service.slug || service._id}`}
                                  className="text-xs font-sans font-semibold tracking-[0.1em] text-gray-600 hover:text-[#C5A367] block py-1.5 uppercase"
                                  onClick={() => {
                                    gsap.to(menuRef.current, {
                                      height: 0,
                                      opacity: 0,
                                      duration: 0.3,
                                      onComplete: () => setIsMenuOpen(false),
                                    });
                                  }}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-sm font-sans font-medium tracking-[0.15em] transition-colors duration-300 block py-1 ${isActive
                            ? "text-[#C5A367] font-bold"
                            : "text-gray-800 hover:text-[#C5A367]"
                          }`}
                        onClick={() => {
                          gsap.to(menuRef.current, {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => setIsMenuOpen(false),
                          });
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="pt-4 mt-2 border-t border-[#C5A367]/20 mobile-link">
                <Link
                  href="/Best-Makeup-Artist-in-Madurai"
                  className="block group relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[0_0_15px_rgba(197,163,103,0.3)] bg-gradient-to-r from-[#C5A367] via-[#E2C792] to-[#C5A367] bg-[length:200%_auto] hover:bg-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative z-10 w-full py-3.5 text-center text-[11px] font-sans font-bold tracking-[0.2em] text-[#2B0000] uppercase transition-colors duration-500">
                    Book Appointment
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Bottom Divider Line */}
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A367]/60 to-transparent shadow-[0_1px_5px_rgba(197,163,103,0.2)]"></div>
      </nav>
    </header>
  );
};

export default Navbar;
