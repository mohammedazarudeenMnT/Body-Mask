"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import { bannerApi, Banner, CreateBannerData } from "@/lib/banner-api";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { cn } from "@/lib/utils";

interface BannerSettingsTabProps {
  onMessage: (message: { type: "success" | "error"; text: string }) => void;
}

export function BannerSettingsTab({ onMessage }: BannerSettingsTabProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerApi.getAllBanners();
      if (response.success) {
        setBanners(response.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      onMessage({ type: "error", text: "Failed to load banners" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Partial<CreateBannerData>, id?: string) => {
    try {
      setSaving(true);
      if (id) {
        const response = await bannerApi.updateBanner(id, data);
        if (response.success) {
          onMessage({ type: "success", text: "Banner updated successfully" });
          fetchBanners();
          setEditingBanner(null);
        }
      } else {
        if (!data.imageUrl) {
          onMessage({ type: "error", text: "Image is required" });
          return;
        }
        const response = await bannerApi.createBanner(data as CreateBannerData);
        if (response.success) {
          onMessage({ type: "success", text: "Banner created successfully" });
          fetchBanners();
          setIsAdding(false);
          setEditingBanner(null);
        }
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      onMessage({ type: "error", text: "Failed to save banner" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const response = await bannerApi.deleteBanner(id);
      if (response.success) {
        onMessage({ type: "success", text: "Banner deleted successfully" });
        fetchBanners();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      onMessage({ type: "error", text: "Failed to delete banner" });
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      const response = await bannerApi.updateBanner(banner._id, {
        isActive: !banner.isActive,
      });
      if (response.success) {
        onMessage({
          type: "success",
          text: `Banner ${!banner.isActive ? "activated" : "deactivated"}`,
        });
        fetchBanners();
      }
    } catch (error) {
      console.error("Error toggling banner status:", error);
      onMessage({ type: "error", text: "Failed to update banner status" });
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
          <h2 className="text-2xl font-bold text-gray-900">Banner Carousel</h2>
          <p className="text-gray-500 text-sm">
            Manage the images and content displayed on the home page hero
            slider.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingBanner({
              title: "",
              subtitle: "",
              imageUrl: "",
              link: "",
              isActive: true,
              order: banners.length,
            });
          }}
          className="bg-[#c5a367] hover:bg-[#b59357] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Banner
        </Button>
      </div>

      {(isAdding || editingBanner) && (
        <div className="bg-white border-2 border-[#c5a367]/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#c5a367]" />
            {isAdding ? "New Banner" : "Edit Banner"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingBanner?.title || ""}
                  onChange={(e) =>
                    setEditingBanner({
                      ...editingBanner,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none"
                  placeholder="Main heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={editingBanner?.subtitle || ""}
                  onChange={(e) =>
                    setEditingBanner({
                      ...editingBanner,
                      subtitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none"
                  placeholder="Subheading or category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingBanner?.link || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        link: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none pl-10"
                    placeholder="/services/facial"
                  />
                  <ExternalLink className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingBanner?.order || 0}
                  onChange={(e) =>
                    setEditingBanner({
                      ...editingBanner,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367] outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Image
              </label>
              <ImageUpload
                value={editingBanner?.imageUrl || ""}
                onChange={(url: string | null) =>
                  setEditingBanner({ ...editingBanner, imageUrl: url || "" })
                }
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setEditingBanner(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleSave(editingBanner as any, editingBanner?._id)
              }
              disabled={saving}
              className="bg-[#c5a367] hover:bg-[#b59357] text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className={cn(
              "group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md",
              !banner.isActive && "opacity-75 grayscale-[0.5]",
            )}
          >
            <div className="aspect-video relative">
              <img
                src={banner.imageUrl}
                alt={banner.title || "Banner"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-sm rounded-full"
                  onClick={() => setEditingBanner(banner)}
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-sm rounded-full"
                  onClick={() => handleToggleActive(banner)}
                >
                  {banner.isActive ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-red-500/20 hover:bg-red-600 text-red-500 hover:text-white backdrop-blur-sm rounded-full"
                  onClick={() => handleDelete(banner._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {!banner.isActive && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white text-[10px] uppercase tracking-wider font-bold rounded">
                  Inactive
                </div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 text-gray-900 text-[10px] font-bold rounded shadow-sm">
                Order: {banner.order}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 truncate">
                {banner.title || "No Title"}
              </h4>
              <p className="text-gray-500 text-sm truncate">
                {banner.subtitle || "No Subtitle"}
              </p>
              {banner.link && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#c5a367] font-medium uppercase tracking-tighter">
                  <ExternalLink className="w-3 h-3" />
                  {banner.link}
                </div>
              )}
            </div>
          </div>
        ))}

        {banners.length === 0 && !isAdding && (
          <div className="col-span-full py-12 text-center bg-white border border-dashed border-gray-300 rounded-xl">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 font-medium">No banners found</h3>
            <p className="text-gray-500 text-sm mb-6">
              Get started by adding your first hero banner.
            </p>
            <Button
              onClick={() => setIsAdding(true)}
              variant="outline"
              className="border-[#c5a367] text-[#c5a367] hover:bg-[#c5a367]/5"
            >
              Add First Banner
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
