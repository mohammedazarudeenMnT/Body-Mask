"use client";

import { useState } from "react";
import { AlertCircle, Loader2, X } from "lucide-react";

interface ConfirmationModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when user cancels or closes */
  onClose: () => void;
  /** Called when user confirms — can be async */
  onConfirm: () => void | Promise<void>;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Visual variant */
  variant?: "danger" | "warning" | "default";
}

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const variantStyles = {
    danger: {
      icon: "bg-red-50",
      iconColor: "text-red-500",
      button: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-60",
    },
    warning: {
      icon: "bg-amber-50",
      iconColor: "text-amber-500",
      button: "bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60",
    },
    default: {
      icon: "bg-[#c5a367]/10",
      iconColor: "text-[#c5a367]",
      button: "bg-[#c5a367] text-white hover:bg-[#b69357] disabled:opacity-60",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 pb-0">
          <div className={`p-3 rounded-xl shrink-0 ${styles.icon}`}>
            <AlertCircle className={`w-6 h-6 ${styles.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${styles.button}`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
