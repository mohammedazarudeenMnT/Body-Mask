import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream">
      <HeroBanner
        pageKey="contact"
        fallbackTitle="Contact Us"
        fallbackSubtitle="Ready to Transform Your Look?"
        fallbackImage="/assets/contact/banner/contact-page-banner.jpg"
      />
      <ContactForm />
    </main>
  );
}
