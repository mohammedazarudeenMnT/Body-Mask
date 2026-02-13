import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream">
      <HeroBanner
        imageSrc="/assets/contact/banner/contact-page-banner.jpg"
        imageAlt="Contact Body Mask Bridal Studio"
      />
      <ContactForm />
    </main>
  );
}
