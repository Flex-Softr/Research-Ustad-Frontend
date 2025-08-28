import React from "react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/blogs/blog/RichTextEditor";
import { getFieldError } from "./CourseFormValidation";
import { ValidationError } from "./CourseFormValidation";

interface CurriculumSectionProps {
  curriculum: string;
  onChange: (field: string, value: string) => void;
  errors: ValidationError[];
  hasAttemptedSubmit: boolean;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  curriculum,
  onChange,
  errors,
  hasAttemptedSubmit,
}) => {
  const error = getFieldError(errors, "curriculum");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-lg font-semibold text-gray-900">
          Course Curriculum
        </Label>
      </div>

      <div className="space-y-2">
        <RichTextEditor
          value={curriculum}
          onChange={(content) => onChange("curriculum", content)}
          placeholder="Write your course curriculum here..."
          minHeight="400px"
        />
        {hasAttemptedSubmit && error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
