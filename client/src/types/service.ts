export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  order: number;
  isActive: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: string;
  };
  content: {
    heroImage?: string;
    fullDescription?: string;
    features?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
    benefits?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
    gallery?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface SaveServiceData {
  title: string;
  description: string;
  image: string;
  slug?: string;
  order?: number;
  isActive?: boolean;
  seo?: Service["seo"];
  content?: Service["content"];
}
