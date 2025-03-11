import { useAuthStore } from "@/services/stores/auth/authStore";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import HomePage from "./home/HomePage";
import NotFoundPage from "./notFound/NotFoundPage";
import OrganizationPage from "./organization/OrganizationPage";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import { useUserStore } from "@/services/stores/user/userStore";
import SonnerToast from "@/components/custom/SonnerToast";

const AppRouter = () => {
  const { userInfo } = useUserStore();

  return (
    <div>
      <SonnerToast />
      <Routes>
        {/* Public Routes (accessible only when logged out) */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes (accessible only when logged in) */}
        <Route element={<ProtectedRoutes userInfo={userInfo} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-organization" element={<OrganizationPage />} />
        </Route>

        {/* Fallback Route (optional) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

// ---- Public Route Component ----

const PublicRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { userInfo } = useUserStore();

  // ✅ Prevent redirecting until userInfo is loaded
  if (isLoggedIn && !userInfo) {
    return null; // Prevent unnecessary redirects while Zustand loads user data
  }

  return isLoggedIn ? (
    <Navigate to="/create-organization" replace />
  ) : (
    <Outlet />
  );
};

export default AppRouter;
