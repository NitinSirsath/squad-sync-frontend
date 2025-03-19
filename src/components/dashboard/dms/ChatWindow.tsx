import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChatWindow from "../../../routes/directMessages/hooks/useChatWindow";
import UserSheet from "./UserSheet";
import { useUserProfileById } from "@/hooks/user/useUser.query";
import { useSocket } from "@/context/SocketContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageContainer from "./MessageContainer";

const ChatWindow = () => {
  const {
    userId,
    isLoading,
    localMessages,
    userInfo,
    chatEndRef,
    newMessage,
    handleSendMessage,
    setNewMessage,
  } = useChatWindow();

  const { data: userProfile } = useUserProfileById(userId as string);
  const { markMessagesAsSeen, socket } = useSocket();

  // ✅ Mark messages as seen when the chat opens
  useEffect(() => {
    if (userId) {
      markMessagesAsSeen(userId);
    }
  }, [userId]);

  // ✅ Listen for message seen updates
  useEffect(() => {
    if (!socket) return;

    const handleSeenUpdate = ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) => {
      if (receiverId === userInfo?._id) {
        console.log(`👀 Messages from ${senderId} marked as seen`);
      }
    };

    socket.on("messagesMarkedAsSeen", handleSeenUpdate);

    return () => {
      socket.off("messagesMarkedAsSeen", handleSeenUpdate);
    };
  }, [socket, userInfo?._id]);

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userProfile?.profilePicture || ""} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {userProfile?.firstName?.charAt(0)}
              {userProfile?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              {userProfile?.firstName} {userProfile?.lastName}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {localMessages.length} Messages
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserSheet userProfile={userProfile} />
        </div>
      </div>

      {/* Messages Container */}
      <MessageContainer
        chatEndRef={chatEndRef}
        isLoading={isLoading}
        localMessages={localMessages}
      />

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 transition-all"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
