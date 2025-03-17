import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOrgMembers } from "@/routes/organization/hooks/useOrganization.query";
import { OrganizationMemberType } from "@/types/user.types";
import { Info, Plus, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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
import { useGetGroupMembers } from "@/routes/channels/hooks/channel.query";
import { useParams } from "react-router-dom";
import { GroupMembersType } from "@/routes/channels/types/channel.types";

const ChannelSheet = () => {
  const { groupId } = useParams();
  const { data: OrgMembers, isLoading: orgMembersLoading } = useOrgMembers();
  const { data: channelMembers, isLoading: isChannelMemberLoading } =
    useGetGroupMembers(groupId);

  const [selectedMember, setSelectedMember] =
    useState<OrganizationMemberType | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ Filter OrgMembers to exclude already added channel members
  const nonGroupMembers =
    OrgMembers?.members.filter(
      (member: OrganizationMemberType) =>
        !channelMembers?.some(
          (chMember: GroupMembersType) => chMember.userId._id === member._id
        )
    ) || [];

  console.log();

  const handleAddMember = () => {
    if (!selectedMember) return;
    console.log(`Adding ${selectedMember.firstName} to the group...`); // Mock API call
    setSelectedMember(null); // Reset selection
    setOpen(false);
  };

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

          {/* Channel Info */}
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Channel Name:</strong> General
            </p>
            <p>
              <strong>Created By:</strong> John Doe
            </p>
            <p>
              <strong>Members:</strong> {channelMembers?.length || 0}
            </p>
            <p>
              <strong>Description:</strong> This is a general discussion
              channel.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

          {/* Add Member Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChannelSheet;
