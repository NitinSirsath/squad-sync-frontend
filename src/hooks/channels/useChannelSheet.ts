import { useState } from "react";
import {
  useAddGroupMember,
  useGetGroupMembers,
  useGroupInfo,
} from "@/routes/channels/hooks/channel.query";
import { useParams } from "react-router-dom";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import { useOrgMembers } from "@/routes/organization/hooks/useOrganization.query";
import { OrganizationMemberType } from "@/types/user.types";
import { GroupMembersType } from "@/routes/channels/types/channel.types";

const useChannelSheet = () => {
  const { groupId } = useParams();
  const { showToast } = useToastStore();
  const { data: OrgMembers, isLoading: orgMembersLoading } = useOrgMembers();
  const { data: channelMembers, isLoading: isChannelMemberLoading } =
    useGetGroupMembers(groupId);

  const { data: groupInfoData, isLoading } = useGroupInfo(groupId as string);

  const { mutate: addMember } = useAddGroupMember();

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

  const handleAddMember = () => {
    if (!selectedMember || !groupId) return;
    const body = {
      groupId: groupId,
      userId: selectedMember._id,
    };
    addMember(body, {
      onSuccess: () => {
        showToast("Member added to channel", "success");
      },
    });
    setSelectedMember(null);
    setOpen(false);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!groupId || !memberId) return;
    showToast("Feature yet to be published", "info");
  };

  return {
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
  };
};

export default useChannelSheet;
