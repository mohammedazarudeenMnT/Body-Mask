"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "BRIDAL PACKAGES", href: "#packages" },
    { name: "SERVICES", href: "#services" },
    { name: "GALLERY", href: "#gallery" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 h-24 bg-white shadow-sm transition-all duration-300">
      {/* Marble Texture Background Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/assets/marble.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Container - Grid Layout */}
      <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto grid grid-cols-12 items-center px-0">
        {/* Logo Section - Inset White Box */}
        <div className="col-span-3 h-full flex items-center bg-white px-8 md:px-12 shadow-[4px_0_15px_-5px_rgba(0,0,0,0.05)] relative z-20">
          <Link href="/" className="relative w-48 h-full flex items-center">
            {/* Using object-contain to ensure logo fits well */}
            <div className="relative w-40 h-16">
              <Image
                src="/assets/logo.png"
                alt="Body Mask Bridal Studio"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links - Centered */}
        <div className="col-span-6 flex justify-center items-center h-full">
          <ul className="flex space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-sans font-medium tracking-[0.15em] text-gray-800 hover:text-gold-600 transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button - Right Aligned */}
        <div className="col-span-3 flex justify-end items-center h-full px-8 md:px-12 bg-white/0">
          <button className="bg-gold-gradient text-white px-8 py-3 text-sm font-bold tracking-[0.2em] uppercase hover:shadow-lg hover:scale-105 transition-all duration-300 border-none">
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Divider Line */}
      <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-gold-200 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
