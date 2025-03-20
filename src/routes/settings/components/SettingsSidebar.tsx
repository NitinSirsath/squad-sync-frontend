import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const settingsOptions = [
  { id: "profile", label: "Profile" },
  { id: "user-management", label: "Create User" },
  { id: "change-password", label: "Change Password" },
  { id: "general", label: "General" },
];

const SettingsSidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <aside className="w-80  flex flex-col p-4 border-r rounded-bl-lg rounded-tl-lg dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Settings
      </h2>

      <div className="space-y-1 overflow-auto">
        {settingsOptions.map((option) => (
          <NavLink
            key={option.id}
            to={`#`} // Placeholder, can be changed for real links
            onClick={() => setActiveTab(option.id)}
            className={() =>
              cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                activeTab === option.id
                  ? "bg-gray-900 dark:bg-gray-700 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              )
            }
          >
            <span className="text-gray-500 text-lg font-bold">⚙️</span>
            <div className="flex-1">
              <p className="font-medium">{option.label}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default SettingsSidebar;
