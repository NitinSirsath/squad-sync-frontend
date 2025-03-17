import SettingsTabs from "./components/SettingsTabs";

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Settings
      </h2>
      <SettingsTabs />
    </div>
  );
};

export default SettingsPage;
