import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { mutate: logout, status } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => navigate("/login") }); // Redirect after logout
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to HomePage</h1>
      <Button
        onClick={handleLogout}
        disabled={status === "pending"}
        className="mt-4"
        // isLoading={true}
      >
        {status === "pending" ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default HomePage;
