import { axiosInstance } from "./axios";

export interface Testimonial {
  _id?: string;
  clientName: string;
  rating: number;
  reviewMessage: string;
  clientImage?: string;
  status?: "Approved" | "Pending";
  service?: string | any;
  source?: "User Submitted" | "Manual Entry";
  createdAt?: string;
}

export const testimonialApi = {
  getTestimonials: async () => {
    const response = await axiosInstance.get("/api/testimonials");
    return response.data;
  },
  createTestimonial: async (testimonialData: Partial<Testimonial>) => {
    const response = await axiosInstance.post(
      "/api/testimonials",
      testimonialData,
    );
    return response.data;
  },
  updateTestimonial: async (
    id: string,
    testimonialData: Partial<Testimonial>,
  ) => {
    const response = await axiosInstance.put(
      `/api/testimonials/${id}`,
      testimonialData,
    );
    return response.data;
  },
  deleteTestimonial: async (id: string) => {
    const response = await axiosInstance.delete(`/api/testimonials/${id}`);
    return response.data;
  },
};
