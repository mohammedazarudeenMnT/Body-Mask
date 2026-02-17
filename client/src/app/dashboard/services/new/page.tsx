"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, X, Sparkles } from "lucide-react";
import { ServiceForm } from "@/components/dashboard/services/service-form";
import { cn } from "@/lib/utils";

export default function NewServicePage() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-linear-to-r from-white via-white to-[#c5a367]/5 rounded-3xl shadow-sm border border-gray-100 p-10">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-[#c5a367]/10 rounded-2xl shadow-inner">
            <Sparkles className="w-10 h-10 text-[#c5a367]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-gray-900">
              Add New Masterpiece
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              Define a new premium service. Fill in the intricate details that
              set your artistry apart from the rest.
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

      <ServiceForm onMessage={handleMessage} />
    </div>
  );
}
