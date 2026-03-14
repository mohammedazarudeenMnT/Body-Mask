"use client";

import { useState, useEffect } from "react";
import { Tag, Plus, Pencil, Trash2, Save, X, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { eventTypeApi, EventType } from "@/lib/event-type-api";
import Link from "next/link";

function EventTypeModal({
  item,
  onClose,
  onSaved,
}: {
  item: Partial<EventType> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!item?._id;
  const [form, setForm] = useState({
    name: item?.name || "",
    isActive: item?.isActive ?? true,
    order: item?.order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Event type name is required");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await eventTypeApi.updateEventType(item!._id!, form);
        toast.success("Event type updated!");
      } else {
        await eventTypeApi.createEventType(form);
        toast.success("Event type created!");
      }
      onSaved();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save event type");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a367]/10 rounded-lg">
              <Tag className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Event Type" : "Add Event Type"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit ? "Update event type details" : "Create a new event category"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Event Name *</label>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Bridal, Engagement, Reception"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                className={inputCls}
                value={form.isActive ? "active" : "inactive"}
                onChange={(e) => setForm(f => ({ ...f, isActive: e.target.value === "active" }))}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Display Order</label>
              <input
                type="number"
                className={inputCls}
                value={form.order}
                onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                min={0}
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
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<Partial<EventType> | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<EventType | null>(null);

  const fetchEventTypes = async () => {
    try {
      const res = await eventTypeApi.getEventTypes();
      if (res.success) setEventTypes(res.data);
    } catch {
      toast.error("Failed to load event types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const handleToggleStatus = async (item: EventType) => {
    try {
      await eventTypeApi.updateEventType(item._id!, { isActive: !item.isActive });
      toast.success(`Event type ${!item.isActive ? "activated" : "deactivated"}`);
      fetchEventTypes();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await eventTypeApi.deleteEventType(deleteTarget._id!);
      toast.success("Event type deleted");
      setDeleteTarget(null);
      fetchEventTypes();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/gallery">
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <DashboardHeader
            title="Event Types"
            description="Manage event categories for gallery images"
            icon={Tag}
            variant="compact"
            iconColor="text-[#c5a367]"
            actionLabel="Add Event Type"
            onAction={() => setModalItem(null)}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : eventTypes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-32 text-center">
            <div className="w-20 h-20 bg-[#c5a367]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag className="w-10 h-10 text-[#c5a367]/40" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No event types yet</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
              Create event types to categorize your gallery images by event.
            </p>
            <button
              onClick={() => setModalItem(null)}
              className="inline-flex items-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c5a367]/20"
            >
              <Plus className="w-5 h-5" />
              Add First Event Type
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((item) => (
              <div
                key={item._id}
                className={cn(
                  "bg-white rounded-xl border p-4 hover:shadow-lg transition-all",
                  item.isActive ? "border-gray-100 border-l-4 border-l-green-400" : "border-gray-100 border-l-4 border-l-gray-300 opacity-75"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        item.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                      )}>
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">Order: #{item.order}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5",
                      item.isActive ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {item.isActive ? <><Eye className="w-3 h-3" /> Active</> : <><EyeOff className="w-3 h-3" /> Inactive</>}
                  </button>
                  <button onClick={() => setModalItem(item)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalItem !== undefined && (
        <EventTypeModal
          item={modalItem}
          onClose={() => setModalItem(undefined)}
          onSaved={() => {
            setModalItem(undefined);
            fetchEventTypes();
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Event Type?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-700">&quot;{deleteTarget.name}&quot;</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
