import { useAuthStore } from "@/services/stores/auth/authStore";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import LoginPage from "./auth/login/LoginPage";
import RegisterPage from "./auth/register/RegisterPage";
import HomePage from "./home/HomePage";
import NotFoundPage from "./notFound/NotFoundPage";
import OrganizationPage from "./organization/OrganizationPage";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import { useUserStore } from "@/services/stores/user/userStore";
import SonnerToast from "@/components/custom/SonnerToast";
import Layout from "@/layout/AppLayout";
import DirectMessagesPage from "./directMessages/DirectMessagePage";
import ChatWindow from "../components/dashboard/dms/ChatWindow";
import GroupChatWindow from "../components/dashboard/channel/ChannelChatWindow";
import GroupPage from "./channels/Index";
import SettingsPage from "./settings/SettingsPage";
import BugReportPage from "./bugReport/BugReportPage";
import LandingPage from "./landing/LandingPage";

const AppRouter = () => {
  const { userInfo } = useUserStore();

  return (
    <div className="relative">
      <SonnerToast />
      <Routes>
        {/* Public Routes (Only accessible when logged out) */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes with Global Layout */}
        <Route element={<ProtectedRoutes userInfo={userInfo} />}>
          <Route element={<Layout />}>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/bug-report" element={<BugReportPage />} />
            <Route path="/" element={<HomePage />}>
              <Route path="dms/:userId" element={<ChatWindow />} />
              <Route path="channel/:groupId" element={<GroupChatWindow />} />
            </Route>
            <Route path="messages/" element={<DirectMessagesPage />}>
              <Route path="dms/:userId" element={<ChatWindow />} />
            </Route>
            <Route path="/channels" element={<GroupPage />}>
              <Route path="/channels/:groupId" element={<GroupChatWindow />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoutes userInfo={userInfo} />}>
          <Route path="/create-organization" element={<OrganizationPage />} />
        </Route>
        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

// ---- Public Route Component ----
const PublicRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { userInfo } = useUserStore();
  const location = useLocation();
  if (location.pathname === "/landing") {
    return <Outlet />; // Allow rendering of LandingPage
  }
  // ✅ Prevent redirecting until userInfo is loaded
  if (isLoggedIn && !userInfo) {
    return null; // Avoid unnecessary redirects while Zustand loads user data
  }
  return isLoggedIn ? (
    <Navigate to="/create-organization" replace />
  ) : (
    <Outlet />
  );
};

export default AppRouter;
