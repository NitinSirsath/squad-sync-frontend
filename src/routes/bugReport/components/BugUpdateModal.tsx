import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUpdateBug } from "../hooks/useBugReport.query";
import { BugReport, BugStatus } from "../types/bugReport.types";

interface BugUpdateModalProps {
  bug: BugReport;
  onClose: () => void;
}

const BugUpdateModal: React.FC<BugUpdateModalProps> = ({ bug, onClose }) => {
  const [status, setStatus] = useState<BugStatus>(bug.status);
  const { mutate: updateBug } = useUpdateBug();

  const handleUpdate = () => {
    updateBug({ bugId: bug._id, status });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Bug Status</DialogTitle>
        </DialogHeader>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as BugStatus)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BugUpdateModal;
