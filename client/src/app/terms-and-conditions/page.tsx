import { Metadata } from "next";
import { axiosInstance } from "@/lib/axios";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms & Conditions | Body Mask Bridal Studio",
  description: "Read our terms and conditions for using our services.",
};

interface GeneralSettings {
  termsAndConditions?: string;
  companyName?: string;
}

export default async function TermsAndConditionsPage() {
  let settings: GeneralSettings | null = null;

  try {
    const response = await axiosInstance.get("/api/settings/general");
    settings = response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }

  const termsContent = settings?.termsAndConditions || `
    <h2>Terms and Conditions</h2>
    <p>Welcome to ${settings?.companyName || "Body Mask Bridal Studio"}. By accessing and using our services, you agree to comply with the following terms and conditions.</p>
    
    <h3>1. Services</h3>
    <p>We provide professional beauty and bridal makeup services. All services are subject to availability and booking confirmation.</p>
    
    <h3>2. Booking and Cancellation</h3>
    <p>Bookings must be made in advance. Cancellations should be made at least 24 hours before the scheduled appointment to avoid cancellation fees.</p>
    
    <h3>3. Payment Terms</h3>
    <p>Payment is required at the time of service or as per the agreed payment schedule for bridal packages.</p>
    
    <h3>4. Liability</h3>
    <p>We take utmost care in providing our services. However, we are not liable for any allergic reactions or skin sensitivities. Please inform us of any allergies beforehand.</p>
    
    <h3>5. Changes to Terms</h3>
    <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
  `;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FFF8F0] to-white">
      {/* Header */}
      <div className="bg-[#330000] text-white pt-32 md:pt-48 pb-20 md:pb-28">


        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FileText className="w-8 h-8 text-[#C5A367]" />
            <h1 className="text-3xl md:text-5xl font-serif text-center">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 lg:p-20 border border-[#C5A367]/15 -mt-20 relative z-10 transition-all overflow-hidden mx-4 sm:mx-0">
            <div
              className="prose prose-lg max-w-none w-full break-words ql-editor !p-0


                prose-headings:font-serif prose-headings:text-[#330000]
                prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:border-b prose-h2:border-[#C5A367]/30 prose-h2:pb-3
                prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:text-[#C5A367]
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-strong:text-[#330000] prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: termsContent }}
            />
            
            <div className="mt-12 pt-8 border-t border-[#C5A367]/20">
              <p className="text-sm text-gray-500 text-center">
                Last updated: {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
