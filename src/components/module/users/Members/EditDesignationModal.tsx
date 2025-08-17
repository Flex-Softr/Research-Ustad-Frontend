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
import { Combobox } from "@/components/ui/combobox";
import { UpdateMember } from "@/services/reserarchers";
import { toast } from "sonner";
import { TResearchAssociate } from "@/type";

interface EditDesignationModalProps {
  member: TResearchAssociate | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedDesignation?: string) => void;
}

const designationOptions = [
  { value: "Advisor", label: "Advisor" },
  { value: "Lead", label: "Lead" },
  { value: "Mentor_Panel", label: "Mentor Panel" },
  { value: "Lead_Research_Associate", label: "Lead Research Associate" },
  { value: "Research_Associate", label: "Research Associate" },
];

export default function EditDesignationModal({
  member,
  isOpen,
  onClose,
  onSuccess,
}: EditDesignationModalProps) {
  const [selectedDesignation, setSelectedDesignation] = useState(
    member?.designation || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!member || !selectedDesignation) {
      toast.error("Please select a designation");
      return;
    }

    setLoading(true);
    try {
      const response = await UpdateMember(member._id, {
        designation: selectedDesignation,
      });

             if (response?.success) {
         toast.success("Designation updated successfully");
         onSuccess(selectedDesignation);
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
    setSelectedDesignation(member?.designation || "");
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
            <Combobox
              options={designationOptions}
              value={selectedDesignation}
              onValueChange={setSelectedDesignation}
              placeholder="Select designation..."
              searchPlaceholder="Search designations..."
              emptyText="No designation found."
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !selectedDesignation}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
