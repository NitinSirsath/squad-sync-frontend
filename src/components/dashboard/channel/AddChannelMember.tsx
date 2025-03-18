import { Button } from "@/components/ui/button";
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
import { OrganizationMemberType } from "@/types/user.types";
import { Plus, Check, ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  handleAddMember: () => void;
  selectedMember: OrganizationMemberType | null;
  setSelectedMember: Dispatch<SetStateAction<OrganizationMemberType | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orgMembersLoading: boolean;
  isChannelMemberLoading: boolean;
  open: boolean;
  nonGroupMembers: OrganizationMemberType[];
}

const AddChannelMember = ({
  orgMembersLoading,
  isChannelMemberLoading,
  nonGroupMembers,
  setSelectedMember,
  setOpen,
  selectedMember,
  handleAddMember,
  open,
}: IProps) => {
  return (
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
                  {nonGroupMembers.map((member: OrganizationMemberType) => (
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
                      {member.firstName} {member.lastName} ({member.email})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <p className="text-sm text-gray-500">No available members to add</p>
      )}
      <Button
        onClick={handleAddMember}
        className="w-full"
        disabled={!selectedMember}
      >
        Add Member
      </Button>
    </div>
  );
};

export default AddChannelMember;
