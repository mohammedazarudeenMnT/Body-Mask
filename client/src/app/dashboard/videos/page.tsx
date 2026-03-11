"use client";

import { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Youtube,
  Play,
  Eye,
  EyeOff,
  Link,
  Plus,
  Video,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  videoApi,
  Video as VideoType,
  extractYouTubeId,
  getYouTubeThumbnail,
} from "@/lib/video-api";

const EMPTY_FORM: Partial<VideoType> = {
  title: "",
  description: "",
  youtubeUrl: "",
  youtubeId: "",
  status: "Published",
  order: 0,
};

// ─── URL Preview Component ────────────────────────────────────────────────────
function UrlPreview({ url }: { url: string }) {
  const id = extractYouTubeId(url);
  if (!url || !id) return null;

  return (
    <div className="mt-2 rounded-xl overflow-hidden border border-green-200 bg-green-50">
      <div className="flex items-center gap-2 px-3 py-2 bg-green-100">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-semibold text-green-700">
          Valid YouTube URL detected · ID: {id}
        </span>
      </div>
      <div className="relative aspect-video bg-gray-900">
        <img
          src={getYouTubeThumbnail(id, "hq")}
          alt="Video thumbnail preview"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Video Form Modal ─────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
  onSaved,
}: {
  video: Partial<VideoType> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!video?._id;
  const [form, setForm] = useState({ ...EMPTY_FORM, ...video });
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState("");

  const set = (k: string, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleUrlChange = (url: string) => {
    set("youtubeUrl", url);
    if (url && !extractYouTubeId(url)) {
      setUrlError("Invalid YouTube URL format");
    } else {
      setUrlError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.youtubeUrl) {
      toast.error("Please fill in title and YouTube URL.");
      return;
    }
    const id = extractYouTubeId(form.youtubeUrl || "");
    if (!id) {
      toast.error("Invalid YouTube URL.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await videoApi.updateVideo(video!._id!, form);
        toast.success("Video updated!");
      } else {
        await videoApi.createVideo({ ...form, youtubeId: id });
        toast.success("Video added successfully!");
      }
      onSaved();
    } catch {
      toast.error("Failed to save video.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c5a367]/20 focus:border-[#c5a367] outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Youtube className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit Video" : "Add YouTube Video"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit
                  ? "Update video details"
                  : "Paste a YouTube URL to add a video"}
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
          {/* YouTube URL Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Link className="w-4 h-4 text-red-500" />
              YouTube URL *
            </label>
            <div className="relative">
              <input
                className={cn(
                  inputCls,
                  "pr-10",
                  urlError && "border-red-300 focus:border-red-400 focus:ring-red-100",
                )}
                value={form.youtubeUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              <Youtube className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
            {urlError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {urlError}
              </p>
            )}
            <UrlPreview url={form.youtubeUrl || ""} />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Video Title *
            </label>
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Body Mask Treatment Process"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              className={cn(inputCls, "min-h-[80px] resize-none")}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of the video..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Visibility
              </label>
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Published">Published</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            {/* Order */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                className={inputCls}
                value={form.order}
                onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                min={0}
                placeholder="0"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              disabled={saving || !!urlError}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c5a367] text-white rounded-lg text-sm font-semibold hover:bg-[#b69357] disabled:opacity-60 transition-all shadow-lg shadow-[#c5a367]/20"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : isEdit ? "Update Video" : "Add Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Video Card Component ─────────────────────────────────────────────────────
function VideoCard({
  video,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  video: VideoType;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const thumbnail = !imgError
    ? getYouTubeThumbnail(video.youtubeId, "hq")
    : getYouTubeThumbnail(video.youtubeId, "hq");

  const isPublished = video.status === "Published";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col",
        isPublished ? "border-gray-100 border-l-4 border-l-green-400" : "border-gray-100 border-l-4 border-l-gray-300 opacity-75",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </a>
        </div>
        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
              isPublished
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white",
            )}
          >
            {isPublished ? "Published" : "Hidden"}
          </span>
        </div>
        {/* Order badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <GripVertical className="w-3.5 h-3.5 text-white/70" />
          <span className="text-[10px] text-white/70 font-bold">
            #{video.order}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
            {video.description}
          </p>
        )}

        {/* YouTube ID tag */}
        <div className="flex items-center gap-1.5 mb-3 mt-auto">
          <Youtube className="w-3 h-3 text-red-400" />
          <span className="text-[10px] text-gray-400 font-mono">
            {video.youtubeId}
          </span>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-gray-300 hover:text-[#c5a367] transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <button
            onClick={onToggleStatus}
            className={cn(
              "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5",
              isPublished
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100",
            )}
          >
            {isPublished ? (
              <>
                <Eye className="w-3 h-3" /> Published
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" /> Hidden
              </>
            )}
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VideosAdminPage() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVideo, setModalVideo] = useState<
    Partial<VideoType> | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<VideoType | null>(null);

  const fetchVideos = async () => {
    try {
      const res = await videoApi.getVideos();
      if (res.success) setVideos(res.data);
    } catch {
      toast.error("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleToggleStatus = async (video: VideoType) => {
    const newStatus = video.status === "Published" ? "Hidden" : "Published";
    try {
      await videoApi.updateVideo(video._id!, { status: newStatus });
      toast.success(
        `Video ${newStatus === "Published" ? "published" : "hidden"}`,
      );
      fetchVideos();
    } catch {
      toast.error("Action failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await videoApi.deleteVideo(deleteTarget._id!);
      toast.success("Video deleted.");
      setDeleteTarget(null);
      fetchVideos();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const published = videos.filter((v) => v.status === "Published").length;
  const hidden = videos.filter((v) => v.status === "Hidden").length;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader
          title="Videos"
          description="Manage YouTube videos displayed on your website"
          icon={Youtube}
          variant="compact"
          iconColor="text-red-500"
          actionLabel="Add Video"
          onAction={() => setModalVideo(null)}
        />

        {/* Stats row */}
        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Total Videos",
                value: videos.length,
                color: "text-[#c5a367]",
                bg: "bg-[#c5a367]/10",
                icon: Video,
              },
              {
                label: "Published",
                value: published,
                color: "text-green-600",
                bg: "bg-green-50",
                icon: Eye,
              },
              {
                label: "Hidden",
                value: hidden,
                color: "text-gray-500",
                bg: "bg-gray-100",
                icon: EyeOff,
              },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
              >
                <div className={cn("p-3 rounded-xl", bg)}>
                  <Icon className={cn("w-5 h-5", color)} />
                </div>
                <div>
                  <div className={cn("text-2xl font-bold", color)}>{value}</div>
                  <div className="text-xs text-gray-500 font-medium">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-32 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Youtube className="w-10 h-10 text-red-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No videos yet
            </h3>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
              Add your first YouTube video by pasting a URL. Videos will be
              displayed beautifully on your website.
            </p>
            <button
              onClick={() => setModalVideo(null)}
              className="inline-flex items-center gap-2 bg-[#c5a367] hover:bg-[#b69357] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c5a367]/20 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add First Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onEdit={() => setModalVideo(video)}
                onDelete={() => setDeleteTarget(video)}
                onToggleStatus={() => handleToggleStatus(video)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalVideo !== undefined && (
        <VideoModal
          video={modalVideo}
          onClose={() => setModalVideo(undefined)}
          onSaved={() => {
            setModalVideo(undefined);
            fetchVideos();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Delete Video?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-700">
                &quot;{deleteTarget.title}&quot;
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
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
