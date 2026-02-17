"use client";

import { useState } from "react";
import {
  Settings,
  Building,
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GeneralSettingsTab } from "./settings/general-settings-tab";
import { EmailSettingsTab } from "./settings/email-settings-tab";
import { SEOSettingsTab } from "./settings/seo-settings-tab";
import { BannerSettingsTab } from "./settings/banner-settings-tab";
import { PageBannerSettingsTab } from "./settings/page-banner-settings-tab";
import { ImageIcon, Layout } from "lucide-react";

const tabs = [
  {
    id: "general",
    label: "General",
    icon: Building,
    description: "Company info & branding",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    description: "SMTP configuration",
  },
  {
    id: "seo",
    label: "SEO",
    icon: Search,
    description: "Search optimization",
  },
  {
    id: "banners",
    label: "Banners",
    icon: ImageIcon,
    description: "Home page carousel",
  },
  {
    id: "page-banners",
    label: "Page Banners",
    icon: Layout,
    description: "Sub-page hero images",
  },
];

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleMessage = (newMessage: {
    type: "success" | "error";
    text: string;
  }) => {
    setMessage(newMessage);
    // Auto-clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  const dismissMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-white via-white to-[#c5a367]/5 rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-[#c5a367]/20 to-[#c5a367]/10 rounded-xl shadow-sm">
                  <Settings className="w-8 h-8 text-[#c5a367]" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Settings
                  </h1>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Manage your bridal studio configuration, communications, and
                    online presence with ease. Keep your information up-to-date
                    and ensure optimal performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Toast Message */}
          {message && (
            <div
              className={cn(
                "fixed top-4 right-4 z-50 max-w-md w-full animate-in slide-in-from-top-2 fade-in duration-300",
              )}
            >
              <div
                className={cn(
                  "flex items-start gap-4 p-5 rounded-xl border shadow-lg backdrop-blur-md",
                  message.type === "success"
                    ? "bg-gradient-to-r from-green-50 to-emerald-50/80 border-green-200 text-green-800"
                    : "bg-gradient-to-r from-red-50 to-rose-50/80 border-red-200 text-red-800",
                )}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{message.text}</p>
                </div>
                <button
                  onClick={dismissMessage}
                  className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "group relative flex-1 px-6 py-4 text-center border-b-2 font-medium text-sm transition-all duration-200 ease-in-out",
                        isActive
                          ? "border-[#c5a367] text-[#c5a367] bg-[#c5a367]/5"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 hover:border-gray-300",
                      )}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <tab.icon
                          className={cn(
                            "w-5 h-5 transition-all duration-200",
                            isActive
                              ? "scale-110 text-[#c5a367]"
                              : "group-hover:scale-110 text-gray-400 group-hover:text-gray-600",
                          )}
                        />
                        <div className="flex flex-col items-start">
                          <span
                            className={cn(
                              "font-semibold transition-colors",
                              isActive ? "text-[#c5a367]" : "text-inherit",
                            )}
                          >
                            {tab.label}
                          </span>
                          <span
                            className={cn(
                              "text-xs hidden sm:block transition-colors",
                              isActive
                                ? "text-[#c5a367]/70"
                                : "text-gray-400 group-hover:text-gray-500",
                            )}
                          >
                            {tab.description}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-gray-50/30">
              <div className="animate-in fade-in duration-500">
                {activeTab === "general" && (
                  <GeneralSettingsTab onMessage={handleMessage} />
                )}
                {activeTab === "email" && (
                  <EmailSettingsTab onMessage={handleMessage} />
                )}
                {activeTab === "seo" && (
                  <SEOSettingsTab onMessage={handleMessage} />
                )}
                {activeTab === "banners" && (
                  <BannerSettingsTab onMessage={handleMessage} />
                )}
                {activeTab === "page-banners" && (
                  <PageBannerSettingsTab onMessage={handleMessage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
