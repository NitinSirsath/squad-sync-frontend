import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChannelWindow from "@/hooks/channels/useChannelWindow";
import ChannelSheet from "./ChannelSheet";
import { Avatar } from "@/components/ui/avatar";
import ChannelChat from "./ChannelChat";

const GroupChatWindow = () => {
  const {
    isLoading,
    localMessages,
    chatEndRef,
    newMessage,
    setNewMessage,
    handleSendMessage,
  } = useChannelWindow();

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]  shadow-md rounded-br-lg rounded-tr-lg">
      {/* Header - Fixed at Top */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              GC
            </div>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Group Chat</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {localMessages.length} Messages
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ChannelSheet />
        </div>
      </div>

      {/* Messages Scrollable Area */}
      <ChannelChat
        chatEndRef={chatEndRef}
        isLoading={isLoading}
        localMessages={localMessages}
      />

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3  sticky bottom-0">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 "
        />
        <Button
          disabled={!newMessage}
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default GroupChatWindow;
