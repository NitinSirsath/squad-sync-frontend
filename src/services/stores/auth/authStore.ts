import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreState = {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: () => set({ isLoggedIn: true }),
      setLoggedOut: () => set({ isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // Key for localStorage
    }
  )
);
