import { format, parseISO } from "date-fns";
import { useState } from "react";

const MessageTimestamp = ({ createdAt }: { createdAt: string }) => {
  const [showFullTime, setShowFullTime] = useState(false);
  const parsedDate = parseISO(createdAt);
  const formattedTime = format(parsedDate, "h:mm a");
  const fullTime = format(parsedDate, "MMMM dd, yyyy h:mm:ss a z");

  return (
    <span
      className="text-[0.65rem] text-gray-500 dark:text-gray-200 block mt-1 text-right relative"
      onMouseEnter={() => setShowFullTime(true)}
      onMouseLeave={() => setShowFullTime(false)}
    >
      {formattedTime}
      {showFullTime && (
        <div className="absolute right-0 top-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-xs whitespace-nowrap z-10">
          {fullTime}
        </div>
      )}
    </span>
  );
};

export default MessageTimestamp;
