import {
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/api/auth/authApi";
import { useAuthStore } from "@/services/stores/auth/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Login Hook
export const useLogin = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      setLoggedIn(data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: any) => registerUser(userData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};

export const useLogout = () => {
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setLoggedOut(); // Clear auth state in Zustand
      queryClient.removeQueries({ queryKey: ["user"] }); // Remove user data from cache
    },
  });
};
