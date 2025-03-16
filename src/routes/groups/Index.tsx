import PageWrapper from "@/components/custom/PageWrapper";
import ChannelSidebar from "./components/ChannelSidebar";
import GroupChatWindow from "./components/GroupChatWindow";

const GroupPage = () => {
  return (
    <PageWrapper>
      <ChannelSidebar />
      <div className="flex-1">
        <GroupChatWindow />
      </div>
    </PageWrapper>
  );
};

export default GroupPage;
