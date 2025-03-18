import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrganizationMemberType } from "@/types/user.types";
import { Info, Plus, Check, ChevronsUpDown, X } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { GroupMembersType } from "@/routes/channels/types/channel.types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import useChannelSheet from "@/hooks/channels/useChannelSheet";

const ChannelSheet = () => {
  const {
    isLoading,
    groupInfoData,
    orgMembersLoading,
    isChannelMemberLoading,
    nonGroupMembers,
    setOpen,
    selectedMember,
    setSelectedMember,
    handleRemoveMember,
    handleAddMember,
    channelMembers,
    open,
  } = useChannelSheet();
  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Info className="w-4 h-4 mr-2" /> Channel Info
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-96 p-6">
          <SheetHeader>
            <SheetTitle>Channel Details</SheetTitle>
          </SheetHeader>
          {isLoading && "Loading..."}
          {/* Channel Info */}
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Channel Name</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {groupInfoData?.name || "Loading..."}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Created By</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {groupInfoData?.createdBy.email || "Loading..."}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Members</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {groupInfoData?.membersCount || 0}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {groupInfoData?.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

          {/* Add Member Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Member
            </h3>
            {orgMembersLoading || isChannelMemberLoading ? (
              <p className="text-sm text-gray-500">Loading members...</p>
            ) : nonGroupMembers.length > 0 ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedMember
                      ? `${selectedMember.firstName} ${selectedMember.lastName} (${selectedMember.email})`
                      : "Select a member"}
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search member..." />
                    <CommandList>
                      <CommandGroup>
                        {nonGroupMembers.map(
                          (member: OrganizationMemberType) => (
                            <CommandItem
                              key={member._id}
                              value={member.email}
                              onSelect={() => {
                                setSelectedMember(member);
                                setOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedMember?._id === member._id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {member.firstName} {member.lastName} (
                              {member.email})
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <p className="text-sm text-gray-500">
                No available members to add
              </p>
            )}
            <Button
              onClick={handleAddMember}
              className="w-full"
              disabled={!selectedMember}
            >
              Add Member
            </Button>
          </div>

          {/* Channel Members List */}
          <div className="mt-4 space-y-3">
            <h3 className="text-lg font-semibold">Channel Members</h3>
            <div className="space-y-2">
              {channelMembers?.map((member: GroupMembersType) => (
                <div
                  key={member.userId._id}
                  className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={member.userId.profilePicture || ""}
                        alt={member.userId.username}
                      />
                      <AvatarFallback>
                        {member.userId.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{member.userId.email}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleRemoveMember(member.userId._id)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChannelSheet;
