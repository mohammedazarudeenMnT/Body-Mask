"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  LayoutGrid,
  List,
} from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ImageUpload } from "@/components/ui/image-upload";

interface Offer {
  _id: string;
  expiryDate: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
}

const EMPTY_FORM = {
  expiryDate: "",
  imageUrl: "",
  isPublished: false,
};

// ─── Offer Form Modal ─────────────────────────────────────────────────────────
function OfferModal({
  offer,
  onClose,
  onSaved,
}: {
  offer: Partial<Offer> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!offer?._id;
  const [form, setForm] = useState({ ...EMPTY_FORM, ...offer });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl || !form.expiryDate) {
      toast.error("Please upload an image and set an expiry date.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await axiosInstance.put(`/api/offers/${offer!._id}`, form);
        toast.success("Offer updated!");
      } else {
        await axiosInstance.post("/api/offers", form);
        toast.success("Offer created!");
      }
      onSaved();
    } catch {
      toast.error("Failed to save offer.");
    } finally {
      setSaving(false);
    }
  };

  // Common input classes
  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a367]/10 rounded-lg">
              <ImageIcon className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Offer" : "Create New Offer"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit
                  ? "Update offer banner"
                  : "Upload offer banner and set expiry"}
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="space-y-1.5">
            <ImageUpload
              value={form.imageUrl}
              onChange={(val) => set("imageUrl", val)}
              label="Offer Banner"
              helperText="Upload a high-quality banner for the offer"
              aspectRatio="video"
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c5a367]" />
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={inputCls}
              min={new Date().toISOString().split("T")[0]}
              value={form.expiryDate ? form.expiryDate.split("T")[0] : ""}
              onChange={(e) => set("expiryDate", e.target.value)}
            />
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-800">Publish Offer</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Published offers appear on the public page
              </p>
            </div>
            <button
              type="button"
              onClick={() => set("isPublished", !form.isPublished)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors focus:outline-none",
                form.isPublished ? "bg-[#c5a367]" : "bg-gray-300",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform",
                  form.isPublished ? "translate-x-6 left-1" : "left-1",
                )}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
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
              {saving ? "Saving..." : isEdit ? "Update Offer" : "Create Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirmation ───────────────────────────────────────────────────────
function DeleteModal({
  offer,
  onClose,
  onDeleted,
}: {
  offer: Offer;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/api/offers/${offer._id}`);
      toast.success("Offer deleted.");
      onDeleted();
    } catch {
      toast.error("Failed to delete offer.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-xl shrink-0">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Delete Offer
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this offer? This action cannot be
              undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 disabled:opacity-60 transition-colors"
          >
            {deleting ? "Deleting..." : "Delete Offer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Offer Row (List View) ─────────────────────────────────────────────────────
function OfferRow({
  offer,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  offer: Offer;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  const expiry = new Date(offer.expiryDate);
  const isExpired = expiry < new Date();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#e8e0d5] hover:shadow-sm transition-all group">
      {/* Thumbnail */}
      <div className="w-24 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 relative">
        <img
          src={offer.imageUrl}
          alt="Offer Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          Created on {new Date(offer.createdAt).toLocaleDateString()}
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span
              className={cn(
                "text-xs",
                isExpired ? "text-red-500 font-medium" : "text-gray-500",
              )}
            >
              {isExpired ? "Expired" : "Expires"}: {expiry.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Status + Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTogglePublish}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
            offer.isPublished
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}
        >
          {offer.isPublished ? (
            <>
              <Eye className="w-3 h-3" /> Published
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" /> Archived
            </>
          )}
        </button>

        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-[#c5a367] hover:bg-[#c5a367]/10 rounded-lg transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Offer Card (Grid View) ────────────────────────────────────────────────────
function AdminOfferCard({
  offer,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  offer: Offer;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) {
  const expiry = new Date(offer.expiryDate);
  const isExpired = expiry < new Date();

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#e8e0d5] overflow-hidden hover:shadow-md transition-all">
      <div className="relative aspect-video">
        <img
          src={offer.imageUrl}
          alt="Offer"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2.5 right-2.5">
          <button
            onClick={onTogglePublish}
            className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md transition-colors",
              offer.isPublished
                ? "bg-green-500/90 text-white"
                : "bg-white/90 text-gray-600",
            )}
          >
            {offer.isPublished ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )}
            {offer.isPublished ? "Live" : "Draft"}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Added {new Date(offer.createdAt).toLocaleDateString()}
          </span>
          <span
            className={cn(
              "text-xs py-1 px-2 rounded-md",
              isExpired ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500",
            )}
          >
            <Calendar className="w-3 h-3 inline mr-1" />
            {expiry.toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function OffersAdminPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOffer, setModalOffer] = useState<
    Partial<Offer> | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Offer | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "archived"
  >("all");

  const fetchOffers = async () => {
    try {
      const res = await axiosInstance.get("/api/offers");
      setOffers(res.data);
    } catch {
      toast.error("Failed to load offers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const togglePublish = async (offer: Offer) => {
    try {
      await axiosInstance.put(`/api/offers/${offer._id}`, {
        ...offer,
        isPublished: !offer.isPublished,
      });
      toast.success(offer.isPublished ? "Offer archived." : "Offer published!");
      fetchOffers();
    } catch {
      toast.error("Failed to update offer status.");
    }
  };

  const filtered = offers.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "published") return o.isPublished;
    return !o.isPublished;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        {/* Page Header */}
        <DashboardHeader
          title="Offer Banners"
          description="Upload and manage promotional banners with expiry dates"
          icon={Sparkles}
          variant="compact"
          actionLabel="Create Offer"
          onAction={() => setModalOffer(null)}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex gap-1">
            {(["all", "published", "archived"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-semibold capitalize transition-all",
                  filterStatus === f
                    ? "bg-[#c5a367] text-white shadow-md shadow-[#c5a367]/20"
                    : "text-gray-500 hover:bg-gray-100",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === "list"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === "grid"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-400 hover:text-gray-600",
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-white rounded-2xl border border-gray-100 animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              No banners found
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              Start by uploading your first promotion banner
            </p>
            <button
              onClick={() => setModalOffer(null)}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all font-bold"
            >
              Upload Design
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-4">
            {filtered.map((offer) => (
              <OfferRow
                key={offer._id}
                offer={offer}
                onEdit={() => setModalOffer(offer)}
                onDelete={() => setDeleteTarget(offer)}
                onTogglePublish={() => togglePublish(offer)}
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((offer) => (
              <AdminOfferCard
                key={offer._id}
                offer={offer}
                onEdit={() => setModalOffer(offer)}
                onDelete={() => setDeleteTarget(offer)}
                onTogglePublish={() => togglePublish(offer)}
              />
            ))}
          </div>
        )}
      </div>

      {modalOffer !== undefined && (
        <OfferModal
          offer={modalOffer}
          onClose={() => setModalOffer(undefined)}
          onSaved={() => {
            setModalOffer(undefined);
            fetchOffers();
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          offer={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => {
            setDeleteTarget(null);
            fetchOffers();
          }}
        />
      )}
    </div>
  );
}
