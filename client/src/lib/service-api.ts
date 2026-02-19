import { axiosInstance } from "./axios";
import { Service, SaveServiceData } from "../types/service";
import { cache } from "react";

export const serviceApi = {
  // Public methods
  async getServices(category?: string) {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Service[];
    }>("/api/services", {
      params: { category },
    });
    return response.data;
  },

  getServiceBySlug: cache(async (slug: string) => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Service;
    }>(`/api/services/${slug}`);
    return response.data;
  }),

  async getServiceById(id: string) {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Service;
    }>(`/api/services/admin/${id}`);
    return response.data;
  },

  // Admin methods (require auth)
  async createService(data: SaveServiceData) {
    const response = await axiosInstance.post<{
      success: boolean;
      data: Service;
    }>("/api/services", data);
    return response.data;
  },

  async updateService(id: string, data: SaveServiceData) {
    const response = await axiosInstance.put<{
      success: boolean;
      data: Service;
    }>(`/api/services/${id}`, data);
    return response.data;
  },

  async deleteService(id: string) {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
    }>(`/api/services/${id}`);
    return response.data;
  },
};
