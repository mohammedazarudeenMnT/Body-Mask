"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarFooterWhatsApp = [
    "/login",
    "/share-experience",
    "/dashboard",
  ].some((route) => pathname === route || pathname.startsWith(route + "/"));

  return (
    <>
      {!hideNavbarFooterWhatsApp && <Navbar />}
      {children}
      {!hideNavbarFooterWhatsApp && <Footer />}
      {!hideNavbarFooterWhatsApp && <FloatingWhatsApp />}
    </>
  );
}
