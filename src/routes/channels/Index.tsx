import PageWrapper from "@/components/custom/PageWrapper";
import ChannelSidebar from "./components/ChannelSidebar";
import GroupChatWindow from "../../components/dashboard/channel/ChannelChatWindow";

const ChannelPage = () => {
  return (
    <PageWrapper>
      <ChannelSidebar />
      <div className="flex-1">
        <GroupChatWindow />
      </div>
    </PageWrapper>
  );
};

export default ChannelPage;
