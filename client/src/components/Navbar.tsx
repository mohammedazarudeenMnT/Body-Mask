"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useDynamicLogo } from "@/hooks/useDynamicLogo";

const Navbar = () => {
  const pathname = usePathname();
  const logoUrl = useDynamicLogo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "OFFERS", href: "/offers" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT", href: "/contact" },
    { name: "DASHBOARD", href: "/dashboard/leads" },
  ];

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
    <nav
      ref={containerRef}
      className="fixed top-0 w-full z-50 bg-white shadow-sm transition-all duration-300"
    >
      {/* Marble Texture Background Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/assets/marble.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Container - Flex Layout for Responsiveness */}
      <div className="relative z-10 w-full h-auto md:h-24 max-w-[1920px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 md:py-0">
        {/* Logo Section */}
        <Link href="/" className="relative h-16 w-32 md:w-40 shrink-0">
          <Image
            src={logoUrl}
            alt="Body Mask Bridal Studio"
            fill
            className="object-contain object-left"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </Link>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-xs lg:text-sm font-sans font-medium tracking-[0.15em] transition-colors duration-300 relative group ${
                      isActive
                        ? "text-[#C5A367] font-bold"
                        : "text-gray-800 hover:text-[#C5A367]"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#C5A367] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <Link href="/contact" className="relative h-16 w-32 md:w-40 shrink-0">
            <button className="bg-gold-gradient text-white px-6 lg:px-8 py-2 lg:py-3 text-xs lg:text-sm font-bold tracking-[0.2em] uppercase hover:shadow-lg hover:scale-105 transition-all duration-300 border-none whitespace-nowrap">
              Book Now
            </button>
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
                  <Link
                    href={link.href}
                    className={`text-sm font-sans font-medium tracking-[0.15em] transition-colors duration-300 block py-1 ${
                      isActive
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
                </li>
              );
            })}
            <li className="pt-2 border-t border-gray-100 mobile-link">
              <button className="w-full bg-gold-gradient text-white px-6 py-2 text-sm font-bold tracking-[0.2em] uppercase hover:shadow-lg transition-all duration-300 border-none">
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Divider Line */}
      <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-gold-200 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
