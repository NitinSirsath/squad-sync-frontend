import { cn } from "@/lib/utils";
import { ChannelMessageType } from "@/routes/channels/types/channel.types";
import { useUserStore } from "@/services/stores/user/userStore";
import { Ref } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageTimestamp from "@/components/MessageTimestamp";

interface IProps {
  isLoading: boolean;
  localMessages: ChannelMessageType[];
  chatEndRef: Ref<HTMLDivElement> | undefined;
}

const ChannelChat = ({ isLoading, localMessages, chatEndRef }: IProps) => {
  const { userInfo } = useUserStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3  rounded-lg shadow-inner">
      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading messages...
        </p>
      ) : localMessages.length ? (
        localMessages.map((msg: ChannelMessageType) => {
          const isSender = msg.senderId === userInfo?._id;

          return (
            <div key={msg._id} className="flex items-end space-x-2">
              {!isSender && (
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={msg.profilePicture || ""}
                    alt={msg.senderName}
                  />
                  <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-2xl shadow-sm max-w-[75%] text-sm",
                  isSender
                    ? "bg-blue-500 text-white ml-auto rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                )}
              >
                {!isSender && (
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.message}</p>

                <MessageTimestamp createdAt={msg.createdAt} />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No messages yet.
        </p>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChannelChat;
