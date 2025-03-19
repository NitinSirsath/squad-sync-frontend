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
  markMessagesAsSeen: (senderId: string) => void;
  socketLoading: boolean; // Add loading state
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  sendDirectMessage: () => {},
  sendGroupMessage: () => {},
  joinGroup: () => {},
  leaveGroup: () => {},
  markMessagesAsSeen: () => {},
  socketLoading: true, // Initially loading
});

// ✅ Socket Provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { userInfo } = useUserStore();
  const [socketLoading, setSocketLoading] = useState(true);

  useEffect(() => {
    if (!userInfo?._id) {
      console.warn(
        "⚠️ User is not authenticated, delaying socket connection..."
      );
      return;
    }

    console.log("🔌 Attempting to connect to WebSocket...");

    const newSocket = io("http://localhost:8000", {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", newSocket.id);
      newSocket.emit("registerUser", userInfo._id);
      setSocketLoading(false); // Socket connected
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err.message);
      setSocketLoading(false); // Connection failed, set loading to false
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ WebSocket Disconnected:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`🔄 WebSocket Reconnecting (Attempt ${attempt})...`);
    });

    newSocket.on("updateOnlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    newSocket.on("updateChatList", () => {
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    });

    newSocket.on("newDirectMessage", (message) => {
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", message.senderId],
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["chat-list"] });
      }, 200);
    });

    newSocket.on("newGroupMessage", (message) => {
      queryClient.invalidateQueries({
        queryKey: ["group-messages", message.groupId],
      });
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.off("connect");
        newSocket.off("connect_error");
        newSocket.off("disconnect");
        newSocket.off("reconnect_attempt");
        newSocket.off("updateOnlineUsers");
        newSocket.off("updateChatList");
        newSocket.off("newDirectMessage");
        newSocket.off("newGroupMessage");
        newSocket.disconnect();
      }
    };
  }, [userInfo?._id]);

  useEffect(() => {
    if (!socket) return;

    const handleSeenUpdate = ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) => {
      if (receiverId === userInfo?._id) {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ["direct-messages", senderId],
          });
          queryClient.invalidateQueries({ queryKey: ["chat-list"] });
        }, 200);
      }
    };

    socket.on("messagesMarkedAsSeen", handleSeenUpdate);

    return () => {
      if (socket) {
        socket.off("messagesMarkedAsSeen", handleSeenUpdate);
      }
    };
  }, [socket, userInfo?._id]);

  const sendDirectMessage = (formData: FormData) => {
    if (!socket || !userInfo?._id) return;

    const receiverId = formData.get("receiverId") as string;
    const message = formData.get("message") as string;

    socket.emit("sendDirectMessage", {
      senderId: userInfo._id,
      receiverId,
      message,
      messageType: "text",
    });
  };

  const markMessagesAsSeen = (senderId: string) => {
    if (!socket || !userInfo?._id) return;

    socket.emit("markMessagesAsSeen", {
      senderId,
      receiverId: userInfo._id,
    });

    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", senderId],
      });
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    }, 200);
  };

  const sendGroupMessage = (groupId: string, message: string) => {
    if (!socket || !userInfo?._id) return;

    socket.emit("sendGroupMessage", {
      groupId,
      senderId: userInfo._id,
      message,
      messageType: "text",
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        sendDirectMessage,
        sendGroupMessage,
        joinGroup: (groupId) => socket?.emit("joinGroup", groupId),
        leaveGroup: (groupId) => socket?.emit("leaveGroup", groupId),
        markMessagesAsSeen,
        socketLoading,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Custom Hook
export const useSocket = () => useContext(SocketContext);
