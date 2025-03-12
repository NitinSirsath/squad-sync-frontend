import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useDirectMessages } from "../hooks/useDirectSms.query";
import { useSocket } from "@/context/SocketContext";
import { Message } from "../types/message.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/services/stores/user/userStore";

const ChatWindow = () => {
  const { userId } = useParams();
  const { userInfo } = useUserStore();
  const { socket, sendMessage } = useSocket();
  const { data: messages, isLoading } = useDirectMessages(userId);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]); // ❌ Removed initialization from messages
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Sync localMessages when messages update from API
  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  // ✅ Handle new incoming messages from Socket.IO
  useEffect(() => {
    if (socket && userId) {
      socket.on("newMessage", (message: Message) => {
        console.log("📩 New Message Received:", message);

        // ✅ Ignore messages from the current sender (prevent duplicates)
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
    if (!newMessage.trim() || !userId || !userInfo?._id) return; // ✅ Ensure senderId exists

    // ✅ Create a temporary message object
    const tempMessage: Message = {
      _id: crypto.randomUUID(), // Temporary ID
      senderId: userInfo._id, // ✅ Safe access
      senderName: userInfo.firstName || "You",
      receiverId: userId,
      receiverName: "Receiver", // You can dynamically fetch receiverName
      message: newMessage,
      messageType: "text",
      fileUrl: null,
      seen: false,
      createdAt: new Date().toISOString(),
    };

    // ✅ Instantly update local state
    setLocalMessages((prev) => [...prev, tempMessage]);

    // ✅ Send message via WebSocket
    const formData = new FormData();
    formData.append("receiverId", userId);
    formData.append("message", newMessage);
    formData.append("messageType", "text");
    formData.append("fileURL", "");

    sendMessage(formData); // Send to backend

    setNewMessage(""); // Clear input
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-white dark:bg-gray-800 shadow-md rounded-lg">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        ) : localMessages.length ? (
          localMessages.map((msg: Message) => (
            <div
              key={msg._id}
              className={cn(
                "max-w-[75%] p-3 rounded-lg",
                msg.senderId === userId
                  ? "bg-gray-300 dark:bg-gray-700 self-start"
                  : "bg-blue-500 text-white self-end"
              )}
            >
              <p className="text-sm font-medium">{msg.senderName}</p>
              <p className="text-sm">{msg.message}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDistanceToNow(new Date(msg.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No messages yet.
          </p>
        )}

        {/* Auto-scroll reference */}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="px-4">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
