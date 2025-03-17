import { CreateUserType } from "@/services/api/teams/teams.api";
import React, { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import { AxiosError } from "axios";
import { useCreateUser } from "@/components/queries/createUser.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateUser = () => {
  const { mutate, isPending: isLoading, error } = useCreateUser();
  const { showToast } = useToastStore();

  const userObj = useMemo(
    () => ({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "employee",
    }),
    []
  );

  const [formData, setFormData] = useState<CreateUserType>(userObj);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onError: (err: unknown) => {
        console.log("Mutation Error:", err);
        if (err instanceof AxiosError) {
          const errorMessage =
            err.response?.data?.error || "An unexpected error occurred.";
          showToast(errorMessage, "error");
        } else {
          showToast("Something went wrong.", "error");
        }
      },
      onSuccess: () => {
        showToast("New user created", "success");
        setFormData(userObj);
      },
    });
  };

  return (
    <Card className=" shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Role Selection with Styled Select */}
          <div>
            <Label>Role</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
              defaultValue={formData.role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create User"}
          </Button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              ⚠ Failed to create user.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateUser;
