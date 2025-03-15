import { useAuthStore } from "@/services/stores/auth/authStore";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/"; // Replace with actual API

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the token from Zustand
const getToken = () => useAuthStore.getState().token;

// Request Interceptor: Automatically attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle expired tokens (Logout on 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error?.response?.data?.message, "axioserror");
    const { showToast } = useToastStore.getState();
    showToast(
      error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong!",
      "error"
    );
    if (error.response?.status === 401) {
      useAuthStore.getState().setLoggedOut(); // Call Zustand logout function
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
