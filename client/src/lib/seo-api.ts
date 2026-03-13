import { axiosInstance } from "./axios";

export interface SEOSettings {
  pageName: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
}

export const seoApi = {
  /**
   * Fetch SEO settings for all pages
   */
  getSettings: async (): Promise<SEOSettings[]> => {
    try {
      const response = await axiosInstance.get("/api/seo");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching SEO settings:", error?.message || error);
      // Return empty array on error to prevent build failures
      return [];
    }
  },

  /**
   * Fetch SEO settings for a specific page
   * Note: The backend has an endpoint /api/seo/:pageName for POST,
   * but fetching is usually done via the main list or a specific GET if implemented.
   * Assuming we can filter from the main list or if there's a specific GET.
   */
  getByPageName: async (pageName: string): Promise<SEOSettings | null> => {
    try {
      const settings = await seoApi.getSettings();
      return settings.find((p) => p.pageName === pageName) || null;
    } catch (error: any) {
      console.error(`Error fetching SEO settings for ${pageName}:`, error?.message || error);
      // Return null on error to use fallback metadata
      return null;
    }
  },

  /**
   * Update SEO settings for a page
   */
  updateSettings: async (pageName: string, data: Partial<SEOSettings>) => {
    const response = await axiosInstance.post(`/api/seo/${pageName}`, data);
    return response.data;
  },
};
