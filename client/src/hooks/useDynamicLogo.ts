import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const DEFAULT_LOGO = "/assets/logo.png";

export function useDynamicLogo() {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get("/api/settings/general");
        if (res.data?.companyLogo) {
          setLogoUrl(res.data.companyLogo);
        }
      } catch (error) {
        console.error("Failed to fetch settings for logo", error);
        // Keep default logo on error
      }
    };
    fetchSettings();
  }, []);

  return logoUrl;
}
