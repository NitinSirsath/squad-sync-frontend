import { useEffect } from "react";
import { useAuthStore } from "@/services/stores/auth/authStore";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserObjectType } from "@/types/user.types";
import { useToastStore } from "@/services/stores/toast/useToastStore";

const ProtectedRoutes = ({ userInfo }: { userInfo: UserObjectType | null }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  useEffect(() => {
    // ✅ Prevent accessing other routes unless user has activeOrg and organizations
    if (
      !userInfo ||
      userInfo.organizations.length === 0 ||
      !userInfo.activeOrg
    ) {
      navigate("/create-organization", { replace: true });
      showToast("Please select the organization", "warning");
    }
  }, [isLoggedIn, userInfo, navigate, showToast]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
