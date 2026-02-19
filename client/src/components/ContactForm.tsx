"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { leadApi } from "@/lib/lead-api";
import { serviceApi } from "@/lib/service-api";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { Service } from "@/types/service";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GeneralSettings {
  companyName?: string;
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
  googleMapEmbed?: string;
}

export default function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapHeaderRef = useRef<HTMLDivElement>(null);
  const mapContentRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(
    () => {
      // Info column
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Form column
      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Map Header
      gsap.from(mapHeaderRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: mapHeaderRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Map Content
      gsap.from(mapContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: mapContentRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsRes = await axiosInstance.get("/api/settings/general");
        if (settingsRes.data) {
          setSettings(settingsRes.data);
        }

        // Fetch services
        const servicesRes = await serviceApi.getServices();
        if (servicesRes.success && servicesRes.data) {
          setServices(servicesRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data for contact form", error);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await leadApi.createLead({
        ...formData,
        source: "Form Submission",
      });
      if (response.success) {
        toast.success("Message sent successfully! We will contact you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Contact Information Section */}
      <section
        ref={containerRef}
        className="relative w-full py-20 md:py-22 overflow-hidden bg-linear-to-b from-white via-cream to-white"
      >
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Contact Information */}
            <div ref={infoRef} className="space-y-8 text-center lg:text-left">
              <div>
                <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                  Our Information
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                  Visit Our{" "}
                  <span className="text-[#C5A367] italic">Studio</span>
                </h2>
              </div>

              {/* Divider */}
              <div className="w-20 h-[2px] bg-[#C5A367] mx-auto lg:mx-0" />

              {/* Description */}
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p className="text-lg">
                  Located in the heart of Madurai, our studio is a sanctuary of
                  beauty and elegance. We invite you to experience the finest
                  bridal services in a luxurious setting.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 pt-4">
                {/* Address */}
                <div className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C5A367]/10 rounded-full shrink-0">
                    <MapPin className="w-5 h-5 text-[#C5A367]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">
                      Visit Us
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {settings?.companyName ||
                        "Body Mask Boutique & Bridal Studio"}
                      <br />
                      {settings?.companyAddress || (
                        <>
                          Prasanna Colony, Madurai
                          <br />
                          Tamil Nadu, India
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C5A367]/10 rounded-full shrink-0">
                    <Phone className="w-5 h-5 text-[#C5A367]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">
                      Call Us
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      <a
                        href={`tel:${(settings?.companyPhone || "+919876543210").replace(/\D/g, "")}`}
                        className="hover:text-[#C5A367] transition-colors"
                      >
                        {settings?.companyPhone || "+91 98765 43210"}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C5A367]/10 rounded-full shrink-0">
                    <Mail className="w-5 h-5 text-[#C5A367]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">
                      Email Us
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      <a
                        href={`mailto:${settings?.companyEmail || "info@bodymaskstudio.com"}`}
                        className="hover:text-[#C5A367] transition-colors"
                      >
                        {settings?.companyEmail || "info@bodymaskstudio.com"}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C5A367]/10 rounded-full shrink-0">
                    <Clock className="w-5 h-5 text-[#C5A367]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">
                      Business Hours
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {settings?.workingHours || (
                        <>
                          Monday - Saturday: 9:00 AM - 8:00 PM
                          <br />
                          Sunday: 10:00 AM - 6:00 PM
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media & Signature */}
              <div className="pt-6 flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <span className="block font-serif text-xl text-[#C5A367] italic">
                    Lakshmi Priya
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    Founder & Lead Artist
                  </span>
                </div>
                <div className="flex gap-3">
                  {settings?.socialMedia?.instagram && (
                    <a
                      href={settings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {settings?.socialMedia?.facebook && (
                    <a
                      href={settings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {!settings?.socialMedia?.instagram &&
                    !settings?.socialMedia?.facebook && (
                      <>
                        <a
                          href="#"
                          className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      </>
                    )}
                </div>
              </div>
            </div>

            {/* Right Column - Form with Image Frame */}
            <div ref={formRef} className="relative order-first lg:order-last">
              {/* Main Form Frame */}
              <div className="relative z-10 border border-[#C5A367]/30 p-4 bg-white/50 backdrop-blur-sm shadow-xl rounded-sm">
                <div className="relative bg-white p-8 md:p-10 rounded-sm">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-2 text-center">
                    Book Your{" "}
                    <span className="text-[#C5A367] italic">Appointment</span>
                  </h3>
                  <p className="text-center text-sm text-gray-500 mb-8">
                    Fill out the form below and we&apos;ll get back to you
                    shortly
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Service & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                        >
                          Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          disabled={servicesLoading}
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">
                            {servicesLoading
                              ? "Loading services..."
                              : "Select a service"}
                          </option>
                          {services.map((service) => (
                            <option key={service._id} value={service.title}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="date"
                          className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                        >
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-widest text-gray-600 font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all resize-none text-gray-800"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative px-8 py-4 bg-[#1a1a1a] text-white font-medium tracking-wide overflow-hidden rounded-sm disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold">
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-[#C5A367] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#C5A367]/10 -z-10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#D4A5A5]/10 -z-10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full py-16 md:py-10 overflow-hidden bg-white">
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <div ref={mapHeaderRef} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
              <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                Find Us
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a]">
              Our <span className="italic text-[#C5A367]">Location</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
              Visit us at our studio in the heart of Madurai
            </p>
          </div>

          <div ref={mapContentRef} className="max-w-6xl mx-auto">
            {/* Map Frame - Clean Design */}
            <div className="relative border border-[#C5A367]/20 p-1 bg-white shadow-2xl rounded-sm overflow-hidden">
              <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-sm">
                {settings?.googleMapEmbed ? (
                  <iframe
                    srcDoc={
                      settings.googleMapEmbed.includes("<iframe")
                        ? `
                        <html>
                          <head>
                            <style>
                              html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
                              iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
                            </style>
                          </head>
                          <body>${settings.googleMapEmbed}</body>
                        </html>
                        `
                        : `<html><body style="margin:0;padding:0;height:100%"><iframe src="${settings.googleMapEmbed}" width="100%" height="100%" style="border:0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></body></html>`
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Body Mask Bridal Studio Location"
                    className="rounded-sm"
                  />
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.374664301461!2d78.11886927502991!3d9.902720290197776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5e7f26e88d7%3A0x30a2110cf8b752c4!2sBody%20Mask%20Bridal%20Studio!5e0!3m2!1sen!2sin!4v1771418280783!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Body Mask Bridal Studio Location"
                    className="rounded-sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
