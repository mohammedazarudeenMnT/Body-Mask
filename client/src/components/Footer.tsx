"use client";

import { useState, useEffect } from "react";
import { Instagram, Twitter, Youtube, Phone } from "lucide-react";
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
    twitter?: string;
    linkedin?: string;
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
                className="relative h-16 w-32 md:w-40 shrink-0 block mb-3"
              >
                <Image
                  src={logoUrl}
                  alt="Body Mask Bridal Studio"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </Link>
              <h2 className="text-[#C5A367] font-serif text-2xl tracking-wider">
                {settings?.companyName || "BODY MASK"}
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
                  href="/gallery"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#C5A367] transition-colors"
                >
                  • Contact
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
                      href={`/services/${service.slug}`}
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
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} All rights reserved. Body Mask Bridal
            Studio
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {settings?.socialMedia?.instagram ? (
              <a
                href={settings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            ) : (
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings?.socialMedia?.twitter ? (
              <a
                href={settings.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            ) : (
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {settings?.socialMedia?.facebook ? (
              <a
                href={settings.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            ) : (
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#C5A367]/10 border border-[#C5A367]/30 flex items-center justify-center text-[#C5A367] hover:bg-[#C5A367] hover:text-[#330000] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
