"use client";

import { useState, useEffect } from "react";
import { videoApi, Video, getYouTubeEmbedUrl } from "@/lib/video-api";

// ─── Main VideoSection ────────────────────────────────────────────────────────
export function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    videoApi
      .getVideos()
      .then((res) => {
        if (res.success) {
          const published = (res.data as Video[]).filter(
            (v) => v.status === "Published",
          );
          published.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setVideos(published);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-[#121212] py-16 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="bg-[#121212] py-12 sm:py-16 px-1 sm:px-2">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[0.25em] uppercase text-white/90">
            Videos
          </h2>
          <div className="mt-4 mx-auto h-px w-16 sm:w-20 bg-[#c5a367]/70" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {videos.map((video) => (
            <div
              key={video._id ?? video.youtubeId}
              className="aspect-video rounded-xl overflow-hidden bg-black shadow-[0_10px_35px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
            >
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(video.youtubeId)}
                title={video.title}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
