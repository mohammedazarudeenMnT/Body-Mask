"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Trash2,
  X,
  Loader2,
  Layout,
  Star,
  CheckCircle,
  ImageIcon,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { serviceApi } from "@/lib/service-api";
import { Service, SaveServiceData } from "@/types/service";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import Link from "next/link";

interface ServiceFormProps {
  initialData?: Service | null;
  onMessage: (message: { type: "success" | "error"; text: string }) => void;
}

// Registry of SVG Icons for Selection
const SVG_ICONS: Record<string, React.ReactNode> = {
  FacialMassage: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 11v2a5 5 0 0 1-10 0v-2" />
      <path d="M10 12h-1M14 12h1" />
      <path d="M12 14v1M11 16h2" />
      <path d="M7 9a5 5 0 0 1 10 0" />
      <path d="M12 4a3.5 3.5 0 0 0-3.5 3.5M12 4a3.5 3.5 0 0 1 3.5 3.5" />
      <path d="M5 8l2 3v3h1.5M19 8l-2 3v3h-1.5" />
      <path d="M3 10l2 3v3M21 10l-2 3v3" />
      <path d="M12 18v2M7 22c1-1.5 2.5-2 5-2s4 .5 5 2" />
    </svg>
  ),
  Lotus: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c0 0 5-3 5-9c0-3-5-9-5-9c0 0-5 6-5 9c0 6 5 9 5 9z" />
      <path d="M12 22c0 0 10-3 10-9c0-2-5-5-5-5c0 0 0 5-5 14z" />
      <path d="M12 22c0 0-10-3-10-9c0-2 5-5 5-5c0 0 0 5 5 14z" />
    </svg>
  ),
  HotStone: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="18" rx="8" ry="4" />
      <ellipse cx="12" cy="13" rx="6" ry="3" />
      <ellipse cx="12" cy="9" rx="4" ry="2" />
      <path d="M7 18v-2s0-2 5-2" />
      <path d="M9 13v-1s0-1 3-1" />
      <path d="M17 18v-2s0-2-5-2" />
      <path d="M15 13v-1s0-1-3-1" />
    </svg>
  ),
  Mirror: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M9 22h6" />
      <path d="M10 7c.5-1 1.5-1.5 2.5-1.5" />
    </svg>
  ),
  Comb: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M4 12v6" />
      <path d="M6 12v4" />
      <path d="M8 12v6" />
      <path d="M10 12v4" />
      <path d="M12 12v6" />
      <path d="M14 12v4" />
      <path d="M16 12v6" />
      <path d="M18 12v4" />
      <path d="M20 12v6" />
    </svg>
  ),
  NailPolish: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 12h10v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8z" />
      <path d="M9 12V4h6v8" />
      <path d="M9 2h6v2H9z" />
      <path d="M10 16h4" />
    </svg>
  ),
  Candle: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11h10v11H7z" />
      <path d="M12 11V8" />
      <path d="M12 8c-1.5-1.5-1.5-4 0-5c1.5 1.5 1.5 4 0 5z" />
      <path d="M9 16h6" />
    </svg>
  ),
  Perfume: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="12" rx="2" />
      <path d="M9 10V6h6v4" />
      <path d="M10 6V4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9 16h6" />
    </svg>
  ),
  MakeUpBrush: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h6v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V12z" />
      <path d="M9 12c0-3 1-6 2-8s2 5 2 8" />
      <path d="M13 12c0-3 .5-6 1-8c.5 2 1 5 1 8" />
      <path d="M8 12h8" />
    </svg>
  ),
  HairDryer: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 14H6c-2 0-3-1-3-3s1-3 3-3h12" />
      <path d="M15 14v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-5" />
      <path d="M18 8V6h4v8h-4v-2" />
      <line x1="7" y1="11" x2="11" y2="11" />
    </svg>
  ),
  Towel: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
      <path d="M4 8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
      <path d="M4 12h16" />
      <path d="M4 16h16" />
    </svg>
  ),
  Sparkles: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Scissors: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" x2="8.12" y1="4" y2="15.88" />
      <line x1="14.47" x2="20" y1="14.48" y2="20" />
      <line x1="8.12" x2="12" y1="8.12" y2="12" />
    </svg>
  ),
  Clock: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  User: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Camera: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Heart: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Star: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Palette: (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  // End of SVG_ICONS
};

