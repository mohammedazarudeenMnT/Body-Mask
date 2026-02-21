"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Loader } from "@/components/ui/loader";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const loaderImageRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show loader on path change
    setIsLoading(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // Animate loader elements in
    if (bgRef.current) {
      gsap.set(bgRef.current, { y: "0%", display: "flex" });
      gsap.set(loaderImageRef.current, { opacity: 0, scale: 0.95 });

      // Entrance animation
      tl.to(loaderImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to({}, { duration: 1.5 }) // Allow gif to play
        // Exit animation
        .to(loaderImageRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(
          bgRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.2",
        )
        .set(bgRef.current, { display: "none" });
    }

    return () => {
      tl.kill();
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      <Loader ref={loaderImageRef} size="xl" />
    </div>
  );
}
