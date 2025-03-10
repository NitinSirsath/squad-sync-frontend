import { useAuthStore } from "@/services/stores/auth/authStore";
import { axiosInstance } from "../axios/axiosConfig";

// Login API call
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data; // { token, user }
};

// Register API call
export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data; // { token, user }
};

// Logout (optional: server-side session invalidation)
export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout"); // Optional if API supports logout
  useAuthStore.getState().setLoggedOut(); // Ensure Zustand clears the auth state
  localStorage.removeItem("token"); // Remove token manually
  return true;
};
