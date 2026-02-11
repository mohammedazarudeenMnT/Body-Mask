import { notFound } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import ServiceDetailClient from "@/components/ServiceDetailClient";

// Service data
const servicesData = {
  "advanced-skin-care": {
    title: "Advanced Skin Care",
    subtitle: "A Journey to Radiant Perfection",
    heroImage: "/assets/services/bridal-makup-banner.jpg",
    category: "Premium Services",
    description: {
      intro:
        "At Body Mask Bridal Studio, we believe that true radiance begins beneath the surface. Located in the heart of Prasanna Colony, Madurai, our studio has become a sanctuary for brides seeking the pinnacle of skin health and luminosity.",
      main: "Our Advanced Skin Care protocols are designed to transcend traditional facials. Utilizing premium international products like Kryolan and specialized serums, our expert aestheticians work meticulously to hydrate, rejuvenate, and illuminate.",
      quote:
        "Beauty is not just about makeup; it is the canvas upon which artistry comes alive.",
      quoteAuthor: "Lakshmi Priya, Founder & Lead Artist",
    },
    features: [
      "Deep-cleansing hydration therapies",
      "Anti-tan specialized treatments",
      "Premium Kryolan products",
      "Personalized skin analysis",
      "Clinical precision techniques",
      "Dermatological science approach",
    ],
    gallery: [
      {
        src: "/assets/gallery/gallery-1.png",
        alt: "Radiant bride close up",
        label: "Bridal Glow",
      },
      {
        src: "/assets/gallery/gallery-2.png",
        alt: "Facial treatment process",
        label: "Gold Mask Therapy",
      },
      {
        src: "/assets/gallery/gallery-3.png",
        alt: "Flawless skin result",
        label: "Hydration Boost",
      },
      {
        src: "/assets/about/service-1.jpg",
        alt: "Precision care",
        label: "Precision Care",
      },
      {
        src: "/assets/gallery/gallery-4.png.jpg",
        alt: "Final reveal",
        label: "Final Reveal",
      },
      {
        src: "/assets/about/service-2.jpg",
        alt: "Premium products",
        label: "Premium Products",
      },
    ],
  },
  "bridal-makeup": {
    title: "Bridal Makeup",
    subtitle: "Your Dream Look, Perfected",
    heroImage: "/assets/services/bridal-makup-banner.jpg",
    category: "Signature Services",
    description: {
      intro:
        "Your wedding day deserves nothing less than perfection. At Body Mask Bridal Studio, we specialize in creating timeless bridal looks that reflect your unique beauty and personality.",
      main: "Using premium products including Kryolan Waterproof Makeup, we create long-lasting, camera-ready looks that withstand tears of joy and hours of celebration. Our bridal packages include pre-bridal consultations and makeup trials.",
      quote: "Every bride deserves to feel like royalty on her special day.",
      quoteAuthor: "Lakshmi Priya, Founder & Lead Artist",
    },
    features: [
      "HD & Airbrush makeup application",
      "Kryolan Waterproof products",
      "Pre-bridal consultations",
      "Makeup trials included",
      "Hair styling & draping",
      "Touch-up kit provided",
    ],
    gallery: [
      {
        src: "/assets/gallery/gallery-1.png",
        alt: "Bridal makeup",
        label: "Classic Bridal",
      },
      {
        src: "/assets/gallery/gallery-2.png",
        alt: "Hair styling",
        label: "Hair Artistry",
      },
      {
        src: "/assets/gallery/gallery-3.png",
        alt: "Complete look",
        label: "Complete Look",
      },
      {
        src: "/assets/gallery/gallery-4.png.jpg",
        alt: "Makeup detail",
        label: "Makeup Detail",
      },
      {
        src: "/assets/gallery/gallery-5.png.jpg",
        alt: "Bridal portrait",
        label: "Bridal Portrait",
      },
      {
        src: "/assets/about/service-1.jpg",
        alt: "Final touch",
        label: "Final Touch",
      },
    ],
  },
  "hair-styling": {
    title: "Hair Styling",
    subtitle: "Crowning Your Beauty",
    heroImage: "/assets/services/bridal-makup-banner.jpg",
    category: "Styling Services",
    description: {
      intro:
        "Your hair is your crowning glory, and at Body Mask Bridal Studio, we treat it with the care and artistry it deserves. Our expert stylists are trained in the latest techniques and trends.",
      main: "We use premium hair care products and styling tools to create looks that last throughout your special day. Whether you desire intricate braiding, elegant buns, or cascading curls, our team brings your vision to life.",
      quote: "Great hair speaks louder than words.",
      quoteAuthor: "Lakshmi Priya, Founder & Lead Artist",
    },
    features: [
      "Traditional & contemporary styles",
      "Premium styling products",
      "Hair consultations & trials",
      "Intricate braiding techniques",
      "Floral & jewelry placement",
      "Pre-styling hair treatments",
    ],
    gallery: [
      {
        src: "/assets/gallery/gallery-2.png",
        alt: "Hair styling",
        label: "Elegant Updo",
      },
      {
        src: "/assets/gallery/gallery-1.png",
        alt: "Bridal hair",
        label: "Bridal Hair",
      },
      {
        src: "/assets/gallery/gallery-3.png",
        alt: "Hair detail",
        label: "Hair Detail",
      },
      {
        src: "/assets/about/service-2.jpg",
        alt: "Styling process",
        label: "Styling Process",
      },
      {
        src: "/assets/gallery/gallery-4.png.jpg",
        alt: "Final style",
        label: "Final Style",
      },
      {
        src: "/assets/about/service-1.jpg",
        alt: "Hair artistry",
        label: "Hair Artistry",
      },
    ],
  },
};

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <HeroBanner imageSrc={service.heroImage} imageAlt={service.title} />
      <ServiceDetailClient service={service} />
    </main>
  );
}
