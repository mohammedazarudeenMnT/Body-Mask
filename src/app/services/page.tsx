import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";

const servicesList = [
  {
    id: "bridal",
    title: "Bridal Services",
    description: "Complete bridal makeup packages for your special day.",
    image: "/assets/services/bridal-makup.png",
    slug: "bridal-makeup",
  },
  {
    id: "hair",
    title: "Hair Care",
    description: "Professional styling and treatments for a fresh, new look.",
    image: "/assets/services/hair-styling.png",
    slug: "hair-styling",
  },
  {
    id: "skin",
    title: "Skin Care",
    description: "Advanced facial treatments to rejuvenate your glow.",
    image: "/assets/services/skin-treatements.png",
    slug: "advanced-skin-care",
  },
  {
    id: "nail",
    title: "Nails",
    description: "Premium Manicure and Anti-Tan Pedicure services.",
    image: "/assets/services/nail-art.png",
  },
  {
    id: "makeup",
    title: "Makeup Services",
    description: "Professional makeup for all occasions.",
    image: "/assets/services/premium-manicure.png",
  },
  {
    id: "pedicure",
    title: "Anti Tan Pedicure",
    description: "Rejuvenate your feet with our anti-tan pedicure treatments.",
    image: "/assets/services/pedicure.png",
  },
  {
    id: "removal",
    title: "Hair Removal",
    description: "Professional waxing services for smooth skin.",
    image: "/assets/services/facial.png",
  },

];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Banner Section */}
      <HeroBanner
        imageSrc="/assets/services/banner/bridal-banner.jpg"
        imageAlt="Body Mask Bridal Studio Services"
       
      />

      {/* Services Section */}
      <section className="relative px-4 md:px-8 py-20 bg-cream">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-gold-600 uppercase mb-3">
              EXPERTISE
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
              Body Mask Bridal Studio
            </h2>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service) => {
              // Standard Service Card
              return (
                <Link
                  key={service.id}
                  href={service.slug ? `/services/${service.slug}` : "#"}
                  className="group relative bg-[#F5F0EB] p-3 transition-transform hover:-translate-y-1 duration-300"
                >
                  {/* Double Border / Frame Effect Container */}
                  <div className="h-full w-full border border-[#DCCA9C] p-6 flex flex-col items-center text-center">
                    {/* Image/Icon Area */}
                    <div className="relative w-full h-40 mb-6 mt-4">
                      <Image
                        src={service.image || ""}
                        alt={service.title}
                        fill
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl text-[#2A2A2A] mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-[#666666] max-w-[20ch]">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Packages Section */}
      <section className="relative px-4 md:px-8 py-20 bg-[#F5F0EB]">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-gold-600 uppercase mb-3">
              EXCLUSIVE
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Premium Packages
            </h2>
            <p className="text-sm text-[#666666] max-w-2xl mx-auto">
              Curated experiences designed to make your special moments unforgettable
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <div className="group relative bg-cream p-4 transition-all hover:shadow-lg duration-300">
              <div className="h-full w-full border-2 border-gold-500 p-8 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl text-[#2A2A2A] mb-2">
                    Bridal Elegance
                  </h3>
                  <div className="w-16 h-[1px] bg-gold-gradient mx-auto mb-4"></div>
                  <p className="text-xs text-[#666666] mb-6">
                    Complete bridal transformation package
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    HD Bridal Makeup
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Hair Styling & Setting
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Pre-Bridal Facial
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Manicure & Pedicure
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Draping Assistance
                  </li>
                </ul>

                <div className="text-center pt-6 border-t border-[#DCCA9C]">
                  <p className="text-xs text-gold-600 uppercase tracking-wider">
                    Starting From
                  </p>
                  <p className="font-serif text-3xl text-[#2A2A2A] mt-1">
                    ₹25,000
                  </p>
                </div>
              </div>
            </div>

            {/* Package 2 - Featured */}
            <div className="group relative bg-gold-gradient p-4 transition-all hover:shadow-xl duration-300 md:-mt-4">
              <div className="h-full w-full border-2 border-gold-700 p-8 flex flex-col bg-cream">
                <div className="text-center mb-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-gold-700 uppercase mb-2">
                    MOST POPULAR
                  </p>
                  <h3 className="font-serif text-2xl text-[#2A2A2A] mb-2">
                    Royal Bride
                  </h3>
                  <div className="w-16 h-[1px] bg-gold-gradient mx-auto mb-4"></div>
                  <p className="text-xs text-[#666666] mb-6">
                    Our signature luxury experience
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Airbrush HD Makeup
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Premium Hair Styling
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Gold Facial Treatment
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Luxury Manicure & Pedicure
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Full Body Spa
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Draping & Accessories
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-700 mr-2">✦</span>
                    Touch-up Kit
                  </li>
                </ul>

                <div className="text-center pt-6 border-t border-gold-500">
                  <p className="text-xs text-gold-700 uppercase tracking-wider">
                    Starting From
                  </p>
                  <p className="font-serif text-3xl text-[#2A2A2A] mt-1">
                    ₹45,000
                  </p>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="group relative bg-cream p-4 transition-all hover:shadow-lg duration-300">
              <div className="h-full w-full border-2 border-gold-500 p-8 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl text-[#2A2A2A] mb-2">
                    Party Glam
                  </h3>
                  <div className="w-16 h-[1px] bg-gold-gradient mx-auto mb-4"></div>
                  <p className="text-xs text-[#666666] mb-6">
                    Perfect for special occasions
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Party Makeup
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Hair Styling
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Express Facial
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Nail Art
                  </li>
                  <li className="text-sm text-[#666666] flex items-start">
                    <span className="text-gold-600 mr-2">✦</span>
                    Draping Support
                  </li>
                </ul>

                <div className="text-center pt-6 border-t border-[#DCCA9C]">
                  <p className="text-xs text-gold-600 uppercase tracking-wider">
                    Starting From
                  </p>
                  <p className="font-serif text-3xl text-[#2A2A2A] mt-1">
                    ₹12,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
