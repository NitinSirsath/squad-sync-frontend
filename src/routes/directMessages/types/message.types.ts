export type MessageType = "text" | "image" | "file";

export interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  message: string;
  messageType: MessageType;
  fileUrl?: string | null;
  seen: boolean;
  seenAt?: string | null;
  createdAt: string;
}

export interface ChatListItem {
  _id: {
    chatWith: string; // Assuming chatWith is a string representing an ID
  };
  lastMessage: string;
  lastMessageType: "text" | string; // You might want to be more specific about possible message types
  lastMessageTime: string; // Assuming it's an ISO 8601 string
  unseenCount: number;
  chatWith: string; // Redundant with _id.chatWith, but kept as is based on your example
  name: string;
  email: string;
  profilePicture: string; // Can be an empty string if there's no picture
}

export interface ChatList {
  chatList: ChatListItem[];
}
