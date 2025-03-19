import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useChannelWindow from "@/hooks/channels/useChannelWindow";
import ChannelSheet from "./ChannelSheet";
import { ChannelMessageType } from "@/routes/channels/types/channel.types";

const GroupChatWindow = () => {
  const {
    isLoading,
    localMessages,
    userInfo,
    chatEndRef,
    newMessage,
    setNewMessage,
    handleSendMessage,
  } = useChannelWindow();

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100 dark:bg-gray-900 shadow-md rounded-br-lg rounded-tr-lg">
      {/* Header - Fixed at Top */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <h2 className="text-lg font-semibold">Group Chat</h2>
        </div>
        <ChannelSheet />
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        ) : localMessages.length ? (
          localMessages.map((msg: ChannelMessageType) => (
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
                {msg.senderId === userInfo?._id ? "You" : msg.senderName}
              </p>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No messages yet.
          </p>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t dark:border-gray-700 flex items-center gap-3 bg-white dark:bg-gray-800 sticky bottom-0">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default GroupChatWindow;
