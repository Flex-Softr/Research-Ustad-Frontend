"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Achievement } from "@/type/achievement";
import { CreateAchievement, UpdateAchievement } from "@/services/achievements";
import { AchievementImageUpload } from "./AchievementImageUpload";

interface AchievementFormProps {
  achievement?: Achievement | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AchievementForm = ({ achievement, onClose, onSuccess }: AchievementFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (achievement) {
      setFormData({
        title: achievement.title,
        description: achievement.description,
      });
    }
  }, [achievement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if image is provided (required for new achievements, optional for updates)
    if (!achievement && !imageFile) {
      toast.error("Please upload an image for the achievement");
      return;
    }

    try {
      setLoading(true);
      
      if (achievement) {
        await UpdateAchievement(achievement._id, formData, imageFile || undefined);
        toast.success("Achievement updated successfully");
      } else {
        if (!imageFile) {
          toast.error("Image is required for new achievements");
          return;
        }
        await CreateAchievement(formData, imageFile);
        toast.success("Achievement created successfully");
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast.error(achievement ? "Failed to update achievement" : "Failed to create achievement");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {achievement ? "Edit Achievement" : "Create New Achievement"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter achievement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter achievement description"
              rows={4}
              required
            />
          </div>

          <AchievementImageUpload
            value={imageFile}
            onChange={setImageFile}
            existingImageUrl={achievement?.imageUrl}
            isEditMode={!!achievement}
            required={!achievement} // Required for new achievements
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer" disabled={loading}>
              {loading ? "Saving..." : achievement ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementForm;
