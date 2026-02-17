import ModernHeroCarousel from "@/components/HeroCarousel";
import About from "@/components/About";
import Services from "@/components/Services";
import GalleryTestimonials from "@/components/GalleryTestimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <ModernHeroCarousel />
      <About />
      <Services />
      <GalleryTestimonials />
    </main>
  );
}
