"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdateMember } from "@/services/reserarchers";
import { toast } from "sonner";
import { TResearchAssociate } from "@/type";

interface EditDesignationModalProps {
  member: TResearchAssociate | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedDesignation?: string) => void;
}

export default function EditDesignationModal({
  member,
  isOpen,
  onClose,
  onSuccess,
}: EditDesignationModalProps) {
  const [designation, setDesignation] = useState(
    member?.designation || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!member || !designation.trim()) {
      toast.error("Please enter a designation");
      return;
    }

    setLoading(true);
    try {
      const response = await UpdateMember(member._id, {
        designation: designation.trim(),
      });

      if (response?.success) {
        toast.success("Designation updated successfully");
        onSuccess(designation.trim());
        onClose();
      } else {
        toast.error(response?.message || "Failed to update designation");
      }
    } catch (error) {
      console.error("Error updating designation:", error);
      toast.error("Failed to update designation");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDesignation(member?.designation || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Member Designation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="member-name">Member Name</Label>
            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
              {member?.fullName}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter designation..."
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !designation.trim()}
            className="bg-brand-primary hover:shadow-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
