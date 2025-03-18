import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useChannelUpdate,
  useGroupInfo,
} from "@/routes/channels/hooks/channel.query";
import { Pencil, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const ChanneInfo = () => {
  const { groupId } = useParams();
  const { mutate: updateGroup, isPending: isUpdating } = useChannelUpdate();
  const { data: groupInfoData, isLoading } = useGroupInfo(groupId as string);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (groupInfoData) {
      setEditedName(groupInfoData.name);
      setEditedDescription(groupInfoData.description);
    }
  }, [groupInfoData]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
      setSaveError(""); // Clear any previous errors
    }
  };

  const handleCancel = () => {
    setEditedName(groupInfoData?.name || "");
    setEditedDescription(groupInfoData?.description || "");
    setIsEditing(false);
    setSaveError("");
  };

  const handleSave = () => {
    if (!groupInfoData?._id) return;
    if (!editedName.trim()) {
      setSaveError("Channel name cannot be empty.");
      return;
    }
    setSaveError(""); // Clear any previous errors
    updateGroup(
      {
        groupId: groupInfoData._id,
        name: editedName,
        description: editedDescription,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          setSaveError("Failed to update channel. Please try again.");
          console.error("Update channel error:", error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="space-y-1 w-full">
          <Label className="text-sm font-medium">Channel Name</Label>
          {isEditing ? (
            <Input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-sm"
              disabled={isUpdating}
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {groupInfoData?.name}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEditToggle}
          className="text-gray-500 hover:text-blue-500"
          disabled={isUpdating}
        >
          {isEditing ? (
            <Save className="w-4 h-4" />
          ) : (
            <Pencil className="w-4 h-4" />
          )}
        </Button>
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Created By</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {groupInfoData?.createdBy.email}
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Members</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {groupInfoData?.membersCount}
        </p>
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Description</Label>
        {isEditing ? (
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="text-sm"
            disabled={isUpdating}
          />
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {groupInfoData?.description || "No description available."}
          </p>
        )}
      </div>
      {/* Save & Cancel Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            variant="default"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            onClick={handleCancel}
            variant="destructive"
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </div>
      )}
      {saveError && <p className="text-red-500 text-sm mt-2">{saveError}</p>}
    </div>
  );
};

export default ChanneInfo;
