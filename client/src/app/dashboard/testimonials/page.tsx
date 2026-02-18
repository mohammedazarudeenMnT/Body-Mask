"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  Briefcase,
  Quote,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { testimonialApi, Testimonial } from "@/lib/testimonial-api";
import { serviceApi } from "@/lib/service-api";
import { Service } from "@/types/service";
import { ImageUpload } from "@/components/ui/image-upload";

const EMPTY_FORM: Partial<Testimonial> = {
  clientName: "",
  rating: 5,
  reviewMessage: "",
  clientImage: "",
  status: "Pending",
  service: "",
};

// ─── Testimonial Form Modal ──────────────────────────────────────────────────
function TestimonialModal({
  testimonial,
  services,
  onClose,
  onSaved,
}: {
  testimonial: Partial<Testimonial> | null;
  services: Service[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!testimonial?._id;
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    ...testimonial,
    service: (testimonial?.service as any)?._id || testimonial?.service || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.rating || !form.reviewMessage) {
      toast.error("Please fill in required fields.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await testimonialApi.updateTestimonial(testimonial!._id!, form);
        toast.success("Testimonial updated!");
      } else {
        await testimonialApi.createTestimonial({
          ...form,
          source: "Manual Entry",
        });
        toast.success("Testimonial created!");
      }
      onSaved();
    } catch {
      toast.error("Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a367]/10 rounded-lg">
              <Star className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit
                  ? "Update review content"
                  : "Manually add a client testimonial"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <ImageUpload
              value={form.clientImage || ""}
              onChange={(val) => set("clientImage", val)}
              label="Client Image (Optional)"
              aspectRatio="square"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Client Name *
                </label>
                <input
                  className={inputCls}
                  value={form.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                  placeholder="e.g. Sarah J."
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Rating (1-5) *
                </label>
                <select
                  className={inputCls}
                  value={form.rating}
                  onChange={(e) => set("rating", parseInt(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Stars
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Service Linked (Optional)
              </label>
              <select
                className={inputCls}
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
              >
                <option value="">No specific service</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Pending">Pending Approval</option>
                <option value="Approved">Approved / Visible</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Review Message *
              </label>
              <textarea
                className={cn(inputCls, "min-h-[100px] resize-none")}
                value={form.reviewMessage}
                onChange={(e) => set("reviewMessage", e.target.value)}
                placeholder="What did the client say?"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c5a367] text-white rounded-lg text-sm font-semibold hover:bg-[#b69357] disabled:opacity-60 transition-all shadow-lg shadow-[#c5a367]/20"
            >
              <Save className="w-4 h-4" />
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Testimonial"
                  : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalTestimonial, setModalTestimonial] = useState<
    Partial<Testimonial> | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const fetchData = async () => {
    try {
      const [tRes, sRes] = await Promise.all([
        testimonialApi.getTestimonials(),
        serviceApi.getServices(),
      ]);
      if (tRes.success) setTestimonials(tRes.data);
      if (sRes.success) setServices(sRes.data);
    } catch {
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = async (item: Testimonial) => {
    const newStatus = item.status === "Approved" ? "Pending" : "Approved";
    try {
      await testimonialApi.updateTestimonial(item._id!, { status: newStatus });
      toast.success(
        `Review ${newStatus === "Approved" ? "Approved" : "set to Pending"}`,
      );
      fetchData();
    } catch {
      toast.error("Action failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await testimonialApi.deleteTestimonial(deleteTarget._id!);
      toast.success("Review deleted.");
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader
          title="Testimonials"
          description="Review, approve, and manage customer stories"
          icon={Star}
          variant="compact"
          iconColor="text-amber-500"
          actionLabel="Add Testimonial"
          onAction={() => setModalTestimonial(null)}
        />

        {/* List Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-32 text-center">
            <Quote className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">
              No testimonials yet
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Start by adding manual reviews or wait for customers to submit
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-all border-l-4 group"
                style={{
                  borderLeftColor:
                    item.status === "Approved" ? "#10B981" : "#F59E0B",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                      {item.clientImage ? (
                        <img
                          src={item.clientImage}
                          alt={item.clientName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase">
                          {item.clientName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {item.clientName}
                      </h4>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < item.rating
                                ? "fill-current"
                                : "text-gray-200",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModalTestimonial(item)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic line-clamp-4 flex-1 mb-4 leading-relaxed">
                  &quot;{item.reviewMessage}&quot;
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#c5a367] font-bold uppercase">
                      <Briefcase className="w-3 h-3" />
                      {(item.service as any)?.title || "General Story"}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold">
                      {new Date(item.createdAt!).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                        item.status === "Approved"
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100",
                      )}
                    >
                      {item.status === "Approved" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </>
                      )}
                    </button>
                    <div
                      className={cn(
                        "px-3 py-2 rounded-xl text-[10px] font-bold uppercase border",
                        item.source === "Manual Entry"
                          ? "bg-purple-50 text-purple-600 border-purple-100"
                          : "bg-gray-50 text-gray-600 border-gray-100",
                      )}
                    >
                      {item.source === "Manual Entry" ? "Manual" : "Public"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalTestimonial !== undefined && (
        <TestimonialModal
          testimonial={modalTestimonial}
          services={services}
          onClose={() => setModalTestimonial(undefined)}
          onSaved={() => {
            setModalTestimonial(undefined);
            fetchData();
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2">Delete Review?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to remove this testimonial from{" "}
              {deleteTarget.clientName}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 border rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
