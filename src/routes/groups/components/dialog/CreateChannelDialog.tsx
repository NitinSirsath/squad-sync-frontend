import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCreateGroup } from "../../hooks/group.query";

const CreateChannelDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const { mutate: createChannel, isPending } = useCreateGroup();

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      return alert("Please fill all fields!");
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
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
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Creating..." : "Create Channel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
