import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
import useChannelSheet from "@/hooks/channels/useChannelSheet";
import ChannelMemberList from "./ChannelMemberList";
import AddChannelMember from "./AddChannelMember";
import ChanneInfo from "./ChanneInfo";

const ChannelSheet = () => {
  const {
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
          <Button variant="secondary" size="sm">
            <Info /> Channel Info
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-96 p-6">
          <SheetHeader>
            <SheetTitle>Channel Details</SheetTitle>
          </SheetHeader>

          {/* Editable Channel Info */}
          <ChanneInfo />
          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>

          {/* Add Member Section */}
          <AddChannelMember
            handleAddMember={handleAddMember}
            isChannelMemberLoading={isChannelMemberLoading}
            nonGroupMembers={nonGroupMembers}
            open={open}
            orgMembersLoading={orgMembersLoading}
            selectedMember={selectedMember}
            setOpen={setOpen}
            setSelectedMember={setSelectedMember}
          />
          <ChannelMemberList
            handleRemoveMember={handleRemoveMember}
            channelMembers={channelMembers}
          />
          {/* Channel Members List */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChannelSheet;
