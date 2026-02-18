import { axiosInstance } from "./axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export const getSession = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/get-session");
    // Better Auth session endpoint returns 200 with session data or 204 if no session
    if (response.status === 204 || !response.data) return { success: false };
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/sign-in/email", {
      email,
      password,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    const message = error.response?.data?.message || "Invalid credentials";
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/api/auth/sign-out");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
