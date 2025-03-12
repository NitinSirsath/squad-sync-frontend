import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useDirectMessages } from "../hooks/useDirectSms.query";
import { useSocket } from "@/context/SocketContext";
import { Message } from "../types/message.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/services/stores/user/userStore";
import { cn } from "@/lib/utils";

const ChatWindow = () => {
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

  // Handle new incoming messages from Socket.IO
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

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Chat with {userId}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        ) : localMessages.length ? (
          localMessages.map((msg: Message) => (
            <div
              key={msg._id}
              className={cn(
                "flex items-end gap-2",
                msg.senderId === userInfo?._id ? "justify-end" : "justify-start"
              )}
            >
              {/* Receiver Message (Left) */}
              {msg.senderId !== userInfo?._id && (
                <div className="h-10 w-10 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
              )}

              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-lg shadow-md text-sm relative",
                  msg.senderId === userInfo?._id
                    ? "bg-blue-500 text-white self-end rounded-br-none"
                    : "bg-gray-300 dark:bg-gray-700 self-start rounded-bl-none"
                )}
              >
                <p className="font-medium">{msg.senderName}</p>
                <p>{msg.message}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {format(new Date(msg.createdAt), "hh:mm a")}
                </div>
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
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-lg p-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
