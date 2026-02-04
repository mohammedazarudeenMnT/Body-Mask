import ModernHeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import GalleryTestimonials from "@/components/GalleryTestimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <ModernHeroCarousel />
      <Services />
      <GalleryTestimonials />
    </main>
  );
}
