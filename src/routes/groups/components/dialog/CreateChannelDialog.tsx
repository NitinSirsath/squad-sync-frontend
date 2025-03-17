import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCreateGroup } from "../../hooks/group.query";
import CustomDialog from "@/components/custom/CustomDialog";
import { useToastStore } from "@/services/stores/toast/useToastStore";

const CreateChannelDialog = ({ children }: { children: React.ReactNode }) => {
  const { showToast } = useToastStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const { mutate: createChannel, isPending } = useCreateGroup();

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      return showToast("Please fill all fields!", "warning");
    }

    createChannel(
      { name, description, isPrivate },
      {
        onSuccess: () => {
          setOpen(false);
          setName("");
          setDescription("");
          setIsPrivate(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setIsPrivate(false);
    }
  }, [open]);

  return (
    <>
      <span
        role="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </span>

      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        title="Create Channel"
        actionButtonTitle={isPending ? "Creating..." : "Create"}
        onAction={handleSubmit}
        isDisabled={isPending}
        size="sm"
      >
        <div className="space-y-4">
          <Input
            placeholder="Channel Name (e.g., finance)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description (e.g., Money flow discussions)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Private Channel</label>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default CreateChannelDialog;
