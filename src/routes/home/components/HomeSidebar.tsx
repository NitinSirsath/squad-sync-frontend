import { useUserStore } from "@/services/stores/user/userStore";
import ChatList from "./ChatList";
import GroupList from "./GroupList";
import VoiceChatList from "./VoiceChatList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const HomeSidebar = () => {
  const { userInfo } = useUserStore();

  return (
    <aside
      className={cn(
        "w-80 flex flex-col p-4 border-r rounded-bl-lg  rounded-tl-lg"
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <Avatar className="h-10 w-10">
          <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userInfo?.firstName?.charAt(0)}
            {userInfo?.lastName?.charAt(0)}
          </div>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {userInfo?.firstName} {userInfo?.lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo?.organizations[0].role.toUpperCase()}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Voice Chats Section */}
        <div className="mb-6">
          <VoiceChatList />
        </div>

        {/* Groups Section */}
        <div className="mb-6">
          <GroupList />
        </div>

        {/* Direct Messages Section */}
        <div>
          <ChatList />
        </div>
      </ScrollArea>
    </aside>
  );
};

export default HomeSidebar;
