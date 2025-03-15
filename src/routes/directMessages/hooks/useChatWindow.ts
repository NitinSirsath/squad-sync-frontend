import { useSocket } from "@/context/SocketContext";
import { useUserStore } from "@/services/stores/user/userStore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDirectMessages } from "./useDirectSms.query";
import { Message } from "../types/message.types";

const useChatWindow = () => {
  const { userId } = useParams();
  const { userInfo } = useUserStore();
  const { socket, sendMessage } = useSocket();
  const { data: messages, isLoading } = useDirectMessages(userId);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Sync messages when API data updates
  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  // ✅ Handle new incoming messages from WebSocket
  useEffect(() => {
    if (socket && userId) {
      socket.on("newMessage", (message: Message) => {
        console.log("📩 New Message Received:", message);
        if (message.senderId !== userInfo?._id) {
          setLocalMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, userId, userInfo?._id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId || !userInfo?._id) return;

    // Create a temporary message object
    const tempMessage: Message = {
      _id: crypto.randomUUID(),
      senderId: userInfo._id,
      senderName: userInfo.firstName || "You",
      receiverId: userId,
      receiverName: "Receiver",
      message: newMessage,
      messageType: "text",
      fileUrl: null,
      seen: false,
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((prev) => [...prev, tempMessage]);

    // Send message via WebSocket
    const formData = new FormData();
    formData.append("receiverId", userId);
    formData.append("message", newMessage);
    formData.append("messageType", "text");
    formData.append("fileURL", "");

    sendMessage(formData);
    setNewMessage("");
  };

  return {
    userId,
    isLoading,
    localMessages,
    userInfo,
    chatEndRef,
    newMessage,
    handleSendMessage,
    setNewMessage,
  };
};

export default useChatWindow;
