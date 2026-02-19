import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import HeroBanner from "@/components/HeroBanner";
import OffersPageContent from "@/components/OffersPageContent";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("offers");

  return {
    title:
      settings?.metaTitle ||
      "Exclusive Beauty Offers | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Discover our curated collections of luxury bridal packages and seasonal beauty promotions.",
    keywords: settings?.keywords || ["beauty offers", "bridal packages"],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage
        ? [settings.ogImage]
        : ["/assets/offers-og.jpg"],
    },
  };
}

export default function OngoingOffersPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* SEO/Hero */}
      <HeroBanner
        pageKey="offers"
        fallbackTitle="Curated Offers"
        fallbackSubtitle="Discover our latest promotions and seasonal beauty collections."
      />

      <OffersPageContent />

      {/* Bottom CTA Banner */}
      <section className="bg-[#1a1310] relative overflow-hidden py-24">
        {/* Artistic Texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm76-52c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-6-20c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM11 52c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm71 38c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM9 73c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm10-44c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm66 47c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM44 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm16 78c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z' fill='%23c5a367' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <p className="text-[#c5a367] text-sm uppercase tracking-[0.4em] font-bold mb-6">
            Elite Beauty Services
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-10 max-w-2xl leading-tight">
            Reserve Your Signature Experience
          </h2>
          <a
            href="/contact"
            className="group flex items-center gap-4 bg-white text-[#1a1310] font-bold px-12 py-5 rounded-full transition-all duration-500 hover:bg-[#c5a367] hover:text-white shadow-2xl hover:shadow-[#c5a367]/40"
          >
            Book My Session
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
