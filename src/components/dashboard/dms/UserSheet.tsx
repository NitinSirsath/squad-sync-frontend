import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Info, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import { UserObjectType } from "@/types/user.types";

const UserSheet = ({
  userProfile,
}: {
  userProfile: UserObjectType | undefined;
}) => {
  const { showToast } = useToastStore();
  const [isMuted, setIsMuted] = useState(false);

  const handleRemoveUser = () => {
    showToast("Why you wanna remove your brother", "success");
  };

  if (!userProfile) {
    return <div>Loading...</div>; // Or handle loading state appropriately
  }

  const joinDate = new Date(userProfile.createdAt).toLocaleDateString();

  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="sm">
            <Info /> User Info
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-96 p-6">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
          </SheetHeader>

          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={userProfile.profilePicture || ""}
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
              />
              <AvatarFallback>
                {userProfile.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                {userProfile.firstName} {userProfile.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @{userProfile.username}
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="mt-6 space-y-3">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userProfile.email}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Role</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userProfile.organizations.find(
                  (org) => org.orgId === userProfile.activeOrg
                )?.role || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Joined On</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {joinDate}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Active Organization</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userProfile.activeOrg}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

          {/* Mute Notifications Toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium flex items-center gap-2">
              {isMuted ? (
                <BellOff className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
              Mute Notifications
            </h3>
            <Switch checked={isMuted} onCheckedChange={setIsMuted} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

          {/* Actions */}
          <div className="mt-4 space-y-2">
            <Button
              className="w-full flex items-center justify-center gap-2"
              variant={"destructive"}
              onClick={handleRemoveUser}
            >
              Remove User
            </Button>
            <Button variant="outline" className="w-full">
              View Full Profile
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserSheet;
