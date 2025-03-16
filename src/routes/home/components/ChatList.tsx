import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatList } from "@/routes/directMessages/hooks/useDirectSms.query";
import { ChatListItem } from "@/routes/directMessages/types/message.types";
import { cn } from "@/lib/utils";
import SelectMemberDialog from "@/routes/directMessages/components/SelectMemberDialog";

const ChatList = () => {
  const { data: chatList, isLoading } = useChatList();

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
        Direct Messages
      </h3>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : chatList?.length > 0 ? (
        <div className="space-y-1 overflow-auto">
          {chatList.map((chat: ChatListItem) => (
            <NavLink
              key={chat.chatWith}
              to={`/dms/${chat.chatWith}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                  isActive
                    ? "bg-gray-900 dark:bg-gray-700 text-white"
                    : "hover:bg-gray-800 dark:hover:bg-gray-700 border"
                )
              }
            >
              <Avatar>
                <AvatarImage src={chat.profilePicture} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{chat.name}</p>
                <p className="text-sm text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unseenCount > 0 && <Badge>{chat.unseenCount}</Badge>}
            </NavLink>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recent messages</p>
      )}
      <SelectMemberDialog homeLink={true} />
    </div>
  );
};

export default ChatList;
