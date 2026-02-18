"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scissors, CheckCircle2, AlertCircle, X } from "lucide-react";
import { ServicesList } from "@/components/dashboard/services/services-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const router = useRouter();
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
    <div className="space-y-8">
      <DashboardHeader
        title="Studio Services"
        description="Curate your luxury service menu. From dynamic bridal transformations to precision styling, manage how your artistry is presented to the world."
        icon={Scissors}
        actionLabel="New Service"
        onAction={() => router.push("/dashboard/services/new")}
      />

      {/* Toast Message */}
      {message && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 max-w-md w-full animate-in slide-in-from-top-2 fade-in duration-300",
          )}
        >
          <div
            className={cn(
              "flex items-start gap-4 p-5 rounded-3xl border shadow-xl backdrop-blur-xl",
              message.type === "success"
                ? "bg-white/90 border-green-100 text-green-800 shadow-green-900/5"
                : "bg-white/90 border-red-100 text-red-800 shadow-red-900/5",
            )}
          >
            {message.type === "success" ? (
              <div className="bg-green-100 p-2 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            )}
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-semibold">{message.text}</p>
            </div>
            <button
              onClick={dismissMessage}
              className="shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <ServicesList onMessage={handleMessage} />
      </div>
    </div>
  );
}
