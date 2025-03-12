import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/services/stores/user/userStore";

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
        reconnection: true, // ✅ Ensures automatic reconnection
        reconnectionAttempts: 5, // ✅ Retry up to 5 times
        reconnectionDelay: 2000, // ✅ Wait 2s before retrying
        transports: ["websocket"], // ✅ Force WebSocket over polling
      });

      // Register user upon connection
      newSocket.on("connect", () => {
        console.log("🔌 Connected to WebSocket:", newSocket.id);
        newSocket.emit("registerUser", userInfo._id);
      });

      newSocket.on("updateOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Handle socket disconnection
      newSocket.on("disconnect", (reason) => {
        console.warn("❌ Socket disconnected:", reason);
      });

      // Handle socket errors
      newSocket.on("connect_error", (err) => {
        console.error("⚠️ Socket connection error:", err);
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("updateOnlineUsers");
        newSocket.disconnect(); // Proper cleanup on unmount
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