const ICON_OPTIONS = Object.keys(SVG_ICONS);

const IconSelector = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val: string) => void;
}) => {
  const selectedIcon =
    value && SVG_ICONS[value] ? SVG_ICONS[value] : SVG_ICONS["Sparkles"];
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-white rounded-lg border border-gray-100 text-[#c5a367] flex items-center justify-center w-8 h-8">
        {selectedIcon}
      </div>
      <select
        value={value || "Sparkles"}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-white px-3 py-2 text-sm rounded-xl outline-none border border-gray-100"
      >
        {ICON_OPTIONS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export function ServiceForm({ initialData, onMessage }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<SaveServiceData>>({
    title: "",
    description: "",
    image: "",
    isActive: true,
    order: 0,
    content: {
      fullDescription: "",
      heroImage: "",
      features: [],
      benefits: [],
      gallery: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      onMessage({
        type: "error",
        text: "Basic info (Title, Description, Image) is required",
      });
      return;
    }

    try {
      setSaving(true);
      let response;
      if (initialData?._id) {
        response = await serviceApi.updateService(
          initialData._id,
          formData as SaveServiceData,
        );
      } else {
        response = await serviceApi.createService(formData as SaveServiceData);
      }

      if (response.success) {
        onMessage({
          type: "success",
          text: `Service ${initialData?._id ? "updated" : "created"} successfully`,
        });
        setTimeout(() => router.push("/dashboard/services"), 1500);
      }
    } catch (error: any) {
      console.error("Error saving service:", error);
      const message =
        error.response?.data?.message || "An error occurred while saving";
      onMessage({ type: "error", text: message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md py-4 border-b border-gray-100 mb-8">
        <Link href="/dashboard/services">
          <Button variant="ghost" size="sm" type="button" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Services
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-[#c5a367] hover:bg-[#b59357] text-white px-8 rounded-full shadow-lg shadow-[#c5a367]/20"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {initialData?._id ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic & Media */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <Layout className="w-5 h-5 text-[#c5a367]" />
              <h3 className="text-xl font-serif text-gray-900">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Display Title
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a367]/20 outline-none transition-all"
                  placeholder="e.g., Luxury Bridal Makeup"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a367]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Short Description (Cards)
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a367]/20 outline-none min-h-[100px] transition-all"
                placeholder="A brief catchy overview..."
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#c5a367]"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Publicly Visible
              </label>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <Layout className="w-5 h-5 text-[#c5a367]" />
              <h3 className="text-xl font-serif text-gray-900">
                Service Page Details
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Detailed Journey (Rich Text)
              </label>
              <textarea
                value={formData.content?.fullDescription || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: {
                      ...formData.content!,
                      fullDescription: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a367]/20 outline-none min-h-[300px] transition-all font-light text-gray-600 leading-relaxed"
                placeholder="Describe the full experience, step by step..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Hero Overlay Image (Banner)
              </label>
              <ImageUpload
                value={formData.content?.heroImage || ""}
                onChange={(url) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content!, heroImage: url || "" },
                  })
                }
                aspectRatio="banner"
              />
              <p className="text-[10px] text-gray-400 italic">
                Optional. Used as the majestic background for the service detail
                page.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column - Media & Arrays */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <label className="font-serif text-xl text-gray-900 block border-b border-gray-50 pb-4">
              Main Preview Image
            </label>
            <ImageUpload
              value={formData.image || ""}
              onChange={(url) => setFormData({ ...formData, image: url || "" })}
              aspectRatio="portrait"
            />
          </section>

          {/* Features */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                Core Features
              </h3>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => {
                  const features = [...(formData.content?.features || [])];
                  features.push({ title: "", description: "" });
                  setFormData({
                    ...formData,
                    content: { ...formData.content!, features },
                  });
                }}
                className="text-[#C5A367] hover:bg-[#C5A367]/5"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {formData.content?.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-2xl space-y-3 relative group border border-transparent hover:border-[#c5a367]/20 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const features = formData.content?.features?.filter(
                        (_, i) => i !== idx,
                      );
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, features },
                      });
                    }}
                    className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <IconSelector
                    value={feature.icon}
                    onChange={(val) => {
                      const features = [...(formData.content?.features || [])];
                      features[idx].icon = val;
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, features },
                      });
                    }}
                  />
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => {
                      const features = [...(formData.content?.features || [])];
                      features[idx].title = e.target.value;
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, features },
                      });
                    }}
                    placeholder="Title"
                    className="w-full bg-white px-3 py-2 text-sm rounded-xl outline-none border border-gray-50"
                  />
                  <textarea
                    value={feature.description || ""}
                    onChange={(e) => {
                      const features = [...(formData.content?.features || [])];
                      features[idx].description = e.target.value;
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, features },
                      });
                    }}
                    placeholder="Description"
                    className="w-full bg-white px-3 py-2 text-sm rounded-xl outline-none border border-gray-50 min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-50 pb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                Gallery Portfolio
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Upload multiple images to showcase this service
              </p>
            </div>
            <MultiImageUpload
              value={formData.content?.gallery?.filter(Boolean) || []}
              onChange={(images) => {
                setFormData({
                  ...formData,
                  content: { ...formData.content!, gallery: images },
                });
              }}
              maxImages={20}
              maxSizeMB={5}
              helperText="Recommended: high-quality images with consistent dimensions"
            />
          </section>
        </div>
      </div>

      {/* Footer Details - FAQs & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4 mb-6">
            <h3 className="text-lg font-serif text-gray-900">
              Exclusive Benefits
            </h3>
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => {
                const benefits = [...(formData.content?.benefits || [])];
                benefits.push({ title: "", description: "" });
                setFormData({
                  ...formData,
                  content: { ...formData.content!, benefits },
                });
              }}
              className="text-[#c5a367]"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {formData.content?.benefits?.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-2xl relative group space-y-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    const benefits = formData.content?.benefits?.filter(
                      (_, i) => i !== idx,
                    );
                    setFormData({
                      ...formData,
                      content: { ...formData.content!, benefits },
                    });
                  }}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="w-3/4">
                  <IconSelector
                    value={benefit.icon}
                    onChange={(val) => {
                      const benefits = [...(formData.content?.benefits || [])];
                      benefits[idx].icon = val;
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, benefits },
                      });
                    }}
                  />
                </div>
                <input
                  value={benefit.title}
                  onChange={(e) => {
                    const benefits = [...(formData.content?.benefits || [])];
                    benefits[idx].title = e.target.value;
                    setFormData({
                      ...formData,
                      content: { ...formData.content!, benefits },
                    });
                  }}
                  placeholder="Benefit Title"
                  className="w-full bg-white px-3 py-2 text-sm rounded-xl outline-none border border-gray-50 font-bold"
                />
                <textarea
                  value={benefit.description}
                  onChange={(e) => {
                    const benefits = [...(formData.content?.benefits || [])];
                    benefits[idx].description = e.target.value;
                    setFormData({
                      ...formData,
                      content: { ...formData.content!, benefits },
                    });
                  }}
                  placeholder="Description"
                  className="w-full bg-white px-3 py-2 text-sm rounded-xl outline-none border border-gray-50 min-h-[60px]"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </form>
  );
}
