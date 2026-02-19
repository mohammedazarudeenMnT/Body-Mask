import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Body Mask Bridal Studio",
  description:
    "Madurai's premier destination for luxury bridal makeup and professional beauty services. Experience exquisite artistry for your special day.",
  keywords: [
    "bridal makeup",
    "makeup artist Madurai",
    "wedding styling",
    "luxury salon",
    "beauty artistry",
  ],
  authors: [{ name: "Body Mask Team" }],
  openGraph: {
    title: "Body Mask Bridal Studio",
    description:
      "Madurai's premier destination for luxury bridal makeup and professional beauty services.",
    url: "https://bodymask.com",
    siteName: "Body Mask Bridal Studio",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Body Mask Bridal Studio - Luxury Bridal Artistry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Mask Bridal Studio",
    description:
      "Madurai's premier destination for luxury bridal makeup and professional beauty services.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bodymask.com",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-cream text-gray-900 font-sans`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
