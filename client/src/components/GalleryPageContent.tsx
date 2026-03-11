"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { galleryApi, GalleryItem as ApiGalleryItem } from "@/lib/gallery-api";
import { Loader2, ZoomIn, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { ScrollTrigger, Flip } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}


interface GalleryItem {
  id: string;
  src: string;
  title: string;
}

interface GalleryPageContentProps {
  initialItems?: ApiGalleryItem[];
}

function processApiItemsToGalleryItems(items: ApiGalleryItem[]): GalleryItem[] {
  return items.map((item) => ({
    id: item._id || "",
    src: item.imageUrl,
    title: item.title,
  }));
}

export default function GalleryPageContent({
  initialItems = [],
}: GalleryPageContentProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    processApiItemsToGalleryItems(initialItems),
  );
  const [loading, setLoading] = useState(initialItems.length === 0);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch Data
  useEffect(() => {
    if (initialItems.length > 0) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await galleryApi.getGalleryItems();
        if (res.success && res.data) {
          const newItems = processApiItemsToGalleryItems(res.data);
          setGalleryItems(newItems);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialItems.length]);


  // Entrance Animation
  useGSAP(
    () => {
      if (loading || galleryItems.length === 0) return;

      // Animate grid items
      gsap.fromTo(
        ".gallery-item",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef, dependencies: [loading, galleryItems] },
  );

  const displayedItems = galleryItems.slice(0, visibleCount);
  const hasMore = visibleCount < galleryItems.length;

  // Lightbox Navigation Logic
  const navigateLightbox = (
    direction: "next" | "prev",
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex(
      (i) => i.id === selectedImage.id,
    );
    if (currentIndex === -1) return;

    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setSelectedImage(galleryItems[nextIndex]);
    } else {
      const prevIndex =
        (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setSelectedImage(galleryItems[prevIndex]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, galleryItems]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-16" ref={containerRef}>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader size="xl" />
        </div>
      )}

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 min-h-[50vh]"
      >
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in"
            onClick={() => setSelectedImage(item)}
          >
            <div className="relative w-full">
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={800}
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#330000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <ZoomIn className="w-8 h-8 text-white/90 mb-3 mx-auto" />
                </span>
                <p className="text-[#C5A367] text-xs font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  Signature Artistry
                </p>
                <h3 className="text-white font-serif text-xl mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  View Details
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && displayedItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-serif">
            No images found in the gallery yet.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="group relative flex items-center gap-3 px-8 py-3 bg-white border border-[#C5A367]/20 rounded-full hover:border-[#C5A367] transition-colors"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#330000] group-hover:text-[#C5A367] transition-colors">
              Load More
            </span>
            <ChevronRight className="w-4 h-4 text-[#C5A367] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50">
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => navigateLightbox("prev", e)}
            className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors p-2 md:p-3 hover:bg-white/10 rounded-full z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
          </button>

          <button
            onClick={(e) => navigateLightbox("next", e)}
            className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors p-2 md:p-3 hover:bg-white/10 rounded-full z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] aspect-3/4 md:aspect-video rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              className="object-contain"
              quality={100}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
              <p className="text-[#C5A367] text-xs font-bold uppercase tracking-widest mb-1">
                Signature Artistry
              </p>
              <h3 className="font-serif text-2xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
