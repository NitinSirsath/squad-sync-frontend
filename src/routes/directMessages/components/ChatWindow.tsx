import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useDirectMessages, useSendMessage } from "../hooks/useDirectSms.query";
import { Message } from "../types/message.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { queryClient } from "@/services/api/query/queryClient";

const ChatWindow = () => {
  const { userId } = useParams();
  const { data: messages, isLoading } = useDirectMessages(userId);
  const { mutate, isPending: IsPendingSms } = useSendMessage();

  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", newMessage);

    const formData = new FormData();
    formData.append("receiverId", userId || "");
    formData.append("message", newMessage);
    formData.append("messageType", "text");
    formData.append("fileURL", ""); // Ensure it's a string, not `null`
    mutate(formData, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["direct-messages", userId],
        });
      },
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col  bg-white dark:bg-gray-900 shadow-lg w-full  h-full">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 flex items-center">
        <h2 className="text-lg font-semibold flex-1">Chat</h2>
        <p className="text-sm text-green-400">● Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        ) : messages?.length ? (
          messages.map((msg: Message) => (
            <div
              key={msg._id}
              className={cn(
                " p-3 rounded-lg",
                msg.senderId === userId
                  ? "bg-gray-300 dark:bg-gray-700 self-start"
                  : "bg-gray-300 dark:bg-gray-700 self-start"
              )}
            >
              <p className="text-sm font-medium">{msg.senderName}</p>

              {/* Text Message */}
              {msg.messageType === "text" && (
                <p className="text-sm">{msg.message}</p>
              )}

              {/* Timestamp & Seen Status */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDistanceToNow(new Date(msg.createdAt), {
                  addSuffix: true,
                })}
                {msg.seen && (
                  <span className="ml-2 text-green-500">✔ Seen</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Select user to start chatting
          </p>
        )}

        {/* Auto-scroll reference */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      {userId && (
        <div className="p-3 border-t dark:border-gray-700 flex items-center gap-3 bg-gray-100 dark:bg-gray-800">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button
            disabled={IsPendingSms}
            onClick={handleSendMessage}
            size="icon"
            variant="outline"
          >
            <Send className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
