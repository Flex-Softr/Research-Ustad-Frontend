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
          placeholder="Write your course curriculum here... Include modules, lessons, topics, and learning objectives. You can use headings, lists, and formatting to organize your content."
          minHeight="400px"
        />
        {hasAttemptedSubmit && error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Curriculum Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use headings to organize modules and sections</li>
          <li>• Include learning objectives for each module</li>
          <li>• List specific topics and subtopics covered</li>
          <li>• Mention practical exercises and assessments</li>
          <li>• Include estimated time for each section</li>
        </ul>
      </div>
    </div>
  );
};
