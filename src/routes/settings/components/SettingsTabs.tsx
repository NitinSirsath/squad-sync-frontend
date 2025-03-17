import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateUser from "./CreateUser";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import GeneralSettings from "./GeneralSettings";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="user-management" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md">
        <TabsTrigger value="user-management">Create User</TabsTrigger>
        <TabsTrigger value="change-password">Change Password</TabsTrigger>
        <TabsTrigger value="update-profile">Update Profile</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>

      <TabsContent value="user-management">
        <CreateUser />
      </TabsContent>
      <TabsContent value="change-password">
        <ChangePassword />
      </TabsContent>
      <TabsContent value="update-profile">
        <UpdateProfile />
      </TabsContent>
      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
