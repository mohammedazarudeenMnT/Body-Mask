"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { testimonialApi } from "@/lib/testimonial-api";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
// @ts-ignore
import { ImageUpload } from "@/components/ui/image-upload";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { cn } from "@/lib/utils";

interface TestimonialFormProps {
  className?: string;
  containerClassName?: string;
}

export default function TestimonialForm({
  className,
  containerClassName,
}: TestimonialFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    clientName: "",
    rating: 5,
    reviewMessage: "",
    clientImage: "",
    serviceId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceApi.getServices();
        if (res.success) {
          setServices(res.data);
        }
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };
    fetchServices();
  }, []);

  useGSAP(
    () => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.reviewMessage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // @ts-ignore
      const res = await testimonialApi.createTestimonial({
        ...formData,
        source: "User Submitted",
      });

      if (res.success) {
        setIsSuccess(true);
        toast.success("Thank you for your review!");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Failed to submit review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 bg-white border border-[#E5D5C0] rounded-xl text-[#2B2622] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#C5A367] focus:border-[#C5A367] transition-all";
  const labelCls =
    "block text-sm font-medium text-[#2B2622] mb-1.5 font-sans tracking-wide";

  if (isSuccess) {
    return (
      <div
        className={cn(
          "w-full max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-3xl border border-[#C5A367]/20 shadow-[0_20px_50px_rgba(197,163,103,0.1)] text-center",
          className,
        )}
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-serif text-[#2B2622] mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          We truly appreciate your feedback. Your review has been submitted
          successfully and will help us continue providing the best experience
          for our clients.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-8 py-3 bg-[#C5A367] text-white rounded-full font-medium hover:bg-[#B08D55] transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full max-w-2xl mx-auto", containerClassName)}
    >
      <div
        ref={formRef}
        className={cn(
          "bg-white p-8 md:p-10 rounded-3xl border border-[#C5A367]/20 shadow-[0_20px_50px_rgba(197,163,103,0.05)]",
          className,
        )}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2B2622] mb-3">
            Share Your Experience
          </h2>
          <p className="text-gray-500">
            We'd love to hear about your visit to Body Mask Boutique
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <label className={labelCls}>Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? "fill-[#C5A367] text-[#C5A367]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelCls}>Your Name *</label>
              <input
                type="text"
                required
                className={inputCls}
                placeholder="Jane Doe"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, clientName: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelCls}>Service Received (Optional)</label>
              <select
                className={inputCls}
                value={formData.serviceId}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, serviceId: e.target.value }))
                }
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Your Review *</label>
            <textarea
              required
              className={`${inputCls} min-h-[150px] resize-none`}
              placeholder="Tell us about your experience..."
              value={formData.reviewMessage}
              onChange={(e) =>
                setFormData((p) => ({ ...p, reviewMessage: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelCls}>Add a Photo (Optional)</label>
            <div className="border-2 border-dashed border-[#E5D5C0] rounded-xl p-6 hover:border-[#C5A367] transition-colors bg-gray-50/50">
              <ImageUpload
                value={formData.clientImage}
                onChange={(url) =>
                  setFormData((p) => ({ ...p, clientImage: url || "" }))
                }
              />
              <p className="text-xs text-center text-gray-400 mt-2">
                Share a photo of your look! (Max 5MB)
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#2B2622] text-white rounded-xl font-medium tracking-wide hover:bg-[#C5A367] transition-all duration-300 shadow-lg hover:shadow-[#C5A367]/25 flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
