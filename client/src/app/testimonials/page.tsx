import { Metadata } from "next";
import { testimonialApi } from "@/lib/testimonial-api";
import TestimonialsPageContent from "@/components/TestimonialsPageContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Testimonials | Body Mask Bridal Studio",
  description: "Read what our clients say about their experience with Body Mask Bridal Studio. Real reviews from real brides.",
};

export default async function TestimonialsPage() {
  const testimonialsRes = await testimonialApi
    .getTestimonials()
    .catch(() => ({ success: false, data: [] }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FFF8F0] to-white">
      <TestimonialsPageContent
        initialTestimonials={testimonialsRes.success ? testimonialsRes.data : []}
      />
    </main>
  );
}
