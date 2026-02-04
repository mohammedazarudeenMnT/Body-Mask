"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "BRIDAL PACKAGES", href: "#packages" },
    { name: "SERVICES", href: "#services" },
    { name: "GALLERY", href: "#gallery" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
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
        <Link href="/" className="relative h-16 w-32 md:w-40 flex-shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Body Mask Bridal Studio"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-xs lg:text-sm font-sans font-medium tracking-[0.15em] text-gray-800 hover:text-gold-600 transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <button className="bg-gold-gradient text-white px-6 lg:px-8 py-2 lg:py-3 text-xs lg:text-sm font-bold tracking-[0.2em] uppercase hover:shadow-lg hover:scale-105 transition-all duration-300 border-none whitespace-nowrap">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <ul className="flex flex-col gap-4 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-sans font-medium tracking-[0.15em] text-gray-800 hover:text-gold-600 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100">
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
