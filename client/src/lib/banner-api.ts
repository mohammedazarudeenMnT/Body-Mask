import { axiosInstance } from "./axios";

export interface Banner {
  _id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerData {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  order?: number;
  isActive?: boolean;
}

export const bannerApi = {
  /**
   * Get all active banners for public frontend
   */
  getBanners: async () => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Banner[];
    }>("/api/banners");
    return response.data;
  },

  /**
   * Get all banners for admin dashboard
   */
  getAllBanners: async () => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Banner[];
    }>("/api/banners/admin");
    return response.data;
  },

  /**
   * Create a new banner
   */
  createBanner: async (data: CreateBannerData) => {
    const response = await axiosInstance.post<{
      success: boolean;
      data: Banner;
      message: string;
    }>("/api/banners", data);
    return response.data;
  },

  /**
   * Update a banner
   */
  updateBanner: async (id: string, data: Partial<CreateBannerData>) => {
    const response = await axiosInstance.put<{
      success: boolean;
      data: Banner;
      message: string;
    }>(`/api/banners/${id}`, data);
    return response.data;
  },

  /**
   * Delete a banner
   */
  deleteBanner: async (id: string) => {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
    }>(`/api/banners/${id}`);
    return response.data;
  },
};
