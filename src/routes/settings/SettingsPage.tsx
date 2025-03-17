import { useState } from "react";
import SettingsSidebar from "./components/SettingsSidebar";
import SettingsContent from "./components/SettingsContent";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {/* Sidebar Navigation */}
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <SettingsContent activeTab={activeTab} />
    </div>
  );
};

export default SettingsPage;
