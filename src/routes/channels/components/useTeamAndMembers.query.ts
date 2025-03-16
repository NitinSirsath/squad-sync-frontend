import { queryClient } from "@/services/api/query/queryClient";
import { createUser } from "@/services/api/teams/teams.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["organization-members"],
      });
    },
  });
};
