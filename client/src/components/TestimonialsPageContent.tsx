"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Testimonial } from "@/lib/testimonial-api";

interface TestimonialsPageContentProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsPageContent({
  initialTestimonials,
}: TestimonialsPageContentProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  return (
    <>
      {/* Header Section */}
      <div className="bg-[#330000] text-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Quote className="w-8 h-8 text-[#C5A367]" />
            <h1 className="text-3xl md:text-5xl font-serif text-center">
              Client Testimonials
            </h1>
          </div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Hear from our beautiful brides and clients about their experience with Body Mask Bridal Studio
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <Quote className="w-16 h-16 text-[#C5A367] mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-serif text-gray-800 mb-2">No Testimonials Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your experience!</p>
            <Link
              href="/share-experience"
              className="inline-block px-8 py-3 bg-[#C5A367] text-white font-semibold rounded-lg hover:bg-[#B8935F] transition-colors"
            >
              Share Your Experience
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-[#C5A367]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-[#C5A367] text-[#C5A367]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.reviewMessage}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C5A367]/30">
                      {testimonial.clientImage ? (
                        <Image
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#C5A367]/10 flex items-center justify-center">
                          <span className="text-[#C5A367] font-serif text-xl">
                            {testimonial.clientName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.clientName}
                      </h4>
                      {testimonial.service && typeof testimonial.service === 'object' && (
                        <p className="text-sm text-gray-500">
                          {testimonial.service.title}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-[#C5A367]/10 via-[#E2C792]/10 to-[#C5A367]/10 rounded-2xl p-12">
              <h3 className="text-3xl font-serif text-[#330000] mb-4">
                Share Your Experience
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We'd love to hear about your experience with us. Your feedback helps us serve you better!
              </p>
              <Link
                href="/share-experience"
                className="inline-block px-8 py-4 bg-[#C5A367] text-white font-semibold rounded-lg hover:bg-[#B8935F] transition-all hover:scale-105 shadow-lg"
              >
                Write a Review
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
