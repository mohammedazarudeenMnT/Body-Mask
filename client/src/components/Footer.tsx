"use client";

import { useState, useEffect } from "react";
import { Instagram, Youtube, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import { axiosInstance } from "@/lib/axios";
import { useDynamicLogo } from "@/hooks/useDynamicLogo";

interface GeneralSettings {
  companyName?: string;
  companyDescription?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  workingHours?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  whatsappNumber?: string;
  footerNote?: string;
  companyLogo?: string;
}

const Footer = () => {
  const logoUrl = useDynamicLogo();
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<GeneralSettings | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getServices();
        if (res.success && res.data) {
          setServices(res.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch services for footer", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/api/settings/general");
        if (res.data) {
          console.log('Footer settings loaded:', res.data.socialMedia);
          setSettings(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings for footer", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative text-white w-full bg-[#330000]">
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
                className="relative h-24 w-48 md:w-56 shrink-0 block"
              >
                <Image
                  src={logoUrl}
                  alt="Body Mask Bridal Studio"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Services
                </Link>
              </li>
              <li>
                <Link
                  href="/Luxury-Bridal-Salon-Madurai"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/Professional-Makeup-Artist-Madurai"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/Best-Makeup-Artist-in-Madurai"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/Bridal-Makeup-Artist-Madurai"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Videos
                </Link>
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
                  {settings?.workingHours || "Mon-Sat: 9:00 AM - 7:00 PM"}
                </p>
                {!settings?.workingHours && (
                  <p className="text-gray-300 text-sm font-semibold">
                    Sun: 10:00 AM - 5:00 PM
                  </p>
                )}
              </div>
              <a
                href={`tel:${(settings?.companyPhone || "08531865603").replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 bg-[#C5A367] text-[#330000] px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#D4A574] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call: {settings?.companyPhone || "085318 65603"}
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
              {settings?.companyDescription ||
                "We specialize in a wide range of services including Hair Care (styling, cuts, treatments), Skin Care (advanced facials), Nails (manicure, pedicure), Hair Removal (waxing), and complete Bridal Makeup packages."}
            </p>
          </div>

          {/* Service Menu */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              SERVICE MENU
            </h3>
            <ul className="space-y-2 text-gray-400 text-xs">
              {services.length > 0 &&
                services.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/${service.slug}`}
                      className="hover:text-[#C5A367] transition-colors"
                    >
                      • {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              LOCATION
            </h3>
            <div className="text-gray-400 text-xs space-y-2">
              <p>{settings?.companyName || "Body Mask Bridal Studio"}</p>
              {settings?.companyAddress ? (
                <p>{settings.companyAddress}</p>
              ) : (
                <>
                  <p>1st Floor, 29/2, Aruppukottai Main Rd,</p>
                  <p>near Little Diamonds School,</p>
                  <p>Villapuram, Tamil Nadu 625012</p>
                </>
              )}
              <p className="pt-2 text-[#C5A367]">
                Phone: {settings?.companyPhone || "085318 65603"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} All rights reserved. Body Mask Bridal
              Studio
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-[#C5A367] transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-500">•</span>
              <Link
                href="/terms-and-conditions"
                className="text-gray-500 hover:text-[#C5A367] transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {settings?.socialMedia?.instagram && (
              <a
                href={settings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings?.socialMedia?.facebook && (
              <a
                href={settings.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {settings?.socialMedia?.youtube && (
              <a
                href={settings.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {/* Google Reviews */}
            <a
              href="https://www.google.com/search?q=body+mask+madurai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              aria-label="Google Reviews"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
