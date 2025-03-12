import { axiosInstance } from "@/services/api/axios/axiosConfig";
import {
  fetchChatList,
  fetchDirectMessages,
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
    mutationFn: async (formData: FormData) => {
      await axiosInstance.post(
        "/direct-messages/send-direct-message",
        formData
      );
    },
    onSuccess: (_, variables) => {
      const receiverId = variables.get("receiverId") as string;
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", receiverId],
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
