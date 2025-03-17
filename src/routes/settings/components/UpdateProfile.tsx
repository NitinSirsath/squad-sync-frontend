import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    username: "john_doe",
    email: "john@example.com",
  });

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Username</Label>
          <Input
            placeholder="Enter username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            placeholder="Enter email"
            type="email"
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

export default UpdateProfile;
