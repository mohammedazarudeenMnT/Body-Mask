import { axiosInstance } from "./axios";

export interface Offer {
  _id: string;
  expiryDate: string;
  imageUrl: string;
  isPublished: boolean;
}

export const offerApi = {
  async getOffers(published: boolean = true) {
    const response = await axiosInstance.get<Offer[]>(`/api/offers`, {
      params: { published },
    });
    return response.data;
  },
};
