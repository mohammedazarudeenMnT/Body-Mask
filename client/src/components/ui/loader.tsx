import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface LoaderProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24 md:w-28 md:h-28", // scalable size
} as const;

export const Loader = React.forwardRef<HTMLImageElement, LoaderProps>(
  ({ className, size = "md" }, ref) => {
    return (
      <Image
        ref={ref}
        src="/assets/loader/Make-Up-Art.gif"
        alt="Loading..."
        width={112}
        height={112}
        className={cn("object-contain", sizeStyles[size], className)}
        unoptimized={true}
        priority={true}
      />
    );
  },
);
Loader.displayName = "Loader";
