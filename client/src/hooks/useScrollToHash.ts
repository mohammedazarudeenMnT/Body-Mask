"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 100);
    }
  }, [pathname]);
}
