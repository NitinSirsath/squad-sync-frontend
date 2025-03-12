import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: Home, label: "Home", tooltip: "Dashboard Overview" },
  { icon: Users, label: "Teams", tooltip: "Manage Teams & Members" },
  {
    icon: MessageSquare,
    label: "Messages",
    tooltip: "Chat with colleagues",
    expandableContent: (
      <div className="p-2 text-sm text-gray-600 dark:text-gray-300">
        <p className="font-semibold">Recent Messages</p>
        <Separator className="my-2" />
        <p>📩 John: "Let's meet at 3PM"</p>
        <p>📩 Alice: "Check the new update!"</p>
        <p>📩 Dev Team: "Sprint planning at 10AM"</p>
      </div>
    ),
  },
  { icon: Settings, label: "Settings", tooltip: "Configure Preferences" },
];

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <aside className="h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 w-16 shadow-xl border-r border-gray-700">
      {/* Sidebar Header */}

      {/* Navigation Items */}
      <nav className="mt-8 flex flex-col space-y-4 w-full">
        {menuItems.map(({ icon: Icon, label, tooltip, expandableContent }) => (
          <div
            key={label}
            className="relative group"
            onMouseEnter={() => setExpandedItem(label)}
            onMouseLeave={() => setExpandedItem(null)}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-full flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-gray-800 hover:shadow-lg"
                  )}
                >
                  <Icon className="size-6 transition-all duration-300 hover:text-blue-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>

            {/* Expandable Content */}
            {expandedItem === label && expandableContent && (
              <Card className="absolute left-16 top-0 w-60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                <CardContent>{expandableContent}</CardContent>
              </Card>
            )}
          </div>
        ))}
      </nav>

      {/* Add New Button */}
      <div className="mt-auto w-full">
        <Button
          variant="ghost"
          size="icon"
          className="w-full flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-green-600 hover:text-white"
        >
          <Plus className="size-6" />
        </Button>
      </div>

      {/* Logout */}
      <div className="mt-4 w-full">
        <Button
          variant="ghost"
          size="icon"
          className="w-full flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-red-600 hover:text-white"
        >
          <LogOut className="size-6" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
