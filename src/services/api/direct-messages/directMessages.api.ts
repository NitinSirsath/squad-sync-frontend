import { Message } from "@/routes/directMessages/types/message.types";
import { axiosInstance } from "../axios/axiosConfig";

export const fetchDirectMessages = async (
  userId: string
): Promise<Message[]> => {
  const { data } = await axiosInstance.get(
    `/direct-messages/${userId}/messages`
  );
  return data.messages;
};

export const fetchChatList = async () => {
  const { data } = await axiosInstance.get("/direct-messages/chat-list");
  return data.chatList;
};
