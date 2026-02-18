"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Star,
  CheckCircle,
  HelpCircle,
  ImageIcon,
  Layout,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import Link from "next/link";
import { serviceApi } from "@/lib/service-api";
import { cn } from "@/lib/utils";

interface ServicesListProps {
  onMessage: (message: { type: "success" | "error"; text: string }) => void;
}

export function ServicesList({ onMessage }: ServicesListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getServices();
      if (response.success) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      onMessage({ type: "error", text: "Failed to load services" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await serviceApi.deleteService(deleteTarget);
      if (response.success) {
        onMessage({ type: "success", text: "Service deleted successfully" });
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      onMessage({ type: "error", text: "Failed to delete service" });
    } finally {
      setDeleteTarget(null);
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
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-serif text-gray-900">Active Services</h2>
          <p className="text-gray-500 text-sm">
            Manage your studio's premium offerings.
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button className="bg-[#c5a367] hover:bg-[#b59357] text-white rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" /> Add New Service
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute top-4 left-4 flex gap-2">
                {!service.isActive && (
                  <div className="bg-gray-900/90 text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest flex items-center gap-1 backdrop-blur-md border border-white/10">
                    <EyeOff className="w-3 h-3" /> Inactive
                  </div>
                )}
                <div className="bg-white/90 text-black text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest flex items-center gap-1 backdrop-blur-md border border-white/10">
                  Order: {service.order}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-serif text-2xl mb-1">
                  {service.title}
                </h3>
                <p className="text-white/70 text-xs line-clamp-1 italic font-light">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="p-4 flex gap-2 bg-gray-50/50 backdrop-blur-sm">
              <Link
                href={`/dashboard/services/${service._id}/edit`}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-200 hover:border-[#c5a367] hover:text-[#c5a367] rounded-xl transition-all h-10"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-600 hover:bg-red-50 border-gray-200 hover:border-red-200 rounded-xl transition-all h-10"
                onClick={() => setDeleteTarget(service._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Layout className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-serif text-gray-900 mb-1">
              No Services Found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Start by adding your first premium service.
            </p>
            <Link href="/dashboard/services/new">
              <Button className="bg-[#c5a367] hover:bg-[#b59357] text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" /> Add Your First Service
              </Button>
            </Link>
          </div>
        )}
      </div>

      <ConfirmationModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete Service"
        variant="danger"
      />
    </div>
  );
}
