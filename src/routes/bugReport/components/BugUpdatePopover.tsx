import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Loader2 } from "lucide-react";

interface BugUpdatePopoverProps {
  bug: BugReport;
}

const BugUpdatePopover: React.FC<BugUpdatePopoverProps> = ({ bug }) => {
  const [status, setStatus] = useState<BugStatus>(bug.status);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { mutate, isPending: isUpdating } = useUpdateBug();

  const handleUpdate = () => {
    mutate(
      { bugId: bug._id, status },
      {
        onSuccess: () => {
          setIsPopoverOpen(false); // ✅ Close popover only after successful update
        },
      }
    );
  };
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Update Bug Status</h4>
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
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPopoverOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BugUpdatePopover;
