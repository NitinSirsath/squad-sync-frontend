import { useEffect } from "react";
import { useAuthStore } from "@/services/stores/auth/authStore";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserObjectType } from "@/types/user.types";

const ProtectedRoutes = ({ userInfo }: { userInfo: UserObjectType }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (isLoggedIn && userInfo.organizations.length === 0) ||
      (isLoggedIn && !userInfo.activeOrg)
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
