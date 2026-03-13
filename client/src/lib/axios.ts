import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getSignatureHeaders } from "./signature-utils";

// Dynamic API URL based on environment
const getApiUrl = () => {
  // 1. Server-side (SSR/Build time): Use API_URL or NEXT_PUBLIC_API_URL
  if (typeof window === "undefined") {
    // During build/SSR, prefer API_URL, fallback to NEXT_PUBLIC_API_URL
    const serverApiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (serverApiUrl) {
      return serverApiUrl;
    }
    
    // If no API URL is set, default to localhost for development
    return "http://localhost:5000";
  }

  // 2. Client-side: Use NEXT_PUBLIC_API_URL if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 3. Client-side fallback: use window.location if not on localhost
  const isLocalhost = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1";

  if (isLocalhost) {
    return "http://localhost:5000";
  }

  // Default to the current origin if no API URL is specified (useful for unified deployments)
  return window.location.origin;
};

export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for server-side signatures
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") {
    const secret = process.env.API_SHARED_SECRET;

    if (secret && config.url && config.method) {
      const sigHeaders = getSignatureHeaders(config.method, config.url, secret);
      config.headers["x-signature"] = sigHeaders["x-signature"];
      config.headers["x-timestamp"] = sigHeaders["x-timestamp"];
    }
  }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
