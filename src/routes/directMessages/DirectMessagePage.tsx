import PageWrapper from "@/components/custom/PageWrapper";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "../../components/dashboard/dms/ChatWindow";
import { useChatList } from "./hooks/useDirectSms.query";

const DirectMessagesPage = () => {
  const { isLoading } = useChatList();

  return (
    // <PageWrapper>
    <PageWrapper>
      <ChatSidebar />
      <div className="flex-1">
        {isLoading ? (
          <p className="text-center mt-20">Loading...</p>
        ) : (
          <ChatWindow />
        )}
      </div>
    </PageWrapper>
    // </PageWrapper>
  );
};

export default DirectMessagesPage;
