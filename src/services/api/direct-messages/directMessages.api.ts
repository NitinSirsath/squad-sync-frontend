import { Message } from "@/routes/directMessages/types/message.types";
import { axiosInstance } from "../axios/axiosConfig";

export const fetchDirectMessages = async (
  userId: string
): Promise<Message[]> => {
  const { data } = await axiosInstance.get(
    `/direct-messages/${userId}/messages`
  );
  return data.messages ? data.messages.reverse() : data.messages;
};

export const fetchChatList = async () => {
  const { data } = await axiosInstance.get("/direct-messages/chat-list");
  return data.chatList;
};

export const sendMessage = async (data: {
  receiverId: string;
  message: string;
}) => {
  const formData = new FormData();
  formData.append("receiverId", data.receiverId);
  formData.append("message", data.message);

  const response = await axiosInstance.post(
    "/direct-messages/send-direct-message",
    formData
  );
  return response.data;
};
