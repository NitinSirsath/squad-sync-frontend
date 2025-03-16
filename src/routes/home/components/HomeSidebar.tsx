import { useUserStore } from "@/services/stores/user/userStore";
import ChatList from "./ChatList";
import GroupList from "./GroupList";
import VoiceChatList from "./VoiceChatList";

const HomeSidebar = () => {
  const { userInfo } = useUserStore();

  return (
    <aside className="w-80 bg-gray-100 dark:bg-gray-900 flex flex-col p-4 border-r rounded-bl-lg rounded-tl-lg dark:border-gray-700">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {userInfo?.organizations[0].role.toUpperCase()}
        </h2>
      </div>

      {/* Voice Chats Section */}
      <VoiceChatList />

      {/* Groups Section */}
      <GroupList />

      {/* Direct Messages Section */}
      <ChatList />
    </aside>
  );
};

export default HomeSidebar;
