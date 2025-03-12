import { Bell, Search, UserCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-gray-100 dark:bg-gray-900 flex items-center px-6 shadow-md border-b border-gray-300 dark:border-gray-700">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
          <ArrowRight className="size-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-sm rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="size-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle className="size-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
