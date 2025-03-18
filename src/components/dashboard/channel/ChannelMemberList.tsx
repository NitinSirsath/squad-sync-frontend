import { Button } from "@/components/ui/button";
import { GroupMembersType } from "@/routes/channels/types/channel.types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { X } from "lucide-react";

interface IProps {
  handleRemoveMember: (id: string) => void;
  channelMembers: GroupMembersType[];
}

const ChannelMemberList = ({ channelMembers, handleRemoveMember }: IProps) => {
  return (
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
  );
};

export default ChannelMemberList;
