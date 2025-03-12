import {
  fetchChatList,
  fetchDirectMessages,
  sendMessage,
} from "@/services/api/direct-messages/directMessages.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDirectMessages = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["direct-messages", userId],
    queryFn: () => fetchDirectMessages(userId as string),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage, // Uses the API call
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", variables.receiverId],
      });
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    },
  });
};

export const useChatList = () => {
  return useQuery({
    queryKey: ["chat-list"],
    queryFn: fetchChatList,
    staleTime: 1000 * 60 * 5,
  });
};
