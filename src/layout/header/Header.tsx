import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import ProfilePopover from "./ProfilePopover";
import NotificationPopOver from "./NotificationPopOver";
import SearchPopover from "./SearchPopover";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b bg-gradient-to-r from-gray-50 to-gray-100 dark:from-black dark:to-gray-800 flex items-center px-6 shadow-sm">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
          <ChevronRight className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
      <div className="flex-1 flex justify-end pr-6 gap-3"></div>
      {/* Search Bar (Aligned Right) */}

      {/* Actions */}
      <div className="flex items-center pr-6 gap-3">
        <ModeToggle />
        <SearchPopover />
        <NotificationPopOver />
        <ProfilePopover />
      </div>
    </header>
  );
};

export default Header;
