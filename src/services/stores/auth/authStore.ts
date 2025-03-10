import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreState = {
  isLoggedIn: boolean;
  token: string | null;
  setLoggedIn: (token: string) => void;
  setLoggedOut: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      setLoggedIn: (token) => set({ isLoggedIn: true, token }),
      setLoggedOut: () => set({ isLoggedIn: false, token: null }),
    }),
    {
      name: "auth-storage", // Stores auth state in localStorage
    }
  )
);
