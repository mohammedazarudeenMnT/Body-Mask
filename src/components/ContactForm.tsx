"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Contact Information Section */}
      <section className="relative w-full py-20 md:py-22 overflow-hidden bg-linear-to-b from-white via-cream to-white">

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div>
                <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                  Our Information
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                  Visit Our <span className="text-[#C5A367] italic">Studio</span>
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
                      Body Mask Boutique & Bridal Studio
                      <br />
                      Prasanna Colony, Madurai
                      <br />
                      Tamil Nadu, India
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
                        href="tel:+919876543210"
                        className="hover:text-[#C5A367] transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 font-light">
                      <a
                        href="tel:+919876543211"
                        className="hover:text-[#C5A367] transition-colors"
                      >
                        +91 98765 43211
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
                        href="mailto:info@bodymaskstudio.com"
                        className="hover:text-[#C5A367] transition-colors"
                      >
                        info@bodymaskstudio.com
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
                      Monday - Saturday: 9:00 AM - 8:00 PM
                      <br />
                      Sunday: 10:00 AM - 6:00 PM
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
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-[#C5A367]/10 hover:bg-[#C5A367] text-[#C5A367] hover:text-white rounded-full transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form with Image Frame */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-first lg:order-last"
            >
              {/* Main Form Frame */}
              <div className="relative z-10 border border-[#C5A367]/30 p-4 bg-white/50 backdrop-blur-sm shadow-xl rounded-sm">
                <div className="relative bg-white p-8 md:p-10 rounded-sm">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-2 text-center">
                    Book Your <span className="text-[#C5A367] italic">Appointment</span>
                  </h3>
                  <p className="text-center text-sm text-gray-500 mb-8">
                    Fill out the form below and we&apos;ll get back to you shortly
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C5A367] focus:border-transparent bg-white transition-all text-gray-800"
                        >
                          <option value="">Select a service</option>
                          <option value="bridal-makeup">Bridal Makeup</option>
                          <option value="hair-styling">Hair Styling</option>
                          <option value="skin-care">Advanced Skin Care</option>
                          <option value="nail-art">Nail Art & Manicure</option>
                          <option value="pedicure">Anti-Tan Pedicure</option>
                          <option value="other">Other Services</option>
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
                      className="w-full group relative px-8 py-4 bg-[#1a1a1a] text-white font-medium tracking-wide overflow-hidden rounded-sm"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold">
                        <Send className="w-4 h-4" />
                        Send Message
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
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* Map Section */}
      <section className="relative w-full py-16 md:py-10 overflow-hidden bg-white">

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Map Frame - Clean Design */}
            <div className="relative border border-[#C5A367]/20 p-1 bg-white shadow-2xl rounded-sm overflow-hidden">
              <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0234567890123!2d78.1234567890123!3d9.9234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnMjQuNSJOIDc4wrAwNycyNC41IkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Body Mask Bridal Studio Location"
                  className="rounded-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
