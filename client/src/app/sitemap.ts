import { MetadataRoute } from "next";
import { serviceApi } from "@/lib/service-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bodymask.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic service routes
  try {
    const response = await serviceApi.getServices();
    if (response.success && Array.isArray(response.data)) {
      const serviceRoutes: MetadataRoute.Sitemap = response.data.map(
        (service: any) => ({
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: new Date(service.updatedAt || new Date()),
          changeFrequency: "weekly",
          priority: 0.6,
        }),
      );
      return [...staticRoutes, ...serviceRoutes];
    }
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
  }

  return staticRoutes;
}
