import { useState } from "react";
import {
  Home,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Bug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/auth/useAuth";

const menuItems = [
  { icon: Home, label: "Home", path: "/", tooltip: "Dashboard Overview" },
  {
    icon: Users,
    label: "Teams",
    path: "/channels",
    tooltip: "Manage Teams & Members",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    path: "/messages",
    tooltip: "Chat with colleagues",
    expandableContent: (
      <div className="p-2 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-semibold">Recent Messages</p>
        <Separator className="my-2" />
        <p>John: "Let's meet at 3PM"</p>
        <p>Alice: "Check the new update!"</p>
        <p>Dev Team: "Sprint planning at 10AM"</p>
      </div>
    ),
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    tooltip: "Configure Preferences",
  },
  {
    icon: Bug,
    label: "Bug Report",
    path: "/bug-report",
    tooltip: "Bug Reports",
  },
];

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { mutate: logout, status } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, { onSuccess: () => navigate("/login") });
  };

  return (
    <aside className="h-screen border bg-gray-950 text-gray-100 flex flex-col items-center p-4 w-20">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center mb-6">
        <Plus className="size-6 cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2 w-full">
        {menuItems.map(
          ({ icon: Icon, label, path, tooltip, expandableContent }) => (
            <div
              key={label}
              className="relative group"
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink to={path}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="icon"
                        className="w-full flex items-center justify-center"
                      >
                        <Icon className="size-5" />
                      </Button>
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  {tooltip}
                </TooltipContent>
              </Tooltip>

              {/* Hover Information Box */}
              {hoveredItem === label && expandableContent && (
                <Card className="absolute left-16 top-0 w-60 bg-white dark:bg-gray-800 shadow-lg z-50">
                  <CardContent>{expandableContent}</CardContent>
                </Card>
              )}
            </div>
          )
        )}
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex items-center justify-center"
              disabled={status === "pending"}
              onClick={handleLogout}
            >
              <LogOut className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
