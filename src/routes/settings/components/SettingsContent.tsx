import ChangePassword from "./ChangePassword";
import CreateUser from "./CreateUser";
import GeneralSettings from "./GeneralSettings";
import ProfileSettings from "./ProfileSettings";

const SettingsContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {activeTab === "profile" && <ProfileSettings />}
      {activeTab === "user-management" && <CreateUser />}
      {activeTab === "change-password" && <ChangePassword />}
      {activeTab === "general" && <GeneralSettings />}
    </div>
  );
};

export default SettingsContent;
