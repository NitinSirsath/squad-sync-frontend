import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserCircle, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/services/stores/user/userStore";
import { useState } from "react";

const ProfilePopover = () => {
  const { userInfo } = useUserStore();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <UserCircle className="size-6 text-blue-600 dark:text-blue-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-6 rounded-lg shadow-xl border"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20 border-2 border-blue-500">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {userInfo?.firstName} {userInfo?.lastName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo?.email}
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="size-4 text-gray-600 dark:text-gray-300" />
              <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Username
              </Label>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {userInfo?.username}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="size-4 text-gray-600 dark:text-gray-300" />
              <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Role
              </Label>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Admin
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogOut className="size-4 text-gray-600 dark:text-gray-300" />
              <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Organization
              </Label>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Example Corp
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
