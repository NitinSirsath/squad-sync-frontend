import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/services/stores/user/userStore";
import { queryClient } from "@/services/api/query/queryClient";

// Create Context
type SocketContextType = {
  socket: Socket | null;
  onlineUsers: string[];
  sendMessage: (formData: FormData) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  sendMessage: () => {},
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
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
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

      // ✅ Listen for chat list updates
      newSocket.on("updateChatList", () => {
        console.log("🔄 Refreshing chat list...");
        queryClient.invalidateQueries({ queryKey: ["chat-list"] });
      });

      // Handle socket disconnection
      newSocket.on("disconnect", (reason) => {
        console.warn("❌ Socket disconnected:", reason);
      });

      newSocket.on("connect_error", (err) => {
        console.error("⚠️ Socket connection error:", err);
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("updateOnlineUsers");
        newSocket.off("updateChatList");
        newSocket.disconnect();
      };
    }
  }, [userInfo?._id]);

  const sendMessage = (formData: FormData) => {
    const receiverId = formData.get("receiverId") as string;
    const message = formData.get("message") as string;

    if (socket) {
      console.log("📤 Sending message:", {
        senderId: userInfo?._id,
        receiverId,
        message,
      });

      if (!userInfo?._id || !receiverId) {
        console.error("❌ Error: Missing senderId or receiverId");
        return;
      }

      socket.emit("sendMessage", {
        senderId: userInfo?._id,
        receiverId,
        message,
      });

      socket.on("messageSent", (data) => {
        console.log("✅ Message Sent Confirmation:", data);
      });

      socket.on("sendMessageError", (err) => {
        console.error("❌ Message Send Error:", err);
      });
    } else {
      console.error("⚠️ No active socket connection");
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom Hook
export const useSocket = () => useContext(SocketContext);
