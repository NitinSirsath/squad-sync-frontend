import { useSocket } from "@/context/SocketContext";
import { useFetchGroupMessages } from "@/routes/channels/hooks/channel.query";
import { Message } from "@/routes/directMessages/types/message.types";
import { useUserStore } from "@/services/stores/user/userStore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const useChannelWindow = () => {
  const { groupId } = useParams();
  const { socket, sendGroupMessage, joinGroup, leaveGroup } = useSocket();
  const { userInfo } = useUserStore();
  const { data: messages, isLoading } = useFetchGroupMessages(groupId!);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Join group on mount & leave on unmount
  useEffect(() => {
    if (groupId) {
      joinGroup(groupId);
      return () => leaveGroup(groupId);
    }
  }, [groupId]);

  // ✅ Sync local messages when API data updates
  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  // ✅ Listen for new messages via WebSocket
  useEffect(() => {
    if (socket && groupId) {
      const handleNewMessage = (message: Message) => {
        console.log("📩 New Group Message Received:", message);
        setLocalMessages((prev) => [...prev, message]);
      };

      socket.on("newGroupMessage", handleNewMessage);

      return () => {
        socket.off("newGroupMessage", handleNewMessage);
      };
    }
  }, [socket, groupId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !groupId) return;
    sendGroupMessage(groupId, newMessage);
    setNewMessage(""); // ✅ Clear input field
  };

  return {
    isLoading,
    localMessages,
    userInfo,
    chatEndRef,
    newMessage,
    setNewMessage,
    handleSendMessage,
  };
};

export default useChannelWindow;
