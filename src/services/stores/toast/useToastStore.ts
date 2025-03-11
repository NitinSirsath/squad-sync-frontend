import { create } from "zustand";

type ToastSeverity = "success" | "error" | "warning" | "info";

type ToastState = {
  message: string | null;
  severity: ToastSeverity | null;
  showToast: (message: string, severity?: ToastSeverity) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  severity: null,
  showToast: (message, severity = "info") => set({ message, severity }),
  hideToast: () => set({ message: null, severity: null }),
}));
