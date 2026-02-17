import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showFallback?: boolean;
}

export function CompanyLogo({
  width = 150,
  height = 50,
  className,
  showFallback = true,
}: CompanyLogoProps) {
  // In a real app, this might come from a settings context or API
  const logoUrl = null;

  if (logoUrl) {
    return (
      <div className={cn("relative", className)} style={{ width, height }}>
        <Image
          src={logoUrl}
          alt="Company Logo"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  if (showFallback) {
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <span className="text-xl font-bold tracking-tighter text-primary">
          BODY MASK
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-1">
          Bridal Studio
        </span>
      </div>
    );
  }

  return null;
}
