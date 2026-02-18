"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Save,
  Info,
  Globe,
  FileText,
  Tag,
  Eye,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { ImageUpload } from "../ui/image-upload";
import { cn } from "@/lib/utils";

interface SEOSettingsTabProps {
  onMessage?: (message: { type: "success" | "error"; text: string }) => void;
}

const STUDIO_PAGES = [
  { id: "home", label: "Home", icon: "🏠", description: "Main landing page" },
  {
    id: "about",
    label: "About Us",
    icon: "ℹ️",
    description: "Company information",
  },
  {
    id: "services",
    label: "Services",
    icon: "✨",
    description: "Services offered",
  },
  {
    id: "offers",
    label: "Offers",
    icon: "✨",
    description: "Offers",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: "🖼️",
    description: "Portfolio & images",
  },
  {
    id: "contact",
    label: "Contact Us",
    icon: "📧",
    description: "Contact information",
  },
];

export function SEOSettingsTab({ onMessage }: SEOSettingsTabProps) {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPageId, setSelectedPageId] = useState("home");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchSEO() {
      try {
        const res = await axiosInstance.get("/api/seo");
        const dbPages = res.data;

        // Merge predefined pages with DB data
        const mergedPages = STUDIO_PAGES.map((studioPage) => {
          const matchingDbPage = dbPages.find(
            (p: any) => p.pageName === studioPage.id,
          );
          return (
            matchingDbPage || {
              pageName: studioPage.id,
              metaTitle: "",
              metaDescription: "",
              keywords: "",
              ogImage: "",
            }
          );
        });

        setPages(mergedPages);
      } catch (error) {
        console.error("Failed to fetch SEO settings", error);
        if (onMessage) {
          onMessage({
            type: "error",
            text: "Failed to fetch SEO settings",
          });
        }
      }
    }
    fetchSEO();
  }, [onMessage]);

  const selectedPage = pages.find((p) => p.pageName === selectedPageId);
  const selectedPageIndex = pages.findIndex(
    (p) => p.pageName === selectedPageId,
  );
  const pageInfo = STUDIO_PAGES.find((p) => p.id === selectedPageId);

  const handleSave = async () => {
    if (!selectedPage) return;

    setIsSaving(true);
    try {
      const res = await axiosInstance.post(
        `/api/seo/${selectedPage.pageName}`,
        selectedPage,
      );
      const message = `SEO settings for ${selectedPage.pageName} page saved successfully!`;
      toast.success(message);
      if (onMessage) {
        onMessage({ type: "success", text: message });
      }
      // Update local state with the returned data from server
      const newPages = pages.map((p) =>
        p.pageName === selectedPage.pageName ? res.data.data : p,
      );
      setPages(newPages);
    } catch (error) {
      console.error("Failed to save SEO settings", error);
      const errorMessage = `Failed to save SEO settings for ${selectedPage.pageName}`;
      toast.error(errorMessage);
      if (onMessage) {
        onMessage({ type: "error", text: errorMessage });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateSelectedPage = (field: string, value: string) => {
    if (selectedPageIndex === -1) return;
    const newPages = [...pages];
    newPages[selectedPageIndex][field] = value;
    setPages(newPages);
  };

  const getCharCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 100) return "text-red-600";
    if (percentage > 80) return "text-yellow-600";
    return "text-gray-500";
  };

  const getOptimizationStatus = (page: any) => {
    const titleLength = page?.metaTitle?.length || 0;
    const descLength = page?.metaDescription?.length || 0;
    const hasKeywords = (page?.keywords || "").length > 0;
    const hasImage = (page?.ogImage || "").length > 0;

    const isTitleOptimal = titleLength >= 50 && titleLength <= 60;
    const isDescOptimal = descLength >= 150 && descLength <= 160;

    if (isTitleOptimal && isDescOptimal && hasKeywords && hasImage) {
      return { status: "excellent", label: "Excellent", color: "green" };
    } else if (titleLength > 0 && descLength > 0) {
      return { status: "good", label: "Good", color: "blue" };
    } else {
      return { status: "incomplete", label: "Incomplete", color: "gray" };
    }
  };

  if (!selectedPage) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Loading SEO settings...</p>
      </div>
    );
  }

  const titleLength = selectedPage.metaTitle?.length || 0;
  const descLength = selectedPage.metaDescription?.length || 0;
  const isTitleOptimal = titleLength >= 50 && titleLength <= 60;
  const isDescOptimal = descLength >= 150 && descLength <= 160;

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#c5a367]/10 via-[#c5a367]/5 to-transparent p-6 rounded-xl border border-[#c5a367]/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c5a367]/10 rounded-lg shadow-sm">
            <Search className="w-6 h-6 text-[#c5a367]" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              SEO & Meta Settings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Optimize each page for search engines and social sharing. Improve
              visibility and click-through rates with strategic meta
              information.
            </p>
          </div>
        </div>
      </div>

      {/* Page Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#c5a367]" />
            Select Page to Edit
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {STUDIO_PAGES.map((page) => {
              const pageData = pages.find((p) => p.pageName === page.id);
              const optimization = getOptimizationStatus(pageData);
              const isActive = selectedPageId === page.id;

              return (
                <button
                  key={page.id}
                  onClick={() => setSelectedPageId(page.id)}
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all text-left group",
                    isActive
                      ? "border-[#c5a367] bg-gradient-to-br from-[#c5a367]/5 to-[#c5a367]/2 shadow-md"
                      : "border-gray-200 hover:border-[#c5a367]/50 hover:bg-gray-50 hover:shadow-sm",
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {page.icon}
                    </span>
                    {optimization.status === "excellent" && (
                      <div className="bg-green-100 rounded-full p-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    {page.label}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        optimization.color === "green" &&
                          "bg-green-500 shadow-sm",
                        optimization.color === "blue" &&
                          "bg-blue-500 shadow-sm",
                        optimization.color === "gray" && "bg-gray-400",
                      )}
                    />
                    <span className="text-xs text-gray-600 font-medium">
                      {optimization.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Page Editor */}
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{pageInfo?.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {pageInfo?.label} Page
                </h3>
                <p className="text-sm text-gray-600">{pageInfo?.description}</p>
              </div>
            </div>
            {isTitleOptimal && isDescOptimal && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Optimized
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Meta Fields (2/3 width) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Meta Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#c5a367]" />
                    Meta Title
                    <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={cn(
                      "text-xs font-mono",
                      getCharCountColor(titleLength, 60),
                    )}
                  >
                    {titleLength}/60
                  </span>
                </div>
                <input
                  type="text"
                  className={cn(
                    "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 transition-colors",
                    titleLength > 60
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#c5a367]",
                  )}
                  value={selectedPage.metaTitle || ""}
                  onChange={(e) =>
                    updateSelectedPage("metaTitle", e.target.value)
                  }
                  placeholder="Luxury Bridal Studio & Makeup Artist | Body Mask"
                  maxLength={100}
                />
                <div className="flex items-start gap-2">
                  {isTitleOptimal ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-gray-500">
                    {isTitleOptimal
                      ? "Perfect length!"
                      : "Aim for 50-60 characters for best display"}
                  </p>
                </div>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#c5a367]" />
                    Meta Description
                    <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={cn(
                      "text-xs font-mono",
                      getCharCountColor(descLength, 160),
                    )}
                  >
                    {descLength}/160
                  </span>
                </div>
                <textarea
                  rows={3}
                  className={cn(
                    "w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 transition-colors resize-none",
                    descLength > 160
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-[#c5a367]",
                  )}
                  value={selectedPage.metaDescription || ""}
                  onChange={(e) =>
                    updateSelectedPage("metaDescription", e.target.value)
                  }
                  placeholder="Experience the pinnacle of bridal beauty at Body Mask. Premium makeup artistry, luxury treatments, and expert styling for your special day."
                  maxLength={200}
                />
                <div className="flex items-start gap-2">
                  {isDescOptimal ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-gray-500">
                    {isDescOptimal
                      ? "Excellent description!"
                      : "Keep between 150-160 characters"}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#c5a367]" />
                  Keywords
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={selectedPage.keywords || ""}
                  onChange={(e) =>
                    updateSelectedPage("keywords", e.target.value)
                  }
                  placeholder="bridal makeup, wedding studio, beauty salon"
                />
                <p className="text-xs text-gray-500 flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>Separate with commas. Use 5-10 relevant keywords.</span>
                </p>
              </div>

              {/* Search Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  Google Search Preview
                </h4>
                <div className="space-y-1">
                  <div className="text-sm text-blue-600 font-medium line-clamp-1">
                    {selectedPage.metaTitle ||
                      "Your page title will appear here"}
                  </div>
                  <div className="text-xs text-green-700">
                    bodymask.com/{selectedPage.pageName}
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">
                    {selectedPage.metaDescription ||
                      "Your meta description will appear here"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image & Actions */}
            <div className="space-y-4">
              <ImageUpload
                value={selectedPage.ogImage}
                onChange={(imageData) =>
                  updateSelectedPage("ogImage", imageData || "")
                }
                maxSizeMB={5}
                aspectRatio="video"
                label="Social Share Image"
                helperText="1200×630px recommended for social media sharing"
              />

              {/* Quick Stats */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <h4 className="text-xs font-semibold text-gray-700">
                  SEO Score
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Meta Title</span>
                    {isTitleOptimal ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Meta Description</span>
                    {isDescOptimal ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Keywords</span>
                    {selectedPage.keywords ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Social Image</span>
                    {selectedPage.ogImage ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#c5a367] text-white rounded-lg hover:bg-[#c5a367]/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save className="w-5 h-5" />
                {isSaving ? "Saving..." : `Save ${pageInfo?.label} SEO`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
