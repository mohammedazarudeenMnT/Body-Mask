"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import HeroBanner from "@/components/HeroBanner";
import { Loader2, ZoomIn, X, ChevronRight } from "lucide-react";
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
  category: string;
  serviceId: string;
  title: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await serviceApi.getServices(activeCategory);
        if (res.success && res.data) {
          const newItems: GalleryItem[] = [];
          res.data.forEach((service) => {
            // Main Image
            if (service.image) {
              newItems.push({
                id: `${service._id}-main`,
                src: service.image,
                category: service.title,
                serviceId: service._id || "",
                title: service.title,
              });
            }
            // Gallery Images
            if (
              service.content?.gallery &&
              Array.isArray(service.content.gallery)
            ) {
              service.content.gallery.forEach((imgUrl, index) => {
                let src = "";
                if (typeof imgUrl === "string") {
                  src = imgUrl;
                } else if (typeof imgUrl === "object" && imgUrl !== null) {
                  const imgObj = imgUrl as { url?: string; src?: string };
                  src = imgObj.url || imgObj.src || "";
                }
                if (src) {
                  newItems.push({
                    id: `${service._id}-${index}`,
                    src: src,
                    category: service.title,
                    serviceId: service._id || "",
                    title: service.title,
                  });
                }
              });
            }
          });

          // Shuffle only if it's "All"
          if (activeCategory === "All") {
            newItems.sort(() => 0.5 - Math.random());
          }

          setGalleryItems(newItems);

          // Update categories only on initial load (when list is empty and category is All)
          if (categories.length === 0 && activeCategory === "All") {
            const cats = [
              "All",
              ...Array.from(new Set(newItems.map((item) => item.category))),
            ];
            setCategories(cats);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const handleFilter = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setVisibleCount(12);
  };

  // Entrance Animation
  useGSAP(
    () => {
      if (loading || galleryItems.length === 0) return;

      // Animate filter buttons
      gsap.fromTo(
        ".filter-ui > button",
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
      );

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
  return (
    <main className="min-h-screen bg-[#FDFBF7]" ref={containerRef}>
      <HeroBanner
        pageKey="gallery"
        fallbackTitle="Visual Artistry"
        fallbackSubtitle="A curated collection of our finest transformations."
        fallbackImage="/assets/skuncare-and-facials.png"
      />
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Filter Navigation */}
        <div className="filter-ui flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 overflow-hidden group",
                activeCategory === cat
                  ? "text-white shadow-lg shadow-[#C5A367]/30"
                  : "text-gray-500 hover:text-[#C5A367] bg-white border border-gray-100",
              )}
            >
              {/* Active Background */}
              {activeCategory === cat && (
                <span className="absolute inset-0 bg-[#C5A367] z-0" />
              )}
              {/* Hover Background */}
              {activeCategory !== cat && (
                <span className="absolute inset-0 bg-[#C5A367]/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full z-0" />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#C5A367]" />
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
                  alt={item.category}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <ZoomIn className="w-8 h-8 text-white/90 mb-3 mx-auto" />
                  </span>
                  <p className="text-[#C5A367] text-xs font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {item.category}
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
              No images found in this category yet.
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
              <span className="text-sm font-semibold tracking-widest uppercase text-[#1a1a1a] group-hover:text-[#C5A367] transition-colors">
                Load More
              </span>
              <ChevronRight className="w-4 h-4 text-[#C5A367] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2">
            <X className="w-8 h-8" />
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
                {selectedImage.category}
              </p>
              <h3 className="font-serif text-2xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
