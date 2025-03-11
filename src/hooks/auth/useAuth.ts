import {
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/api/auth/authApi";
import { getUserInfo } from "@/services/api/user/userInfoApi";
import { useAuthStore } from "@/services/stores/auth/authStore";
import { useUserStore } from "@/services/stores/user/userStore";
import { UserRegisterFormType } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Login Hook
export const useLogin = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const { refetch } = useUserInfo(); // ✅ Get refetch function
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: async (data) => {
      setLoggedIn(data.token);

      // ✅ Trigger user-info fetch after login success
      await refetch();

      // ✅ Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
};

export const useUserInfo = () => {
  const { setUserInfo } = useUserStore();

  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const userData = await getUserInfo();
      setUserInfo(userData.userObject); // Store in Zustand
      return userData;
    },
    enabled: false, // ✅ Prevent auto-fetch on mount
    retry: 2, // ✅ Retry twice if API fails
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: UserRegisterFormType) => registerUser(userData),
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
