"use client";

import { useState, useRef, DragEvent } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  /** Current image URL or base64 */
  value?: string | null;
  /** Callback when image changes */
  onChange: (imageData: string | null) => void;
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Accepted file types */
  accept?: string;
  /** Upload area aspect ratio */
  aspectRatio?: "square" | "video" | "banner" | "auto" | "portrait";
  /** Custom width class */
  className?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Show file size limit */
  showSizeLimit?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  maxSizeMB = 5,
  accept = "image/*",
  aspectRatio = "auto",
  className,
  label,
  helperText,
  showSizeLimit = true,
  disabled = false,
  required = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[3/1]",
    portrait: "aspect-[4/5]",
    auto: "aspect-auto min-h-[200px]",
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setError(null);
    setIsLoading(true);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      setIsLoading(false);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      setIsLoading(false);
      return;
    }

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError("Failed to read file");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all",
          aspectRatioClasses[aspectRatio],
          isDragging
            ? "border-[#c5a367] bg-[#c5a367]/5 scale-[1.02]"
            : value
              ? "border-gray-300 hover:border-[#c5a367]"
              : "border-gray-300 hover:border-[#c5a367] bg-gray-50",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-300 bg-red-50/50",
        )}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#c5a367] animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {value && !isLoading ? (
          <div className="relative w-full h-full group">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Upload className="w-5 h-5 text-[#c5a367]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ) : (
          // Empty State
          !isLoading && (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {isDragging
                    ? "Drop image here"
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500">
                  {accept === "image/*" ? "PNG, JPG, GIF, WebP" : accept}
                  {showSizeLimit && ` (max ${maxSizeMB}MB)`}
                </p>
              </div>
            </div>
          )
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-xs text-gray-500 flex items-start gap-1">
          <ImageIcon className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
}

// Compact version for smaller uploads (like favicon)
interface CompactImageUploadProps extends ImageUploadProps {
  size?: "sm" | "md" | "lg";
}

export function CompactImageUpload({
  size = "md",
  ...props
}: CompactImageUploadProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <ImageUpload
      {...props}
      aspectRatio="square"
      className={cn(sizeClasses[size], props.className)}
    />
  );
}
