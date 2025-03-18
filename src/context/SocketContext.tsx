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
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  sendDirectMessage: () => {},
  sendGroupMessage: () => {},
  joinGroup: () => {},
  leaveGroup: () => {},
  markMessagesAsSeen: () => {},
});

// ✅ Socket Provider
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { userInfo } = useUserStore();

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
      reconnectionAttempts: 10, // 🔄 Try reconnecting up to 10 times
      reconnectionDelay: 3000, // ⏳ Wait 3s before retrying
      transports: ["websocket"],
    });

    // ✅ Connection Events
    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", newSocket.id);
      newSocket.emit("registerUser", userInfo._id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ WebSocket Connection Error:", err.message);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ WebSocket Disconnected:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`🔄 WebSocket Reconnecting (Attempt ${attempt})...`);
    });

    newSocket.on("updateOnlineUsers", (users: string[]) => {
      console.log("🟢 Online Users Updated:", users);
      setOnlineUsers(users);
    });

    newSocket.on("updateChatList", () => {
      console.log("🔄 Refreshing chat list...");
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    });

    newSocket.on("newDirectMessage", (message) => {
      console.log("📩 New Direct Message:", message);

      // ✅ Update only the specific direct message thread
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", message.senderId],
      });

      // ✅ Use a small delay to batch chat-list updates
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["chat-list"] });
      }, 200);
    });

    newSocket.on("newGroupMessage", (message) => {
      console.log("📩 New Group Message:", message);
      queryClient.invalidateQueries({
        queryKey: ["group-messages", message.groupId],
      });
    });

    setSocket(newSocket);

    return () => {
      console.log("❌ Disconnecting WebSocket...");
      newSocket.off("updateOnlineUsers");
      newSocket.off("updateChatList");
      newSocket.off("newDirectMessage");
      newSocket.off("newGroupMessage");
      newSocket.disconnect();
    };
  }, [userInfo?._id]);

  // ✅ Listen for messages being marked as seen
  useEffect(() => {
    if (!socket) {
      console.warn(
        "⚠️ Socket not initialized, skipping mark as seen listener."
      );
      return;
    }

    const handleSeenUpdate = ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) => {
      if (receiverId === userInfo?._id) {
        console.log(`👀 Messages from ${senderId} marked as seen`);

        // ✅ Avoid multiple API calls
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
      socket.off("messagesMarkedAsSeen", handleSeenUpdate);
    };
  }, [socket, userInfo?._id]);

  // ✅ Send Direct Message
  const sendDirectMessage = (formData: FormData) => {
    if (!socket || !userInfo?._id) {
      console.error("⚠️ No active socket connection or user not authenticated");
      return;
    }

    const receiverId = formData.get("receiverId") as string;
    const message = formData.get("message") as string;

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

    // ✅ Batch chat-list updates to reduce API calls
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    }, 200);
  };

  // ✅ Mark Messages as Seen
  const markMessagesAsSeen = (senderId: string) => {
    if (!socket || !userInfo?._id) {
      console.error("⚠️ No active socket connection or user not authenticated");
      return;
    }

    console.log(`🔍 Marking messages from ${senderId} as seen...`);

    socket.emit("markMessagesAsSeen", {
      senderId,
      receiverId: userInfo._id,
    });

    // ✅ Reduce unnecessary API calls by delaying invalidation
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["direct-messages", senderId],
      });
      queryClient.invalidateQueries({ queryKey: ["chat-list"] });
    }, 200);
  };

  // ✅ Send Group Message
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Custom Hook
export const useSocket = () => useContext(SocketContext);
