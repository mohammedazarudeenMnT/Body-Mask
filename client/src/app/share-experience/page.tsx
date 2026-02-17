import TestimonialForm from "@/components/TestimonialForm";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ShareExperiencePage() {
  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Global Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/share-experience-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Global Overlay for better text/form contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Left Side - Visual Content */}
      <div className="relative z-10 hidden lg:flex w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen items-center justify-center p-6 lg:p-12">
        {/* Logo - Top Left */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="relative block w-32 h-16 md:w-40 md:h-20 hover:opacity-90 transition-opacity"
          >
            <Image
              src="/assets/logo.png"
              alt="Body Mask Bridal Studio"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>

        {/* Content */}
        <div className="text-center max-w-lg mx-auto mt-12 lg:mt-0">
          <div className="mb-6 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 text-[#C5A367] fill-[#C5A367]" />
            ))}
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif text-white mb-6 leading-tight drop-shadow-md">
            Your Story <br />
            <span className="text-[#C5A367] italic">Matters</span>
          </h1>
          <p className="text-gray-100 text-lg font-light leading-relaxed drop-shadow-sm">
            "Beauty is about being comfortable in your own skin. Thank you for
            letting us be a part of your journey."
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6 py-12 lg:p-12 bg-cream/95 lg:bg-cream/90 backdrop-blur-sm">
        <div className="w-full max-w-xl">
          <TestimonialForm
            className="shadow-none border-none bg-transparent p-0 md:p-0"
            containerClassName="max-w-none"
          />
        </div>
      </div>
    </main>
  );
}
