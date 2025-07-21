"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CourseThumbnailUpload } from "./CourseThumbnailUpload";
import { FormProgressIndicator } from "./FormProgressIndicator";

interface FormSidebarProps {
  formData: {
    title: string;
    description: string;
    category: string;
    fee: string;
    thumbnail: File | null;
    tags: string[];
    whatYouWillLearn: string[];
    requirements: string[];
    instructors: any[];
  };
  onThumbnailChange: (file: File) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function FormSidebar({
  formData,
  onThumbnailChange,
  onSubmit,
  isSubmitting,
}: FormSidebarProps) {
  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.category &&
      formData.fee &&
      formData.thumbnail
    );
  };

  return (
    <div className="space-y-6">
      {/* Form Progress */}
      <FormProgressIndicator formData={formData} />

      {/* Thumbnail Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Course Thumbnail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CourseThumbnailUpload
            value={formData.thumbnail}
            onChange={onThumbnailChange}
          />
        </CardContent>
      </Card>

      {/* Form Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Form Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Title:</span>
            <span className="text-sm font-medium">
              {formData.title || "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Category:</span>
            <span className="text-sm font-medium">
              {formData.category || "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Price:</span>
            <span className="text-sm font-medium">${formData.fee || "0"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Tags:</span>
            <span className="text-sm font-medium">{formData.tags.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Learning Points:</span>
            <span className="text-sm font-medium">
              {formData.whatYouWillLearn.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Requirements:</span>
            <span className="text-sm font-medium">
              {formData.requirements.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Instructors:</span>
            <span className="text-sm font-medium">
              {formData.instructors.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={!isFormValid() || isSubmitting}
        className="w-full h-12 text-lg"
      >
        {isSubmitting ? "Creating Course..." : "Create Course"}
      </Button>
    </div>
  );
}
