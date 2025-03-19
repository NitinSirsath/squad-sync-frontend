import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  actionButtonTitle?: string;
  actionButtonColor?:
    | "default"
    | "destructive"
    | "secondary"
    | "link"
    | "outline"
    | "ghost";
  onAction: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  isSubmitVisible?: boolean;
  customCancelName?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export default function CustomDialog({
  open,
  onOpenChange,
  title,
  actionButtonTitle = "Submit",
  actionButtonColor = "default",
  onAction,
  children,
  isDisabled,
  customCancelName,
  size = "md",
  isSubmitVisible = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("rounded-xl p-6 bg-background shadow-lg", sizes[size])}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        {/* ✅ Added max height and scrolling to children */}
        <div className="py-4 max-h-[70vh] overflow-y-auto">{children}</div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {customCancelName || "Close"}
          </Button>
          {isSubmitVisible && (
            <Button
              variant={actionButtonColor}
              onClick={onAction}
              disabled={isDisabled}
              className={cn({ "opacity-50 cursor-not-allowed": isDisabled })}
            >
              {actionButtonTitle}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
