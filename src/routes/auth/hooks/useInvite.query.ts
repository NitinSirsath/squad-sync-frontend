import {
  getInvitedUsers,
  inviteUser,
  InviteUserType,
} from "@/services/api/auth/invite.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ✅ Mutation for inviting a new user
export const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InviteUserType) => inviteUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invited-users"] });
    },
  });
};

// ✅ Query for fetching invited users
export const useInvitedUsers = () => {
  return useQuery({
    queryKey: ["invited-users"],
    queryFn: getInvitedUsers,
  });
};
