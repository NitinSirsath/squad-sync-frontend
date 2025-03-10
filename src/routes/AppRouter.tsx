import { useAuthStore } from "@/services/stores/auth/authStore";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import HomePage from "./home/HomePage";
import NotFoundPage from "./notFound/NotFoundPage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes (accessible only when logged out) */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes (accessible only when logged in) */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Fallback Route (optional) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

// ---- Protected Route Component ----
const ProtectedRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// ---- Public Route Component ----
const PublicRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default AppRouter;
