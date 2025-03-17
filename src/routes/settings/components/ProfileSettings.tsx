import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    username: "john_doe",
    email: "john@example.com",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Username</Label>
          <Input
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <Button className="w-full bg-green-500 hover:bg-green-600">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
