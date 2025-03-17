import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import ProfilePopover from "./ProfilePopover";
import NotificationPopOver from "./NotificationPopOver";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center px-6 shadow-sm">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
          <ChevronRight className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      {/* Search Bar (Aligned Right) */}
      <div className="flex-1 flex justify-end pr-6">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-xs rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        <Button variant="ghost" size="icon">
          <Search className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <NotificationPopOver />
        <ProfilePopover />
      </div>
    </header>
  );
};

export default Header;
