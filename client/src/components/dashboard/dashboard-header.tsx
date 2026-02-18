import { ReactNode } from "react";
import { LucideIcon, Plus } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  variant?: "default" | "compact";
  actionLabel?: string;
  onAction?: () => void;
}

export function DashboardHeader({
  title,
  description,
  icon: Icon,
  iconColor = "text-[#c5a367]",
  variant = "default",
  actionLabel,
  onAction,
}: DashboardHeaderProps) {
  const isCompact = variant === "compact";

  return (
    <div className="bg-linear-to-r from-white via-white to-[#c5a367]/5 rounded-3xl shadow-sm border border-gray-100 p-10">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-6 flex-1">
          <div className="p-4 bg-linear-to-br from-[#c5a367]/20 to-[#c5a367]/5 rounded-2xl shadow-inner">
            <Icon className={`w-10 h-10 ${iconColor}`} />
          </div>
          <div className="flex-1 space-y-2">
            <h1
              className={`${
                isCompact ? "text-2xl font-bold" : "text-4xl font-serif"
              } text-gray-900`}
            >
              {title}
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c5a367]/20 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            <Plus className="w-5 h-5" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
