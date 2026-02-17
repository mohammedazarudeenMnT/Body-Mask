import { axiosInstance } from "./axios";

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  source?: "Form Submission" | "Manual Entry";
  status?: "New" | "Contacted" | "Converted" | "Lost";
  createdAt?: string;
}

export const leadApi = {
  getLeads: async () => {
    const response = await axiosInstance.get("/api/leads");
    return response.data;
  },
  createLead: async (leadData: Partial<Lead>) => {
    const response = await axiosInstance.post("/api/leads", leadData);
    return response.data;
  },
  updateLead: async (id: string, leadData: Partial<Lead>) => {
    const response = await axiosInstance.put(`/api/leads/${id}`, leadData);
    return response.data;
  },
  deleteLead: async (id: string) => {
    const response = await axiosInstance.delete(`/api/leads/${id}`);
    return response.data;
  },
};
