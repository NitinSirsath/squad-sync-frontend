import { CreateUserType } from "@/services/api/teams/teams.api";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/services/stores/toast/useToastStore";
import { AxiosError } from "axios";
import { useCreateUser } from "@/components/queries/createUser.query";

const CreateUser = () => {
  const { mutate, isPending: isLoading, error } = useCreateUser();

  const { showToast } = useToastStore();

  const [formData, setFormData] = useState<CreateUserType>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "employee",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        {/* Role Selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating..." : "Create User"}
        </Button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2">Failed to create user.</p>
        )}
      </form>
    </div>
  );
};

export default CreateUser;
