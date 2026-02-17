import { axiosInstance } from "./axios";

export interface PageBanner {
  _id: string;
  pageKey: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SavePageBannerData {
  pageKey: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  isActive?: boolean;
}

export const pageBannerApi = {
  // Public
  getPageBanner: async (pageKey: string) => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: PageBanner;
    }>(`/api/page-banners/${pageKey}`);
    return response.data;
  },

  // Admin
  getAllPageBanners: async () => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: PageBanner[];
    }>("/api/page-banners");
    return response.data;
  },

  savePageBanner: async (data: SavePageBannerData) => {
    const response = await axiosInstance.post<{
      success: boolean;
      data: PageBanner;
    }>("/api/page-banners", data);
    return response.data;
  },

  deletePageBanner: async (id: string) => {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
    }>(`/api/page-banners/${id}`);
    return response.data;
  },
};
