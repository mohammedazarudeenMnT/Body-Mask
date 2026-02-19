import { Metadata } from "next";
import { seoApi } from "@/lib/seo-api";
import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await seoApi.getByPageName("contact");

  return {
    title: settings?.metaTitle || "Contact Us | Body Mask Bridal Studio",
    description:
      settings?.metaDescription ||
      "Ready to transform your look? Contact Body Mask today for luxury bridal makeup and professional beauty services in Madurai.",
    keywords: settings?.keywords || [
      "contact body mask",
      "bridal studio contact",
    ],
    openGraph: {
      title: settings?.metaTitle,
      description: settings?.metaDescription,
      images: settings?.ogImage
        ? [settings.ogImage]
        : ["/assets/contact-og.jpg"],
    },
  };
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream">
      <HeroBanner
        pageKey="contact"
        fallbackTitle="Contact Us"
        fallbackSubtitle="Ready to Transform Your Look?"
      />
      <ContactForm />
    </main>
  );
}
