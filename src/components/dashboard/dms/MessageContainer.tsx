import { useUserStore } from "@/services/stores/user/userStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/routes/directMessages/types/message.types";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/utils";
import { Ref } from "react";

interface IProps {
  isLoading: boolean;
  localMessages: Message[];
  chatEndRef: Ref<HTMLDivElement> | undefined;
}

const MessageContainer = ({ isLoading, localMessages, chatEndRef }: IProps) => {
  const { userInfo } = useUserStore();
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading messages...
        </p>
      ) : localMessages.length ? (
        localMessages.map((msg: Message) => {
          const isSender = msg.senderId === userInfo?._id;
          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : ""
              }`}
            >
              {!isSender && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.message || ""} />
                  <AvatarFallback className="bg-gray-400 dark:bg-gray-600">
                    {msg.senderName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[75%] px-4 py-3 rounded-2xl shadow-md text-sm transition-all",
                  isSender
                    ? "bg-blue-500 text-white self-end rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                )}
              >
                <div className="flex items-center mb-1">
                  {!isSender && (
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mr-2">
                      {msg.senderName}
                    </p>
                  )}
                  <span className="text-[0.65rem] text-gray-500 dark:text-gray-400">
                    {formatDistanceToNowStrict(new Date(msg.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm">{msg.message}</p>

                {/* ✅ Show 'Seen' indicator for sent messages */}
                {isSender && msg.seen && (
                  <div className="text-xs text-green-500 dark:text-green-400 font-medium text-right mt-1">
                    ✓ Seen
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No messages yet.
        </p>
      )}

      {/* Auto-scroll reference */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageContainer;
