import { Mic, Volume2 } from "lucide-react";

const voiceChats = [
  { id: "1", name: "Daily Standup", participants: 3 },
  { id: "2", name: "Finance Discussion", participants: 2 },
];

const VoiceChatList = () => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
        Huddles (Voice Chats)
      </h3>
      <div className="space-y-1 overflow-auto">
        {voiceChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Mic className="text-gray-400" size={18} />
            <div className="flex-1">
              <p className="font-medium">{chat.name}</p>
              <p className="text-xs text-gray-400">
                {chat.participants} participants
              </p>
            </div>
            <Volume2 className="text-gray-400" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceChatList;
