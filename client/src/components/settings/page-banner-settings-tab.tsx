"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Image as ImageIcon,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import {
  pageBannerApi,
  PageBanner,
  SavePageBannerData,
} from "@/lib/page-banner-api";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { cn } from "@/lib/utils";

interface PageBannerSettingsTabProps {
  onMessage: (message: { type: "success" | "error"; text: string }) => void;
}

const AVAILABLE_PAGES = [
  { key: "about", label: "About Us" },
  { key: "services", label: "Services" },
  { key: "contact", label: "Contact Us" },
];

export function PageBannerSettingsTab({
  onMessage,
}: PageBannerSettingsTabProps) {
  const [banners, setBanners] = useState<PageBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBanner, setEditingBanner] =
    useState<Partial<SavePageBannerData> | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await pageBannerApi.getAllPageBanners();
      if (response.success) {
        setBanners(response.data);
      }
    } catch (error) {
      console.error("Error fetching page banners:", error);
      onMessage({ type: "error", text: "Failed to load page banners" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<SavePageBannerData>) => {
    if (!data.pageKey || !data.imageUrl) {
      onMessage({ type: "error", text: "Page and Image are required" });
      return;
    }

    try {
      setSaving(true);
      const response = await pageBannerApi.savePageBanner(
        data as SavePageBannerData,
      );
      if (response.success) {
        onMessage({ type: "success", text: "Page banner saved successfully" });
        fetchBanners();
        setEditingBanner(null);
      }
    } catch (error) {
      console.error("Error saving page banner:", error);
      onMessage({ type: "error", text: "Failed to save page banner" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page banner?")) return;

    try {
      const response = await pageBannerApi.deletePageBanner(id);
      if (response.success) {
        onMessage({
          type: "success",
          text: "Page banner deleted successfully",
        });
        fetchBanners();
      }
    } catch (error) {
      console.error("Error deleting page banner:", error);
      onMessage({ type: "error", text: "Failed to delete page banner" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a367]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Page Banners</h2>
          <p className="text-gray-500 text-sm">
            Manage single hero banners for internal pages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {AVAILABLE_PAGES.map((page) => {
          const banner = banners.find((b) => b.pageKey === page.key);
          const isEditing = editingBanner?.pageKey === page.key;

          return (
            <div
              key={page.key}
              className={cn(
                "bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300",
                banner && !banner.isActive && "opacity-75 grayscale-[0.5]",
              )}
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="font-semibold text-gray-900">
                  {page.label}
                </span>
                {banner && !isEditing && (
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 hover:text-[#c5a367]"
                      onClick={() => setEditingBanner(banner)}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(banner._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="p-4 space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Banner Image
                    </label>
                    <ImageUpload
                      value={editingBanner.imageUrl || ""}
                      onChange={(url) =>
                        setEditingBanner({
                          ...editingBanner,
                          imageUrl: url || "",
                        })
                      }
                      aspectRatio="video"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingBanner.title || ""}
                      onChange={(e) =>
                        setEditingBanner({
                          ...editingBanner,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none"
                      placeholder="Page Heading"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingBanner.subtitle || ""}
                      onChange={(e) =>
                        setEditingBanner({
                          ...editingBanner,
                          subtitle: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none"
                      placeholder="Subheading"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`active-${page.key}`}
                      checked={editingBanner.isActive !== false}
                      onChange={(e) =>
                        setEditingBanner({
                          ...editingBanner,
                          isActive: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-[#c5a367] focus:ring-[#c5a367]"
                    />
                    <label
                      htmlFor={`active-${page.key}`}
                      className="text-sm text-gray-700"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-[#c5a367] hover:bg-[#b59357] text-white"
                      size="sm"
                      onClick={() => handleSave(editingBanner)}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingBanner(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : banner ? (
                <div className="relative aspect-video">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title || page.label}
                    className="w-full h-full object-cover"
                  />
                  {!banner.isActive && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-gray-900/80 text-white text-[10px] px-2 py-1 rounded uppercase font-bold">
                        Inactive
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {banner.title || "No Title"}
                    </h3>
                    <p className="text-white/70 text-[10px] truncate">
                      {banner.subtitle || "No Subtitle"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      No Banner Set
                    </p>
                    <p className="text-xs text-gray-500">
                      Add a hero image for this page.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#c5a367] text-[#c5a367] hover:bg-[#c5a367]/5"
                    onClick={() =>
                      setEditingBanner({
                        pageKey: page.key,
                        title: "",
                        subtitle: "",
                        imageUrl: "",
                        isActive: true,
                      })
                    }
                  >
                    Add Banner
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
