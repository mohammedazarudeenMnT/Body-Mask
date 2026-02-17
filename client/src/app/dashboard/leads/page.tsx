"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Users,
  AlertCircle,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Briefcase,
  ExternalLink,
  History,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { leadApi, Lead } from "@/lib/lead-api";

const EMPTY_FORM: Partial<Lead> = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  status: "New",
};

// ─── Lead Form Modal ──────────────────────────────────────────────────────────
function LeadModal({
  lead,
  onClose,
  onSaved,
}: {
  lead: Partial<Lead> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!lead?._id;
  const [form, setForm] = useState({ ...EMPTY_FORM, ...lead });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await leadApi.updateLead(lead!._id!, form);
        toast.success("Lead updated successfully!");
      } else {
        await leadApi.createLead({ ...form, source: "Manual Entry" });
        toast.success("Lead created successfully!");
      }
      onSaved();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save lead.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a367]/10 rounded-lg">
              <Plus className="w-5 h-5 text-[#c5a367]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Lead" : "Add New Lead"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit
                  ? "Update lead information"
                  : "Manually capture a new lead inquiry"}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                className={inputCls}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Client Name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="client@email.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                className={inputCls}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Service *
              </label>
              <select
                className={inputCls}
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
                required
              >
                <option value="">Select Service</option>
                <option value="Bridal Makeup">Bridal Makeup</option>
                <option value="Hair Styling">Hair Styling</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Nail Art">Nail Art</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              className={inputCls}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Message / Notes
            </label>
            <textarea
              className={cn(inputCls, "min-h-[120px] resize-none")}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Additional details about the lead..."
            />
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
              {saving ? "Saving..." : isEdit ? "Update Lead" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirmation ───────────────────────────────────────────────────────
function DeleteModal({
  lead,
  onClose,
  onDeleted,
}: {
  lead: Lead;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await leadApi.deleteLead(lead._id!);
      toast.success("Lead deleted.");
      onDeleted();
    } catch {
      toast.error("Failed to delete lead.");
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
              Delete Lead
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <b>{lead.name}</b>&apos;s inquiry?
              This action cannot be undone.
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
            {deleting ? "Deleting..." : "Delete Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLead, setModalLead] = useState<Partial<Lead> | null | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeads = async () => {
    try {
      const res = await leadApi.getLeads();
      if (res.success) {
        setLeads(res.data);
      }
    } catch {
      toast.error("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Converted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Contacted":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Lost":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#c5a367]/10 rounded-xl">
              <Users className="w-7 h-7 text-[#c5a367]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Leads Management
              </h1>
              <p className="text-gray-500 text-sm">
                Track and manage customer inquiries and manually added leads
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalLead(null)}
            className="flex items-center justify-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c5a367]/20 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Manual Lead
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 flex-wrap items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {["All", "New", "Contacted", "Converted", "Lost"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                  statusFilter === s
                    ? "bg-[#c5a367] text-white border-[#c5a367] shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No leads found</h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#c5a367]/30 hover:shadow-md transition-all group relative"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Client Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 border border-[#c5a367]/20">
                      <span className="text-[#c5a367] font-serif font-bold text-lg">
                        {lead.name.charAt(0)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-gray-900">{lead.name}</h4>
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border",
                            getStatusColor(lead.status || "New"),
                          )}
                        >
                          {lead.status}
                        </span>
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border",
                            lead.source === "Manual Entry"
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : "bg-gray-50 text-gray-600 border-gray-100",
                          )}
                        >
                          {lead.source}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 hover:text-[#c5a367] transition-colors cursor-pointer">
                          <Mail className="w-3.5 h-3.5" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-[#c5a367] transition-colors cursor-pointer">
                          <Phone className="w-3.5 h-3.5" /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#c5a367] font-medium">
                          <Briefcase className="w-3.5 h-3.5" /> {lead.service}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Snippet */}
                  {lead.message && (
                    <div className="lg:max-w-md w-full bg-gray-50 p-3 rounded-xl border border-gray-100 relative group/msg">
                      <MessageSquare className="absolute -top-1.5 -left-1.5 w-4 h-4 text-[#c5a367] fill-[#c5a367]/10" />
                      <p className="text-xs text-gray-600 line-clamp-2 italic leading-relaxed pl-3">
                        &quot;{lead.message}&quot;
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end">
                    <div className="flex items-center gap-1.5 mr-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <History className="w-3 h-3" />
                      {new Date(lead.createdAt!).toLocaleDateString()}
                    </div>
                    {lead.status === "Converted" && (
                      <button
                        onClick={() => {
                          const message = `Hi ${lead.name}, thank you for choosing Body Mask Boutique! We hope you loved our ${lead.service} service. Could you please take a moment to share your experience with us? You can leave a review here: ${window.location.origin}/share-experience`;
                          const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, "_blank");
                          toast.success("Opening WhatsApp...");
                        }}
                        className="p-2.5 text-green-500 hover:bg-green-50 rounded-xl transition-all"
                        title="Send Review Link via WhatsApp"
                      >
                        <MessageCircle className="w-4.5 h-4.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setModalLead(lead)}
                      className="p-2.5 text-gray-400 hover:text-[#c5a367] hover:bg-[#c5a367]/10 rounded-xl transition-all"
                      title="Edit Lead"
                    >
                      <Pencil className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(lead)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalLead !== undefined && (
        <LeadModal
          lead={modalLead}
          onClose={() => setModalLead(undefined)}
          onSaved={() => {
            setModalLead(undefined);
            fetchLeads();
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          lead={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => {
            setDeleteTarget(null);
            fetchLeads();
          }}
        />
      )}
    </div>
  );
}
