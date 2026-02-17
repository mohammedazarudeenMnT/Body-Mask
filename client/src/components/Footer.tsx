"use client";

import { Instagram, Twitter, Youtube, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative text-white w-full">
      {/* Marble Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footer/bg/footer-bg.png"
          alt="Footer Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Floating WhatsApp removed - now a global component */}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-8">
        {/* Top Section with Logo and Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-800">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            {/* Logo Image */}
            <div className="mb-6">
              <Link
                href="/"
                className="relative h-16 w-32 md:w-40 flex-shrink-0 block mb-3"
              >
                <Image
                  src="/assets/logo.png"
                  alt="Body Mask Bridal Studio"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </Link>
              <h2 className="text-[#C5A367] font-serif text-2xl tracking-wider">
                BODY MASK
              </h2>
              <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
                Bridal Studio
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-[#C5A367] transition-colors">
                  • Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A367] transition-colors">
                  • Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A367] transition-colors">
                  • Gallery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A367] transition-colors">
                  • About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C5A367] transition-colors">
                  • Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              CONTACT US
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[#C5A367] text-sm mb-1">Hours</p>
                <p className="text-gray-300 text-sm font-semibold">
                  Mon-Sat: 9:00 AM - 7:00 PM
                </p>
                <p className="text-gray-300 text-sm font-semibold">
                  Sun: 10:00 AM - 5:00 PM
                </p>
              </div>
              <a
                href="tel:08531865603"
                className="inline-flex items-center gap-2 bg-[#C5A367] text-black px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#D4A574] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call: 085318 65603
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section - Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-b border-gray-800">
          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              OUR SERVICES
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We specialize in a wide range of services including Hair Care
              (styling, cuts, treatments), Skin Care (advanced facials), Nails
              (manicure, pedicure), Hair Removal (waxing), and complete Bridal
              Makeup packages.
            </p>
          </div>

          {/* Service Menu */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              SERVICE MENU
            </h3>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>• Bridal Makeup Packages</li>
              <li>• Hair Styling & Treatments</li>
              <li>• Advanced Facials</li>
              <li>• Premium Manicure & Pedicure</li>
              <li>• Professional Waxing</li>
              <li>• Kryolan Waterproof Makeup</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              LOCATION
            </h3>
            <div className="text-gray-400 text-xs space-y-2">
              <p>Body Mask Bridal Studio</p>
              <p>1st Floor, 29/2, Aruppukottai Main Rd,</p>
              <p>near Little Diamonds School,</p>
              <p>Villapuram, Tamil Nadu 625012</p>
              <p className="pt-2 text-[#C5A367]">Phone: 085318 65603</p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} All rights reserved. Body Mask Bridal
            Studio
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-black transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-black transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-black transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
