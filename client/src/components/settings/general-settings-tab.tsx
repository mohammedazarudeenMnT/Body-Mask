"use client";

import { useState, useEffect } from "react";
import {
  Building,
  Save,
  MapPin,
  Globe,
  Phone,
  Mail,
  Clock,
  FileText,
  Info,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { ImageUpload, CompactImageUpload } from "../ui/image-upload";

interface GeneralSettingsTabProps {
  onMessage?: (message: { type: "success" | "error"; text: string }) => void;
}

export function GeneralSettingsTab({ onMessage }: GeneralSettingsTabProps) {
  const [settings, setSettings] = useState({
    companyName: "",
    companyDescription: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
    workingHours: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      whatsapp: "",
    },
    whatsappNumber: "",
    termsAndConditions: "",
    privacyPolicy: "",
    latitude: "",
    longitude: "",
    googleMapEmbed: "",
    footerNote: "",
    companyLogo: "",
    favicon: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axiosInstance.get("/api/settings/general");
        setSettings({
          companyName: res.data.companyName || "",
          companyDescription: res.data.companyDescription || "",
          companyAddress: res.data.companyAddress || "",
          companyEmail: res.data.companyEmail || "",
          companyPhone: res.data.companyPhone || "",
          workingHours: res.data.workingHours || "",
          socialMedia: {
            facebook: res.data.socialMedia?.facebook || "",
            instagram: res.data.socialMedia?.instagram || "",
            twitter: res.data.socialMedia?.twitter || "",
            linkedin: res.data.socialMedia?.linkedin || "",
            whatsapp: res.data.socialMedia?.whatsapp || "",
          },
          whatsappNumber: res.data.whatsappNumber || "",
          termsAndConditions: res.data.termsAndConditions || "",
          privacyPolicy: res.data.privacyPolicy || "",
          latitude: res.data.latitude || "",
          longitude: res.data.longitude || "",
          googleMapEmbed: res.data.googleMapEmbed || "",
          footerNote: res.data.footerNote || "",
          companyLogo: res.data.companyLogo || "",
          favicon: res.data.favicon || "",
        });
      } catch (error) {
        console.error("Failed to fetch settings", error);
        if (onMessage) {
          onMessage({
            type: "error",
            text: "Failed to fetch general settings",
          });
        }
      }
    }
    fetchSettings();
  }, [onMessage]);

  const handleGenerateMapEmbed = () => {
    if (settings.latitude && settings.longitude) {
      const lat = settings.latitude;
      const lng = settings.longitude;
      const zoom = 15;
      const embedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d${
        zoom * 1000
      }!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}%2C${lng}!5e0!3m2!1sen!2s!4v${Date.now()}!5m2!1sen!2s`;
      setSettings({ ...settings, googleMapEmbed: embedUrl });
      toast.success("Map embed URL generated successfully!");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axiosInstance.post("/api/settings/general", settings);
      const message = "General settings saved successfully!";
      toast.success(message);
      if (onMessage) {
        onMessage({ type: "success", text: message });
      }
      if (res.data) {
        setSettings((prev) => ({
          ...prev,
          ...res.data,
        }));
      }
    } catch (error) {
      console.error("Failed to save settings", error);
      const errorMessage = "Failed to save general settings";
      toast.error(errorMessage);
      if (onMessage) {
        onMessage({ type: "error", text: errorMessage });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#c5a367]/10 via-[#c5a367]/5 to-transparent p-6 rounded-xl border border-[#c5a367]/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c5a367]/10 rounded-lg shadow-sm">
            <Building className="w-6 h-6 text-[#c5a367]" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              General Settings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Configure your company information, branding, contact details, and
              social media presence. These settings are displayed across your
              website and communications.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Branding Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <Building className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Branding Assets
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Logo */}
            <ImageUpload
              value={settings.companyLogo}
              onChange={(imageData) =>
                setSettings({ ...settings, companyLogo: imageData || "" })
              }
              maxSizeMB={5}
              aspectRatio="square"
              label="Company Logo"
              helperText="PNG or JPG, max 5MB. Will be displayed in the header. Recommended: 400x400px"
              showSizeLimit={false}
              className="max-w-xs"
            />

            {/* Favicon */}
            <CompactImageUpload
              value={settings.favicon}
              onChange={(imageData) =>
                setSettings({ ...settings, favicon: imageData || "" })
              }
              maxSizeMB={1}
              accept="image/*,.ico"
              size="md"
              label="Browser Favicon"
              helperText="ICO, PNG or SVG, max 1MB. Appears in browser tabs. Recommended: 32x32px"
              showSizeLimit={false}
            />
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <Building className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Company Information
            </h3>
          </div>

          <div className="grid gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                  placeholder="Body Mask Studio"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={settings.companyPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, companyPhone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Company Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors resize-none"
                value={settings.companyDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    companyDescription: e.target.value,
                  })
                }
                placeholder="A brief description of your company and services..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={settings.companyEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, companyEmail: e.target.value })
                  }
                  placeholder="contact@bodymask.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Working Hours
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                  value={settings.workingHours}
                  onChange={(e) =>
                    setSettings({ ...settings, workingHours: e.target.value })
                  }
                  placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Business Address
              </label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors resize-none"
                value={settings.companyAddress}
                onChange={(e) =>
                  setSettings({ ...settings, companyAddress: e.target.value })
                }
                placeholder="123 Main Street, City, State, ZIP Code"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Business Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.whatsappNumber}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappNumber: e.target.value })
                }
                placeholder="+1 555 123 4567"
              />
              <p className="text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>Used for WhatsApp quick contact feature</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <Globe className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Social Media Links
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                Instagram
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.socialMedia.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.socialMedia.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Twitter className="w-4 h-4 text-sky-500" />
                Twitter
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.socialMedia.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-700" />
                LinkedIn
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.socialMedia.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      linkedin: e.target.value,
                    },
                  })
                }
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                WhatsApp Link
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.socialMedia.whatsapp}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      whatsapp: e.target.value,
                    },
                  })
                }
                placeholder="https://wa.me/15551234567"
              />
            </div>
          </div>
        </div>

        {/* Location Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <MapPin className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Location & Map
            </h3>
          </div>

          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors font-mono text-sm"
                  value={settings.latitude}
                  onChange={(e) =>
                    setSettings({ ...settings, latitude: e.target.value })
                  }
                  placeholder="40.7128"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors font-mono text-sm"
                  value={settings.longitude}
                  onChange={(e) =>
                    setSettings({ ...settings, longitude: e.target.value })
                  }
                  placeholder="-74.0060"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Google Maps Embed URL
                </label>
                <button
                  type="button"
                  onClick={handleGenerateMapEmbed}
                  disabled={!settings.latitude || !settings.longitude}
                  className="px-3 py-1.5 bg-[#c5a367]/10 text-[#c5a367] rounded-lg hover:bg-[#c5a367]/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition-colors"
                >
                  Auto-Generate from Coordinates
                </button>
              </div>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors font-mono text-xs resize-none"
                value={settings.googleMapEmbed}
                onChange={(e) =>
                  setSettings({ ...settings, googleMapEmbed: e.target.value })
                }
                placeholder="https://www.google.com/maps/embed?..."
              />
              <p className="text-xs text-gray-500 flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>
                  You can get this from Google Maps: Share → Embed a map → Copy
                  HTML
                </span>
              </p>
            </div>

            {settings.googleMapEmbed && (
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="h-64 bg-gray-50 flex items-center justify-center">
                  <iframe
                    title="Google Map Preview"
                    srcDoc={
                      settings.googleMapEmbed.includes("<iframe")
                        ? `
                        <html>
                          <head>
                            <style>
                              html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
                              iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
                            </style>
                          </head>
                          <body>${settings.googleMapEmbed}</body>
                        </html>
                        `
                        : `<html><body style="margin:0;padding:0;height:100%"><iframe src="${settings.googleMapEmbed}" width="100%" height="100%" style="border:0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></body></html>`
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-600">Map Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Policies & Legal */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-[#c5a367]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[#c5a367]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Policies & Legal Content
            </h3>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors resize-none"
                value={settings.termsAndConditions}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    termsAndConditions: e.target.value,
                  })
                }
                placeholder="Enter your terms and conditions here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Privacy Policy
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors resize-none"
                value={settings.privacyPolicy}
                onChange={(e) =>
                  setSettings({ ...settings, privacyPolicy: e.target.value })
                }
                placeholder="Enter your privacy policy here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Footer Copyright Text
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] transition-colors"
                value={settings.footerNote}
                onChange={(e) =>
                  setSettings({ ...settings, footerNote: e.target.value })
                }
                placeholder="© 2024 Body Mask. All rights reserved."
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-gray-50/50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#c5a367]/10 rounded-lg mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Ready to save changes?
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                All changes are automatically encrypted and stored securely
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-[#c5a367] text-white rounded-lg hover:bg-[#c5a367]/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
