import {
  addGroupMember,
  createGroup,
  getGroupMembers,
  getGroups,
} from "@/services/api/group/group.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({
        queryKey: ["group-members", variables.groupId],
      });
    },
  });
};
