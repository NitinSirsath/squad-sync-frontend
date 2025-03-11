import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserObjectType } from "@/types/user.types";

type UserStoreState = {
  userInfo: UserObjectType | null;
  setUserInfo: (user: UserObjectType) => void;
  clearUserInfo: () => void;
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "user-store", // Key for localStorage persistence
    }
  )
);
