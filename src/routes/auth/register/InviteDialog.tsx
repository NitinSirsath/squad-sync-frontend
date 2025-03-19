import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const InviteDialog = ({ setIsDialogOpen, isDialogOpen }: IProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };
  return (
    <CustomDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title="Beta Program Invite Only"
      actionButtonTitle="Got It"
      actionButtonColor="default"
      onAction={() => setIsDialogOpen(false)}
      isSubmitVisible={true}
    >
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Currently, this beta program is invite-only. Please fill out the form,
        and we will send you invite credentials once available.
      </p>

      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">
          Request Beta Access
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Request Invite
          </Button>
        </form>
      </div>
    </CustomDialog>
  );
};

export default InviteDialog;
