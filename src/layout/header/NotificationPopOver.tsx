import { UserPlus, CalendarDays, Info, Bell } from "lucide-react";
import { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const NotificationPopOver = () => {
  const notifications = useMemo(() => {
    return [
      {
        id: 1,
        type: "meeting",
        message: "Meeting 4 scheduled for Stand-up.",
        icon: <CalendarDays className="text-blue-500" />,
        time: "10:00 AM",
      },
      {
        id: 2,
        type: "channel",
        message: "CEO added you to the Finance channel.",
        icon: <UserPlus className="text-green-500" />,
        time: "Yesterday",
      },
      {
        id: 3,
        type: "meeting",
        message: "Project review meeting rescheduled to 2:00 PM.",
        icon: <CalendarDays className="text-blue-500" />,
        time: "Today",
      },
      {
        id: 4,
        type: "channel",
        message: "You were mentioned in the #general channel.",
        icon: <Info className="text-purple-500" />,
        time: "5 minutes ago",
      },
      {
        id: 5,
        type: "meeting",
        message: "Team brainstorming session scheduled for tomorrow.",
        icon: <CalendarDays className="text-blue-500" />,
        time: "Tomorrow",
      },
      {
        id: 6,
        type: "channel",
        message: "New documents added to the #resources channel.",
        icon: <Info className="text-purple-500" />,
        time: "1 hour ago",
      },
    ];
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="size-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Notifications
            </h2>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {notification.icon}
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <Button variant="outline" className="w-full">
              Mark all as read
            </Button>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopOver;
