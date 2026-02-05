"use client";

import { Instagram, Twitter, Youtube, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 360 362"
    className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 "
  >
    <path
      fill="white"
      fillRule="evenodd"
      d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative  text-white w-full">
      {/* Marble Background with Overlay */}
      <div
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: "url('/assets/footer/bg/footer-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating WhatsApp Button - Top Right */}
      <div className="absolute -top-12 right-8 md:right-16 lg:right-24 z-50">
        <a
          href="https://wa.me/918531865603"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-28 h-28 relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-3xl animate-pulse" />
          {/* White Outer Ring */}
          <div className="relative w-28 h-28 rounded-full bg-white/90 shadow-2xl flex items-center justify-center">
            {/* Green Inner Circle */}
            <WhatsAppIcon />
          </div>
        </a>
      </div>

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
                  priority
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
                href="https://wa.me/918531865603"
                className="inline-flex items-center gap-2 bg-[#C5A367] text-black px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#D4A574] transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp: 085318 65603
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
