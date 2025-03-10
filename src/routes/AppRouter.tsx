import { useAuthStore } from "@/services/stores/auth/authStore";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import HomePage from "./home/HomePage";
import NotFoundPage from "./notFound/NotFoundPage";
import OrganizationPage from "./organization/OrganizationPage";
import { UserObjectType } from "@/types/user.types";
import ProtectedRoutes from "./middleware/ProtectedRoutes";

const AppRouter = () => {
  const userInfo: UserObjectType = {
    _id: "67cec676690e37bb425d9e24",
    username: "jarves",
    email: "shantanu17@gmail.com",
    firstName: "shantanu",
    lastName: "sirsath",
    profilePicture: "",
    organizations: [
      {
        orgId: "67cec69b690e37bb425d9e2a",
        role: "admin",
        _id: "67cec69c690e37bb425d9e2d",
      },
    ],
    createdAt: "2025-03-10T11:01:10.195Z",
    updatedAt: "2025-03-10T11:01:48.012Z",
    __v: 0,
    activeOrg: "", // Testing case where activeOrg is empty
  };

  return (
    <div>
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
  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default AppRouter;
