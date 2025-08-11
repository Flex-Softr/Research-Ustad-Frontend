"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CourseThumbnailUpload } from "./CourseThumbnailUpload";
import { FormProgressIndicator } from "./FormProgressIndicator";
import { FormSidebarProps } from "@/type";
import { isFormValid as validateForm } from "./CourseFormValidation";

export function FormSidebar({
  formData,
  onThumbnailChange,
  onSubmit,
  isSubmitting,
  isEditMode = false,
  existingImageUrl,
  categories = [],
  errors = [],
  hasAttemptedSubmit = false,
}: FormSidebarProps) {
  const isFormValid = () => {
    return validateForm(formData, isEditMode);
  };

  // Helper function to get error message for a field
  const getFieldError = (field: string): string | null => {
    const error = errors.find((err) => err.field === field);
    return error ? error.message : null;
  };

  // Helper function to get category name from ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  return (
    <div className="space-y-6">
      {/* Form Progress */}
      <FormProgressIndicator 
        formData={formData} 
        isEditMode={isEditMode}
        existingImageUrl={existingImageUrl}
      />

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
            existingImageUrl={existingImageUrl}
            isEditMode={isEditMode}
          />
          {isEditMode && (
            <p className="text-xs text-gray-500 mt-2">
              Leave empty to keep the current thumbnail
            </p>
          )}
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
            <span className={`text-sm font-medium ${getFieldError("title") && hasAttemptedSubmit ? "text-red-600" : formData.title ? "text-green-600" : "text-gray-400"}`}>
              {formData.title || "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Category:</span>
            <span className={`text-sm font-medium ${getFieldError("category") && hasAttemptedSubmit ? "text-red-600" : formData.category ? "text-green-600" : "text-gray-400"}`}>
              {formData.category ? getCategoryName(formData.category) : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Price:</span>
            <span className={`text-sm font-medium ${getFieldError("fee") && hasAttemptedSubmit ? "text-red-600" : formData.isFree || formData.fee ? "text-green-600" : "text-gray-400"}`}>
              {formData.isFree ? "Free" : `$${formData.fee || "0"}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Tags:</span>
            <span className={`text-sm font-medium ${getFieldError("tags") && hasAttemptedSubmit ? "text-red-600" : formData.tags.length > 0 ? "text-green-600" : "text-gray-400"}`}>
              {formData.tags.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Learning Points:</span>
            <span className={`text-sm font-medium ${getFieldError("whatYouWillLearn") && hasAttemptedSubmit ? "text-red-600" : formData.whatYouWillLearn.length > 0 ? "text-green-600" : "text-gray-400"}`}>
              {formData.whatYouWillLearn.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Requirements:</span>
            <span className={`text-sm font-medium ${getFieldError("requirements") && hasAttemptedSubmit ? "text-red-600" : formData.requirements.length > 0 ? "text-green-600" : "text-gray-400"}`}>
              {formData.requirements.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Instructors:</span>
            <span className={`text-sm font-medium ${getFieldError("instructors") && hasAttemptedSubmit ? "text-red-600" : formData.instructors.length > 0 ? "text-green-600" : "text-gray-400"}`}>
              {formData.instructors.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Validation Errors */}
      {/* {errors.length > 0 && hasAttemptedSubmit && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 text-sm">
              Validation Errors ({errors.length} issue{errors.length !== 1 ? 's' : ''})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-700">{error.message}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-red-200">
              <p className="text-xs text-red-600">
                Please fix these issues to enable course submission
              </p>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={isSubmitting || (hasAttemptedSubmit && !isFormValid())}
        className="w-full h-12 text-lg"
      >
        {isSubmitting 
          ? (isEditMode ? "Updating Course..." : "Creating Course...") 
          : (isEditMode ? "Update Course" : "Create Course")
        }
      </Button>
      
      {/* Help text when button is disabled */}
      {hasAttemptedSubmit && !isFormValid() && !isSubmitting && (
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Please fill all the fields correctly above to enable submission
          </p>
        </div>
      )}
    </div>
  );
}
