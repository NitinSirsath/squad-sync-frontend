import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "@/context/SocketContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/services/stores/user/userStore";
import { cn } from "@/lib/utils";
import { useFetchGroupMessages } from "../../routes/channels/hooks/channel.query";
import { Message } from "@/routes/directMessages/types/message.types";

const GroupChatWindow = () => {
  const { groupId } = useParams(); // ✅ Get group ID from URL
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

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100 dark:bg-gray-900 shadow-md rounded-br-lg rounded-tr-lg">
      {/* Header - Fixed at Top */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <h2 className="text-lg font-semibold">Group Chat</h2>
        </div>
        <p className="text-sm text-gray-400">{localMessages.length} messages</p>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        ) : localMessages.length ? (
          localMessages.map((msg: Message) => (
            <div
              key={msg._id}
              className={cn(
                "max-w-[75%] p-3 rounded-lg shadow-md",
                msg.senderId === userInfo?._id
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
              )}
            >
              <p className="text-sm font-medium">
                {msg.senderId === userInfo?._id ? "You" : msg.senderId}
              </p>
              <p className="text-sm">{msg.message}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString()}
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

      {/* Message Input - Fixed at Bottom */}
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800 sticky bottom-0">
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

export default GroupChatWindow;
