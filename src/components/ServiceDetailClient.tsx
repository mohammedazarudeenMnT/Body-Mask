"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ServiceData {
  title: string;
  subtitle: string;
  heroImage: string;
  category: string;
  description: {
    intro: string;
    main: string;
    quote: string;
    quoteAuthor: string;
  };
  features: string[];
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
}

interface ServiceDetailClientProps {
  service: ServiceData;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + service.gallery.length) % service.gallery.length,
    );
  };

  return (
    <>
      {/* Description Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[#Fdfbf7]">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/marble.png"
            alt="Background Texture"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-0 w-40 h-40 bg-[#C5A367]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-[#D4A5A5]/10 rounded-full blur-2xl" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div>
                <span className="text-[#C5A367] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                  {service.category}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-tight">
                  {service.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {i === service.title.split(" ").length - 1 ? (
                        <span className="text-[#C5A367] italic">{word}</span>
                      ) : (
                        word + " "
                      )}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Divider */}
              <div className="w-20 h-[2px] bg-[#C5A367] mx-auto lg:mx-0" />

              {/* Description */}
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p className="text-lg">
                  <span className="float-left text-6xl font-serif font-bold text-[#C5A367] mr-3 mt-1 leading-none">
                    {service.description.intro.charAt(0)}
                  </span>
                  {service.description.intro.slice(1)}
                </p>

                <p className="text-base">{service.description.main}</p>
              </div>

              {/* Features List */}
              <div className="pt-6">
                <h3 className="font-serif text-xl text-[#1a1a1a] mb-6">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C5A367] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image & Quote */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-first lg:order-last"
            >
              {/* Main Image Frame */}
              <div className="relative z-10 border border-[#C5A367]/30 p-4 bg-white/50 backdrop-blur-sm shadow-xl rounded-sm rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm">
                  <Image
                    src={service.gallery[0].src}
                    alt={service.gallery[0].alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Quote Card Overlay */}
              <div className="relative -mt-16 mx-4 lg:mx-8 z-20 bg-linear-to-br from-gold-500 to-gold-700 p-6 md:p-8 shadow-xl">
                <div className="absolute top-3 left-3 text-5xl text-white/20 font-serif">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 font-serif text-lg md:text-xl text-white leading-relaxed italic mb-4">
                  {service.description.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-white/50" />
                  <p className="text-xs uppercase tracking-widest text-white/90 font-bold">
                    {service.description.quoteAuthor}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
                <button className="group relative px-8 py-3 bg-[#1a1a1a] text-white font-medium tracking-wide overflow-hidden rounded-sm">
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-[#C5A367] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#C5A367]/10 -z-10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#D4A5A5]/10 -z-10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 bg-[#F5F0EB]">
        <div className="container mx-auto px-6 md:px-12">
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
                Portfolio
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#C5A367]" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2B2622]">
              The Results of{" "}
              <span className="italic text-[#C5A367]">Artistry</span>
            </h2>
            <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
              Witness the transformations achieved through our dedicated care
              and expertise
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {service.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="break-inside-avoid group relative overflow-hidden border border-[#DCCA9C] p-1 bg-white shadow-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden aspect-3/4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="bg-[#C5A367]/90 text-white text-[10px] uppercase tracking-widest px-3 py-1.5">
                      {image.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-block border-b-2 border-[#C5A367] text-[#C5A367] hover:text-gold-700 hover:border-gold-700 transition-colors pb-1 uppercase text-xs tracking-widest font-bold"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full border-2 border-[#C5A367]/30 p-2 bg-white/5 backdrop-blur-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src={service.gallery[currentImageIndex].src}
                      alt={service.gallery[currentImageIndex].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Image Info */}
              <div className="mt-6 text-center">
                <span className="inline-block bg-[#C5A367] text-white text-xs uppercase tracking-widest px-4 py-2">
                  {service.gallery[currentImageIndex].label}
                </span>
                <p className="mt-2 text-white/60 text-sm">
                  {currentImageIndex + 1} / {service.gallery.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
