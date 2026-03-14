import { axiosInstance } from "./axios";
import { EventType } from "./event-type-api";

export interface GalleryItem {
  _id?: string;
  title: string;
  imageUrl: string;
  publicId: string;
  eventType?: string | EventType;
  status?: "Published" | "Hidden";
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const galleryApi = {
  getGalleryItems: async () => {
    const response = await axiosInstance.get("/api/gallery");
    return response.data;
  },
  createGalleryItem: async (galleryData: any) => {
    const response = await axiosInstance.post("/api/gallery", galleryData);
    return response.data;
  },
  updateGalleryItem: async (id: string, galleryData: any) => {
    const response = await axiosInstance.put(`/api/gallery/${id}`, galleryData);
    return response.data;
  },
  deleteGalleryItem: async (id: string) => {
    const response = await axiosInstance.delete(`/api/gallery/${id}`);
    return response.data;
  },
};
