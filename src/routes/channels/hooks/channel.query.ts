import {
  addGroupMember,
  createGroup,
  fetchGroupMessages,
  getGroupInfo,
  getGroupMembers,
  getGroups,
  sendGroupMessage,
  updateGroup,
} from "@/services/api/group/channel.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//group
export const useGetGroups = () => {
  return useQuery({
    queryKey: ["get-groups"],
    queryFn: getGroups,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-groups"] });
    },
  });
};

//group memebers
export const useGetGroupMembers = (groupId?: string) => {
  return useQuery({
    queryKey: ["group-members", groupId], // ✅ Uses groupId consistently
    queryFn: () => getGroupMembers(groupId!), // ✅ Ensure groupId is defined before fetching
    enabled: !!groupId, // ✅ Prevents unnecessary API calls if groupId is undefined
  });
};

export const useAddGroupMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGroupMember,
    onSuccess: (_, variables) => {
      // ✅ Ensure it invalidates only the specific group's data
      console.log(variables, "variables");
      queryClient.invalidateQueries({
        queryKey: ["group-members", variables.groupId],
      });
    },
  });
};

//group messages

export const useFetchGroupMessages = (groupId: string) => {
  return useQuery({
    queryKey: ["group-messages", groupId],
    queryFn: () => fetchGroupMessages(groupId),
    enabled: !!groupId,
  });
};

export const useSendGroupMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendGroupMessage,
    onSuccess: (variables) => {
      // ✅ Invalidate and refetch messages for the group
      queryClient.invalidateQueries({
        queryKey: ["group-messages", variables.groupId],
      });
    },
  });
};

export const useChannelUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["get-groups"] });
      queryClient.invalidateQueries({
        queryKey: ["group-info", variables.groupId],
      });
    },
  });
};

export const useGroupInfo = (groupId: string) => {
  return useQuery({
    queryKey: ["group-info", groupId],
    queryFn: () => getGroupInfo(groupId),
    enabled: !!groupId,
  });
};
