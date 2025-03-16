import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
// import SelectMemberDialog from "./SelectMemberDialog";
import { useChatList } from "@/routes/directMessages/hooks/useDirectSms.query";
import { useUserStore } from "@/services/stores/user/userStore";
import { ChatListItem } from "@/routes/directMessages/types/message.types";

const HomeSidebar = () => {
  const { userInfo } = useUserStore();
  const { data: chatList, isLoading } = useChatList();

  return (
    <aside className=" bg-gray-100 dark:bg-gray-900 flex flex-col p-4 border-r rounded-bl-lg rounded-tl-lg dark:border-gray-700">
      <div className="flex flew-row justify-between align-middle">
        <h2 className="text-lg font-semibold mb-4">
          {userInfo?.organizations[0].role.toUpperCase()}
        </h2>

        {/* <Button variant={"ghost"}>
          <Plus />
        </Button> */}
        {/* <SelectMemberDialog /> */}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
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
                    ? "bg-gray-900 dark:bg-gray-700  text-white"
                    : "hover:bg-gray-900 border-2 "
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
    </aside>
  );
};

export default HomeSidebar;
