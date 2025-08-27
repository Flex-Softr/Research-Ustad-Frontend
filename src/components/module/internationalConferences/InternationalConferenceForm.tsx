"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { InternationalConference } from "@/type/internationalConference";
import { CreateInternationalConference, UpdateInternationalConference } from "@/services/internationalConferences";
import { InternationalConferenceImageUpload } from "./InternationalConferenceImageUpload";

interface InternationalConferenceFormProps {
  conference?: InternationalConference | null;
  onClose: () => void;
  onSuccess: () => void;
}

const InternationalConferenceForm = ({ conference, onClose, onSuccess }: InternationalConferenceFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (conference) {
      setFormData({
        title: conference.title,
        description: conference.description,
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
    setImageFile(null);
  }, [conference]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!conference && !imageFile) {
      toast.error("Please upload an image for the conference");
      return;
    }

    try {
      setLoading(true);
      
      if (conference) {
        await UpdateInternationalConference(conference._id, formData, imageFile || undefined);
        toast.success("Conference updated successfully");
      } else {
        if (!imageFile) {
          toast.error("Image is required for new conferences");
          return;
        }
        await CreateInternationalConference(formData, imageFile);
        toast.success("Conference created successfully");
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving conference:", error);
      toast.error("Failed to save conference");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {conference ? "Edit International Conference" : "Create New International Conference"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter conference title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter conference description"
              rows={4}
              required
            />
          </div>
          
          <InternationalConferenceImageUpload
            value={imageFile}
            onChange={setImageFile}
            existingImageUrl={conference?.imageUrl}
            isEditMode={!!conference}
            required={!conference}
          />
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer"
              disabled={loading}
            >
              {loading ? "Saving..." : conference ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternationalConferenceForm;
