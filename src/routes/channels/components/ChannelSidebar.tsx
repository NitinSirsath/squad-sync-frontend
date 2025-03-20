import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetGroups } from "../hooks/channel.query";
import { GroupType } from "../types/channel.types";
import CreateChannelDialog from "../../../components/global/CreateChannelDialog";

const ChannelSidebar = () => {
  const { data: groups, isLoading } = useGetGroups();
  return (
    <aside className="w-80  flex flex-col p-4 border-r rounded-bl-lg rounded-tl-lg dark:border-gray-700">
      <div className="flex flew-row justify-between align-middle">
        <h2 className="text-lg font-semibold mb-4">Channels</h2>

        {/* <Button variant={"ghost"}>
          <Plus />
        </Button> */}
        {/* <SelectMemberDialog /> */}
        <CreateChannelDialog fullTitle={false} />
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : groups?.length > 0 ? (
        <div className="space-y-1 overflow-auto">
          {groups.map((group: GroupType) => (
            <NavLink
              key={group.name}
              to={`/channels/${group._id}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                  isActive
                    ? "bg-gray-900 dark:bg-gray-700  text-white"
                    : "hover:bg-gray-900 border-2 "
                )
              }
            >
              <span className="text-gray-500 text-lg font-bold">#</span>
              <div className="flex-1">
                <p className="font-medium">{group.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {group.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recent groups</p>
      )}
    </aside>
  );
};

export default ChannelSidebar;
