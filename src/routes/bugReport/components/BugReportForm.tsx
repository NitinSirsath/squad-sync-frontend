import { useState } from "react";
import { useCreateBug } from "../hooks/useBugReport.query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom/CustomDialog";

const BugReportForm = () => {
  const { mutate: createBug } = useCreateBug();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    severity: "low",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false); // State for dialog visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSeverityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, severity: value }));
  };

  const handleSubmit = () => {
    createBug(formData);
    setFormData({
      title: "",
      category: "ui",
      severity: "low",
      description: "",
    });
    setIsOpen(false); // Close the modal after submission
  };

  return (
    <div className="flex justify-end mb-4">
      <Button onClick={() => setIsOpen(true)}>Report a Bug</Button>

      {/* Custom Dialog for Bug Report Form */}
      <CustomDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Report a Bug"
        actionButtonTitle="Submit Bug"
        actionButtonColor="default"
        onAction={handleSubmit}
        isSubmitVisible={true}
      >
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Bug Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Category Select Dropdown */}
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ui">User interface</SelectItem>
              <SelectItem value="ux">User experience</SelectItem>
              <SelectItem value="functionality">Functionality</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Severity Select Dropdown */}
          <Select
            value={formData.severity}
            onValueChange={handleSeverityChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            name="description"
            placeholder="Bug Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      </CustomDialog>
    </div>
  );
};

export default BugReportForm;
