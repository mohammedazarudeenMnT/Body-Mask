"use client";

import { useState, useEffect, use } from "react";
import { CheckCircle2, AlertCircle, X, Edit3, Loader2 } from "lucide-react";
import { ServiceForm } from "@/components/dashboard/services/service-form";
import { cn } from "@/lib/utils";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: EditPageProps) {
  const { id } = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await serviceApi.getServiceById(id);
        if (response.success) {
          setService(response.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setMessage({ type: "error", text: "Failed to load service details" });
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleMessage = (newMessage: {
    type: "success" | "error";
    text: string;
  }) => {
    setMessage(newMessage);
    setTimeout(() => setMessage(null), 5000);
  };

  const dismissMessage = () => {
    setMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#c5a367]/20 rounded-full" />
          <div className="w-16 h-16 border-4 border-[#c5a367] border-t-transparent rounded-full animate-spin absolute top-0" />
        </div>
        <p className="text-sm font-serif text-[#c5a367] animate-pulse">
          Retrieving artistry details...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-linear-to-r from-white via-white to-[#c5a367]/5 rounded-3xl shadow-sm border border-gray-100 p-10">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-[#c5a367]/10 rounded-2xl shadow-inner">
            <Edit3 className="w-10 h-10 text-[#c5a367]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-gray-900">
              Refine Your Vision
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              Editing{" "}
              <span className="text-[#c5a367] font-bold">
                "{service?.title}"
              </span>
              . Perfect the presentation and details of this exclusive studio
              offering.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {message && (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-in slide-in-from-top-2 fade-in duration-300">
          <div
            className={cn(
              "flex items-start gap-4 p-5 rounded-3xl border shadow-xl backdrop-blur-xl",
              message.type === "success"
                ? "bg-white/90 border-green-100 text-green-800"
                : "bg-white/90 border-red-100 text-red-800",
            )}
          >
            <div
              className={cn(
                "p-2 rounded-xl",
                message.type === "success" ? "bg-green-100" : "bg-red-100",
              )}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm font-semibold">{message.text}</p>
            </div>
            <button
              onClick={dismissMessage}
              className="p-1 hover:bg-black/5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {service && (
        <ServiceForm initialData={service} onMessage={handleMessage} />
      )}
    </div>
  );
}
