"use client";

import { useState, useRef, DragEvent } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  /** Array of current image URLs or base64 strings */
  value: string[];
  /** Callback when images change */
  onChange: (images: string[]) => void;
  /** Maximum file size per image in MB */
  maxSizeMB?: number;
  /** Maximum number of images */
  maxImages?: number;
  /** Accepted file types */
  accept?: string;
  /** Custom width class */
  className?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxSizeMB = 5,
  maxImages = 20,
  accept = "image/*",
  className,
  label,
  helperText,
  disabled = false,
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setError(null);

    // Check max count
    const remaining = maxImages - value.length;
    if (remaining <= 0) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToProcess = fileArray.slice(0, remaining);
    if (fileArray.length > remaining) {
      setError(
        `Only ${remaining} more image${remaining !== 1 ? "s" : ""} can be added (max ${maxImages})`,
      );
    }

    // Validate files
    const validFiles: File[] = [];
    for (const file of filesToProcess) {
      if (!file.type.startsWith("image/")) continue;
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        setError(`"${file.name}" exceeds ${maxSizeMB}MB limit`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsLoading(true);
    try {
      const results = await Promise.all(validFiles.map(readFileAsBase64));
      onChange([...value, ...results]);
    } catch {
      setError("Failed to process some images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Thumbnail Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group shadow-sm"
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / Add button */}
      {value.length < maxImages && (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all min-h-[140px] flex items-center justify-center",
            isDragging
              ? "border-[#c5a367] bg-[#c5a367]/5 scale-[1.01]"
              : "border-gray-300 hover:border-[#c5a367] bg-gray-50",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-300 bg-red-50/50",
          )}
        >
          {isLoading ? (
            <div className="text-center py-6">
              <Loader2 className="w-8 h-8 text-[#c5a367] animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Processing images...</p>
            </div>
          ) : (
            <div className="text-center py-6 px-4">
              <Images className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragging
                  ? "Drop images here"
                  : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-gray-500">
                Select multiple images · PNG, JPG, WebP (max {maxSizeMB}MB each)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {value.length} / {maxImages} images
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      )}

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
          <ImageIcon className="w-3 h-3 shrink-0 mt-0.5" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
}
