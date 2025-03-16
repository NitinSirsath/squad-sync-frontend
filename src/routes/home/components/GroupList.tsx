import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetGroups } from "@/routes/groups/hooks/group.query";
import { GroupType } from "@/routes/groups/types/group.types";

const GroupList = () => {
  const { data: groups, isLoading } = useGetGroups();

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
        Channels
      </h3>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : groups?.length > 0 ? (
        <div className="space-y-1 overflow-auto">
          {groups.map((group: GroupType) => (
            <NavLink
              key={group._id}
              to={`/groups/${group._id}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                  isActive
                    ? "bg-gray-900 dark:bg-gray-700 text-white"
                    : "hover:bg-gray-800 dark:hover:bg-gray-700 border"
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
        <p className="text-gray-400">No channels found</p>
      )}
    </div>
  );
};

export default GroupList;
