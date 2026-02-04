import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <HeroCarousel />

      {/* Spacer for scroll testing */}
      <section
        id="packages"
        className="h-screen bg-white flex items-center justify-center"
      >
        <h2 className="text-4xl font-serif text-bronze">
          Bridal Packages (Coming Soon)
        </h2>
      </section>
    </main>
  );
}
