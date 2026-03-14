"use client";

import { useEffect } from "react";

export default function ScrollToHashWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Function to handle hash scrolling
    const scrollToHash = () => {
      const hash = window.location.hash;
      
      if (hash) {
        // Remove the # from hash
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Wait a bit for the page to fully render
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: "smooth", 
              block: "start" 
            });
          }, 100);
        }
      }
    };

    // Scroll on mount
    scrollToHash();

    // Also handle hash changes
    window.addEventListener("hashchange", scrollToHash);
    
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return <>{children}</>;
}
