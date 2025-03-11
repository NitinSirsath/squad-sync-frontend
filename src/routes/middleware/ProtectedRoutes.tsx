import { useEffect } from "react";
import { useAuthStore } from "@/services/stores/auth/authStore";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserObjectType } from "@/types/user.types";

const ProtectedRoutes = ({ userInfo }: { userInfo: UserObjectType | null }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Prevent accessing other routes unless user has activeOrg and organizations
    if (
      !userInfo ||
      userInfo.organizations.length === 0 ||
      !userInfo.activeOrg
    ) {
      navigate("/create-organization", { replace: true });
    }
  }, [isLoggedIn, userInfo, navigate]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
