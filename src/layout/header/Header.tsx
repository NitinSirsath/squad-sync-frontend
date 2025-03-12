import {
  Bell,
  Search,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 border bg-gray-100 dark:bg-gray-900 flex items-center px-6 shadow-sm">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Search Bar (Aligned Right) */}
      <div className="flex-1 flex justify-end pr-6">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-xs"
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
