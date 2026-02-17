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
import Link from "next/link";

interface ServiceFormProps {
  initialData?: Service | null;
  onMessage: (message: { type: "success" | "error"; text: string }) => void;
}

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
                  className="p-4 bg-gray-50 rounded-2xl space-y-2 relative group border border-transparent hover:border-[#c5a367]/20 transition-all"
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
                    className="w-full bg-white px-3 py-2 text-sm rounded-xl outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                Gallery Portfolio
              </h3>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => {
                  const gallery = [...(formData.content?.gallery || [])];
                  gallery.push("");
                  setFormData({
                    ...formData,
                    content: { ...formData.content!, gallery },
                  });
                }}
                className="text-[#C5A367] hover:bg-[#C5A367]/5"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {formData.content?.gallery?.map((img, idx) => (
                <div key={idx} className="relative group">
                  <ImageUpload
                    value={img}
                    onChange={(url) => {
                      const gallery = [...(formData.content?.gallery || [])];
                      gallery[idx] = url || "";
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, gallery },
                      });
                    }}
                    aspectRatio="square"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const gallery = formData.content?.gallery?.filter(
                        (_, i) => i !== idx,
                      );
                      setFormData({
                        ...formData,
                        content: { ...formData.content!, gallery },
                      });
                    }}
                    className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
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
                className="p-6 bg-gray-50 rounded-2xl relative group"
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
                  className="w-full bg-transparent border-none focus:ring-0 font-bold text-gray-900 p-0 mb-2"
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
                  className="w-full bg-transparent border-none focus:ring-0 text-sm p-0 min-h-[60px]"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </form>
  );
}
