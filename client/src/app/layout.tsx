import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { LayoutWrapper } from "@/components/layout-wrapper";
import Preloader from "@/components/Preloader";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { settingsApi } from "@/lib/settings-api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await settingsApi.getGeneralSettings().catch(() => null);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bodymask.com";
  const title = settings?.companyName || "Body Mask Bridal Studio";
  const description =
    settings?.companyDescription ||
    "Madurai's premier destination for luxury bridal makeup and professional beauty services. Experience exquisite artistry for your special day.";
  
  // Favicon priority: Uploaded Favicon -> Uploaded Logo -> Default Static Asset
  const favicon = settings?.favicon || settings?.companyLogo || "/assets/logo.png";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      "bridal makeup",
      "makeup artist Madurai",
      "wedding styling",
      "luxury salon",
      "beauty artistry",
    ],
    authors: [{ name: "Body Mask Team" }],
    metadataBase: new URL(baseUrl),
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: title,
      images: [
        {
          url: "/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - Luxury Bridal Artistry`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
          <Preloader />
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
