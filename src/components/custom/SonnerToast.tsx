import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useToastStore } from "@/services/stores/toast/useToastStore";

const SonnerToast = () => {
  const { message, severity, hideToast } = useToastStore();

  useEffect(() => {
    if (message) {
      toast[severity || "info"](message); // Uses toast.success(), toast.error(), etc.
      setTimeout(hideToast, 5000); // Auto-hide after 5s
    }
  }, [message, severity, hideToast]);

  return <Toaster position="top-right" />;
};

export default SonnerToast;
