import { axiosInstance } from "./axios";

export interface Video {
  _id?: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  youtubeId: string;
  status?: "Published" | "Hidden";
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const videoApi = {
  getVideos: async () => {
    const response = await axiosInstance.get("/api/videos");
    return response.data;
  },
  createVideo: async (videoData: Partial<Video>) => {
    const response = await axiosInstance.post("/api/videos", videoData);
    return response.data;
  },
  updateVideo: async (id: string, videoData: Partial<Video>) => {
    const response = await axiosInstance.put(`/api/videos/${id}`, videoData);
    return response.data;
  },
  deleteVideo: async (id: string) => {
    const response = await axiosInstance.delete(`/api/videos/${id}`);
    return response.data;
  },
};

/**
 * Extract YouTube video ID from various URL formats
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const getYouTubeThumbnail = (youtubeId: string, quality: "hq" | "maxres" = "hq") => {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}default.jpg`;
};

export const getYouTubeEmbedUrl = (youtubeId: string) => {
  return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
};
