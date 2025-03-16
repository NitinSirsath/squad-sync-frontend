import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Plus } from "lucide-react";
import { OrganizationMemberType } from "@/routes/channels/types/index.types";
import { useOrgMembers } from "@/routes/organization/hooks/useOrganization.query";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const SelectMemberDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: orgMembersData, isLoading: isOrgMembersLoading } =
    useOrgMembers();

  const handleAdd = (member: OrganizationMemberType) => {
    navigate(`/messages/dms/${member._id}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[420px] p-5 dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Select a Member
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72">
          {isOrgMembersLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : orgMembersData?.members.length > 0 ? (
            <div className="space-y-2">
              {orgMembersData.members.map((member: OrganizationMemberType) => (
                <div
                  key={member._id}
                  className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Avatar>
                    <AvatarImage src={member.profilePicture || ""} />
                    <AvatarFallback>
                      {member.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <Button
                    onClick={() => handleAdd(member)}
                    size="sm"
                    variant="outline"
                    className="text-sm"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No members found</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SelectMemberDialog;
