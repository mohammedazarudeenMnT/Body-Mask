import { axiosInstance } from "./axios";

export interface GeneralSettings {
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  workingHours: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    whatsapp: string;
  };
  whatsappNumber: string;
  termsAndConditions: string;
  privacyPolicy: string;
  latitude: string;
  longitude: string;
  googleMapEmbed: string;
  footerNote: string;
  companyLogo: string;
  favicon: string;
}

export const settingsApi = {
  getGeneralSettings: async (): Promise<GeneralSettings> => {
    const res = await axiosInstance.get("/api/settings/general");
    return res.data;
  },
};
