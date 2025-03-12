import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { mutate: logout, status } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => navigate("/login") });
  };

  return (
    <div className="flex flex-row items-start gap-1 ">
      <h1 className="text-2xl font-bold">Welcome to HomePage</h1>
      <Button onClick={handleLogout} disabled={status === "pending"}>
        {status === "pending" ? "Logging out..." : "Logout"}
      </Button>
      <Button onClick={handleLogout} disabled={status === "pending"}>
        {status === "pending" ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default HomePage;
