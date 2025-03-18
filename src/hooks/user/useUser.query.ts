import { getUserProfileById } from "@/services/api/user/userInfoApi";
import { useQuery } from "@tanstack/react-query";

export const useUserProfileById = (userId: string) => {
  return useQuery({
    queryKey: ["get-UserProfileBy-id", userId],
    queryFn: () => getUserProfileById(userId),
    enabled: !!userId,
  });
};
