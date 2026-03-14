import { axiosInstance } from "./axios";

export interface EventType {
  _id?: string;
  name: string;
  isActive?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const eventTypeApi = {
  getEventTypes: async () => {
    const response = await axiosInstance.get("/api/event-types");
    return response.data;
  },
  getEventTypeById: async (id: string) => {
    const response = await axiosInstance.get(`/api/event-types/${id}`);
    return response.data;
  },
  createEventType: async (data: Partial<EventType>) => {
    const response = await axiosInstance.post("/api/event-types", data);
    return response.data;
  },
  updateEventType: async (id: string, data: Partial<EventType>) => {
    const response = await axiosInstance.put(`/api/event-types/${id}`, data);
    return response.data;
  },
  deleteEventType: async (id: string) => {
    const response = await axiosInstance.delete(`/api/event-types/${id}`);
    return response.data;
  },
};
