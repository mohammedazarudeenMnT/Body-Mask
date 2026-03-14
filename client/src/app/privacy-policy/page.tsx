import { Metadata } from "next";
import { axiosInstance } from "@/lib/axios";
import { Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy | Body Mask Bridal Studio",
  description: "Learn how we protect and handle your personal information.",
};

interface GeneralSettings {
  privacyPolicy?: string;
  companyName?: string;
  companyEmail?: string;
}

export default async function PrivacyPolicyPage() {
  let settings: GeneralSettings | null = null;

  try {
    const response = await axiosInstance.get("/api/settings/general");
    settings = response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }

  const privacyContent = settings?.privacyPolicy || `
    <h2>Privacy Policy</h2>
    <p>At ${settings?.companyName || "Body Mask Bridal Studio"}, we are committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data.</p>
    
    <h3>1. Information We Collect</h3>
    <p>We collect information that you provide to us when booking appointments, including:</p>
    <ul>
      <li>Name and contact details (phone number, email address)</li>
      <li>Service preferences and appointment history</li>
      <li>Payment information (processed securely)</li>
      <li>Any special requirements or allergies you inform us about</li>
    </ul>
    
    <h3>2. How We Use Your Information</h3>
    <p>We use your information to:</p>
    <ul>
      <li>Process and confirm your bookings</li>
      <li>Communicate with you about appointments and services</li>
      <li>Improve our services and customer experience</li>
      <li>Send promotional offers (only with your consent)</li>
    </ul>
    
    <h3>3. Data Protection</h3>
    <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
    
    <h3>4. Sharing Your Information</h3>
    <p>We do not sell, trade, or rent your personal information to third parties. We may share information only when required by law or to protect our rights.</p>
    
    <h3>5. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
      <li>Access your personal data</li>
      <li>Request correction of inaccurate data</li>
      <li>Request deletion of your data</li>
      <li>Opt-out of marketing communications</li>
    </ul>
    
    <h3>6. Cookies</h3>
    <p>Our website may use cookies to enhance your browsing experience. You can control cookie settings through your browser.</p>
    
    <h3>7. Contact Us</h3>
    <p>If you have any questions about this privacy policy, please contact us at ${settings?.companyEmail || "info@bodymaskstudio.com"}.</p>
    
    <h3>8. Changes to This Policy</h3>
    <p>We may update this privacy policy from time to time. We will notify you of any significant changes.</p>
  `;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FFF8F0] to-white">
      {/* Header */}
      <div className="bg-[#330000] text-white py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-8 h-8 text-[#C5A367]" />
            <h1 className="text-3xl md:text-5xl font-serif text-center">
              Privacy Policy
            </h1>
          </div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-[#C5A367]/20">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-[#330000]
                prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:border-b prose-h2:border-[#C5A367]/30 prose-h2:pb-3
                prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:text-[#C5A367]
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-li:text-gray-700 prose-li:mb-2
                prose-strong:text-[#330000] prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: privacyContent }}
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
