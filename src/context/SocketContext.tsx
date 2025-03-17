import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/services/stores/user/userStore";
import { queryClient } from "@/services/api/query/queryClient";

// Create Context
type SocketContextType = {
  socket: Socket | null;
  onlineUsers: string[];
  sendDirectMessage: (formData: FormData) => void;
  sendGroupMessage: (groupId: string, message: string) => void;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  sendDirectMessage: () => {},
  sendGroupMessage: () => {},
  joinGroup: () => {},
  leaveGroup: () => {},
});

// Socket Provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (userInfo?._id) {
      const newSocket = io("http://localhost:8000", {
        reconnection: true,
        reconnectionAttempts: 10, // 🔄 Try reconnecting up to 10 times
        reconnectionDelay: 3000, // ⏳ Wait 3s before retrying
        transports: ["websocket"],
      });

      // Register user upon connection
      newSocket.on("connect", () => {
        console.log("🔌 Connected to WebSocket:", newSocket.id);
        newSocket.emit("registerUser", userInfo._id);
      });

      newSocket.on("updateOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // ✅ Listen for direct chat list updates
      newSocket.on("updateChatList", () => {
        console.log("🔄 Refreshing chat list...");
        queryClient.invalidateQueries({ queryKey: ["chat-list"] });
      });

      // ✅ Listen for new direct messages
      newSocket.on("newDirectMessage", (message) => {
        console.log("📩 New Direct Message:", message);
        queryClient.invalidateQueries({
          queryKey: ["direct-messages", message.senderId],
        });
      });

      // ✅ Listen for new group messages
      newSocket.on("newGroupMessage", (message) => {
        console.log("📩 New Group Message:", message);
        queryClient.invalidateQueries({
          queryKey: ["group-messages", message.groupId],
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("updateOnlineUsers");
        newSocket.off("updateChatList");
        newSocket.off("newDirectMessage");
        newSocket.off("newGroupMessage");
        newSocket.disconnect();
      };
    }
  }, [userInfo?._id]);

  // ✅ Send Direct Message (Fixed naming)
  const sendDirectMessage = (formData: FormData) => {
    const receiverId = formData.get("receiverId") as string;
    const message = formData.get("message") as string;
    if (!socket || !userInfo?._id) {
      console.error("⚠️ No active socket connection or user not authenticated");
      return;
    }

    console.log("📤 Sending Direct Message:", {
      senderId: userInfo._id,
      receiverId,
      message,
    });

    socket.emit("sendDirectMessage", {
      senderId: userInfo._id,
      receiverId,
      message,
      messageType: "text",
    });

    socket.on("sendMessageError", (err) => {
      console.error("❌ Direct Message Send Error:", err);
    });
  };

  // ✅ Send Group Message (Fixed event name alignment)
  const sendGroupMessage = (groupId: string, message: string) => {
    if (!socket || !userInfo?._id) {
      console.error("⚠️ No active socket connection or user not authenticated");
      return;
    }

    console.log("📤 Sending Group Message:", {
      groupId,
      senderId: userInfo._id,
      message,
    });

    socket.emit("sendGroupMessage", {
      groupId,
      senderId: userInfo._id,
      message,
      messageType: "text",
    });

    socket.on("sendMessageError", (err) => {
      console.error("❌ Group Message Send Error:", err);
    });
  };

  // ✅ Join Group Room
  const joinGroup = (groupId: string) => {
    if (socket) socket.emit("joinGroup", groupId);
  };

  // ✅ Leave Group Room
  const leaveGroup = (groupId: string) => {
    if (socket) socket.emit("leaveGroup", groupId);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        sendDirectMessage,
        sendGroupMessage,
        joinGroup,
        leaveGroup,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);
