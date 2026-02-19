"use client";

import { useState, useEffect, useRef } from "react";
import { Tag, Clock, ArrowRight, Maximize2, Download, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Offer {
  _id: string;
  expiryDate: string;
  imageUrl: string;
  isPublished: boolean;
}

// Helper function for cn
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
function Lightbox({
  image,
  onClose,
  onDownload,
}: {
  image: string;
  onClose: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      {/* Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-101">
        <div className="flex items-center gap-4">
          <button
            onClick={onDownload}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all group"
            title="Download Offer"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-red-500/80 text-white rounded-full transition-all group"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
        <img
          src={image}
          alt="Full Offer"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none animate-in zoom-in-95 duration-300"
        />
      </div>

      {/* Background click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

function OfferCard({
  offer,
  onView,
  onDownload,
}: {
  offer: Offer;
  onView: () => void;
  onDownload: () => void;
}) {
  const expiryDate = new Date(offer.expiryDate);
  const now = new Date();
  const daysLeft = Math.ceil(
    (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isExpiringSoon = daysLeft <= 5 && daysLeft > 0;

  return (
    <div className="offer-card opacity-0 group relative bg-white rounded-3xl overflow-hidden border border-[#e8e0d5] shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
      {/* image Banner */}
      <div className="relative flex flex-col">
        <div className="relative w-full overflow-hidden bg-gray-50 aspect-auto">
          <img
            src={offer.imageUrl || "/placeholder-offer.jpg"}
            alt="Ongoing Offer"
            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
            <button
              onClick={onView}
              className="p-4 bg-white text-[#1a1310] rounded-full shadow-2xl transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#c5a367] hover:text-white"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
            <button
              onClick={onDownload}
              className="p-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-[#1a1310]"
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Card Footer/Meta */}
        <div className="p-6 bg-white flex items-center justify-between border-t border-[#f0ebe4]">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isExpiringSoon ? "bg-red-500 animate-pulse" : "bg-green-500",
              )}
            />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              {isExpiringSoon ? "Ending Soon" : "Active Offer"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-[#c5a367]" />
            <span>Expires {expiryDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#e8e0d5] shadow-sm animate-pulse">
      <div className="aspect-4/3 bg-gray-100" />
      <div className="p-6 h-12 bg-white" />
    </div>
  );
}

export default function OffersPageContent() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await axiosInstance.get("/api/offers?published=true");
        setOffers(res.data);
      } catch (err) {
        setError("Failed to load offers. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const handleDownload = async (url: string) => {
    try {
      toast.info("Preparing download...");
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `body-mask-offer-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Offer downloaded!");
    } catch (error) {
      // Fallback for CORS issues
      window.open(url, "_blank");
      toast.error("Download blocked. Image opened in new tab.");
    }
  };

  useGSAP(
    () => {
      if (!loading && offers.length > 0) {
        gsap.to(".offer-card", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".offers-grid",
            start: "top 85%",
          },
        });
      }
    },
    { dependencies: [loading, offers], scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Header */}
        {!loading && offers.length > 0 && (
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1310]">
              Exclusive Packages
            </h2>
            <div className="flex-1 h-px bg-[#e8e0d5]" />
            <span className="text-xs font-bold tracking-widest text-[#c5a367] uppercase">
              {offers.length} Results
            </span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <OfferSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Tag className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-500 font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && offers.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border border-[#e8e0d5] shadow-sm max-w-4xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-[#c5a367]/5 flex items-center justify-center mx-auto mb-8">
              <Tag className="w-10 h-10 text-[#c5a367]/40" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-[#1a1310] mb-4">
              Awaiting New Secrets
            </h3>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed font-light">
              We're polishing our next set of exclusive offers. Please check
              back soon for our seasonal surprises.
            </p>
          </div>
        )}

        {/* Offers Grid */}
        {!loading && !error && offers.length > 0 && (
          <div className="offers-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                onView={() => setActiveLightbox(offer.imageUrl)}
                onDownload={() => handleDownload(offer.imageUrl)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Overlay */}
      {activeLightbox && (
        <Lightbox
          image={activeLightbox}
          onClose={() => setActiveLightbox(null)}
          onDownload={() => handleDownload(activeLightbox)}
        />
      )}
    </div>
  );
}
