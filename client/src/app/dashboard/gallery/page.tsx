"use client";

import { useState, useEffect, useRef } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Plus,
  GripVertical,
  Upload,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { galleryApi, GalleryItem } from "@/lib/gallery-api";
import { eventTypeApi, EventType } from "@/lib/event-type-api";

const EMPTY_FORM: Partial<GalleryItem> = {
  title: "",
  eventType: "",
  status: "Published",
  order: 0,
};

// ─── Event Type Form Modal ────────────────────────────────────────────────────
function EventTypeFormModal({
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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

// ─── Event Types Management Modal ─────────────────────────────────────────────
function EventTypesModal({
  eventTypes,
  onClose,
  onRefresh,
}: {
  eventTypes: EventType[];
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [formModalItem, setFormModalItem] = useState<Partial<EventType> | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<EventType | null>(null);

  const handleToggleStatus = async (item: EventType) => {
    try {
      await eventTypeApi.updateEventType(item._id!, { isActive: !item.isActive });
      toast.success(`Event type ${!item.isActive ? "activated" : "deactivated"}`);
      onRefresh();
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
      onRefresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#c5a367]/10 rounded-lg">
                <Tag className="w-5 h-5 text-[#c5a367]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Manage Event Types</h2>
                <p className="text-xs text-gray-500">Create and manage event categories for gallery</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFormModalItem(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c5a367] text-white rounded-lg text-sm font-semibold hover:bg-[#b69357] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Event Type
              </button>
              <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {eventTypes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#c5a367]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-[#c5a367]/40" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No event types yet</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Create event types to categorize your gallery images.
                </p>
                <button
                  onClick={() => setFormModalItem(null)}
                  className="inline-flex items-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-semibold px-6 py-2.5 rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
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
                      item.isActive ? "border-gray-200 border-l-4 border-l-green-400" : "border-gray-200 border-l-4 border-l-gray-300 opacity-75"
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
                      <button onClick={() => setFormModalItem(item)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
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
        </div>
      </div>

      {formModalItem !== undefined && (
        <EventTypeFormModal
          item={formModalItem}
          onClose={() => setFormModalItem(undefined)}
          onSaved={() => {
            setFormModalItem(undefined);
            onRefresh();
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
    </>
  );
}

// ─── Image Upload Component ──────────────────────────────────────────────────
function ImageUpload({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (base64: string) => void 
}) {
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#c5a367] hover:bg-[#c5a367]/5 transition-all overflow-hidden group",
          preview && "border-solid"
        )}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center text-white">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm font-semibold">Change Image</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <div className="p-4 bg-white rounded-full shadow-sm mb-3">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#c5a367] transition-colors" />
            </div>
            <span className="text-sm font-medium">Click to upload image</span>
            <span className="text-[10px] text-[#c5a367] font-bold mt-1">Recommended: 1200 × 1200px</span>
            <span className="text-xs mt-0.5 text-gray-400">PNG, JPG, WebP up to 5MB</span>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

// ─── Gallery Modal ────────────────────────────────────────────────────────────
function GalleryModal({
  item,
  onClose,
  onSaved,
  eventTypes,
}: {
  item: Partial<GalleryItem> | null;
  onClose: () => void;
  onSaved: () => void;
  eventTypes: EventType[];
}) {
  const isEdit = !!item?._id;
  const eventTypeId = typeof item?.eventType === 'object' && item?.eventType?._id 
    ? item.eventType._id 
    : typeof item?.eventType === 'string' 
    ? item.eventType 
    : "";
    
  const [form, setForm] = useState({ 
    title: item?.title || "",
    eventType: eventTypeId,
    status: item?.status || "Published",
    order: item?.order || 0,
    image: item?.imageUrl || ""
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) {
      toast.error("Please fill in title and upload an image.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await galleryApi.updateGalleryItem(item!._id!, form);
        toast.success("Gallery item updated!");
      } else {
        await galleryApi.createGalleryItem(form);
        toast.success("Gallery item added successfully!");
      }
      onSaved();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save gallery item.");
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
              <ImageIcon className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Gallery Image" : "Add Gallery Image"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit ? "Update image details" : "Upload a new image to the gallery"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Image *</label>
            <ImageUpload 
              value={form.image} 
              onChange={(base64) => setForm(f => ({ ...f, image: base64 }))} 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Luxury Car Modification"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Event Type</label>
            <select
              className={inputCls}
              value={form.eventType}
              onChange={(e) => setForm(f => ({ ...f, eventType: e.target.value }))}
            >
              <option value="">No Event Type</option>
              {eventTypes.filter(et => et.isActive).map(eventType => (
                <option key={eventType._id} value={eventType._id}>{eventType.name}</option>
              ))}
            </select>
            {eventTypes.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                No event types available. Create one in settings.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Visibility</label>
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => setForm(f => ({ ...f, status: e.target.value as any }))}
              >
                <option value="Published">Published</option>
                <option value="Hidden">Hidden</option>
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
              {saving ? "Saving..." : isEdit ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Gallery Card Component ──────────────────────────────────────────────────
function GalleryCard({
  item,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  item: GalleryItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  const isPublished = item.status === "Published";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col",
        isPublished ? "border-gray-100 border-l-4 border-l-green-400" : "border-gray-100 border-l-4 border-l-gray-300 opacity-75",
      )}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
            isPublished ? "bg-green-500 text-white" : "bg-gray-500 text-white",
          )}>
            {isPublished ? "Published" : "Hidden"}
          </span>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <GripVertical className="w-3.5 h-3.5 text-white/70" />
          <span className="text-[10px] text-white/70 font-bold">#{item.order}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {item.eventType && typeof item.eventType === 'object' && (
          <div className="mb-2">
            <span className="inline-block px-2 py-0.5 bg-[#c5a367]/10 text-[#c5a367] rounded-md text-[10px] font-bold uppercase tracking-wider">
              {item.eventType.name}
            </span>
          </div>
        )}
        <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-1 leading-tight">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-50 mt-auto">
          <button
            onClick={onToggleStatus}
            className={cn(
              "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5",
              isPublished ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100",
            )}
          >
            {isPublished ? <><Eye className="w-3 h-3" /> Visible</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
          </button>
          <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<Partial<GalleryItem> | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [showEventTypesModal, setShowEventTypesModal] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await galleryApi.getGalleryItems();
      if (res.success) setItems(res.data);
    } catch {
      toast.error("Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const res = await eventTypeApi.getEventTypes();
      if (res.success) setEventTypes(res.data);
    } catch {
      console.error("Failed to load event types.");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchEventTypes();
  }, []);

  const handleToggleStatus = async (item: GalleryItem) => {
    const newStatus = item.status === "Published" ? "Hidden" : "Published";
    try {
      await galleryApi.updateGalleryItem(item._id!, { status: newStatus });
      toast.success(`Item ${newStatus === "Published" ? "published" : "hidden"}`);
      fetchItems();
    } catch {
      toast.error("Action failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await galleryApi.deleteGalleryItem(deleteTarget._id!);
      toast.success("Item deleted.");
      setDeleteTarget(null);
      fetchItems();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const published = items.filter((v) => v.status === "Published").length;
  const hidden = items.filter((v) => v.status === "Hidden").length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        <DashboardHeader
          title="Gallery"
          description="Manage images displayed in the gallery section"
          icon={ImageIcon}
          variant="compact"
          iconColor="text-[#c5a367]"
          actionLabel="Add Image"
          onAction={() => setModalItem(null)}
        />

        <div className="flex items-center justify-end gap-2 -mt-4 mb-4">
          <button
            onClick={() => setShowEventTypesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Tag className="w-4 h-4" />
            Manage Event Types
          </button>
        </div>

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Images", value: items.length, color: "text-[#c5a367]", bg: "bg-[#c5a367]/10", icon: ImageIcon },
              { label: "Published", value: published, color: "text-green-600", bg: "bg-green-50", icon: Eye },
              { label: "Hidden", value: hidden, color: "text-gray-500", bg: "bg-gray-100", icon: EyeOff },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", bg)}><Icon className={cn("w-5 h-5", color)} /></div>
                <div>
                  <div className={cn("text-2xl font-bold", color)}>{value}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="aspect-square bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-32 text-center">
            <div className="w-20 h-20 bg-[#c5a367]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-[#c5a367]/40" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
              Upload your first gallery image. These images will be displayed in the gallery section of your website.
            </p>
            <button
              onClick={() => setModalItem(null)}
              className="inline-flex items-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c5a367]/20 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add First Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <GalleryCard
                key={item._id}
                item={item}
                onEdit={() => setModalItem(item)}
                onDelete={() => setDeleteTarget(item)}
                onToggleStatus={() => handleToggleStatus(item)}
              />
            ))}
          </div>
        )}
      </div>

      {modalItem !== undefined && (
        <GalleryModal
          item={modalItem}
          onClose={() => setModalItem(undefined)}
          onSaved={() => {
            setModalItem(undefined);
            fetchItems();
          }}
          eventTypes={eventTypes}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Image?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to remove <span className="font-semibold text-gray-700">&quot;{deleteTarget.title}&quot;</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showEventTypesModal && (
        <EventTypesModal
          eventTypes={eventTypes}
          onClose={() => setShowEventTypesModal(false)}
          onRefresh={fetchEventTypes}
        />
      )}
    </div>
  );
}
