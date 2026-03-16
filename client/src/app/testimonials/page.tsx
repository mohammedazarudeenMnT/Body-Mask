import { Metadata } from "next";
import { testimonialApi } from "@/lib/testimonial-api";
import TestimonialsPageContent from "@/components/TestimonialsPageContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Memoirs | Body Mask Bridal Studio",
  description: "Read our client memoirs and experiences with Body Mask Bridal Studio. Real stories from real brides.",
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
