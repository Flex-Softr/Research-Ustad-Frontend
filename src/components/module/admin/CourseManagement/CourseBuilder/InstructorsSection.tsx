"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, Plus, X } from "lucide-react";
import { InstructorImageUpload } from "./InstructorImageUpload";
import { InstructorsSectionProps } from "@/type";

export function InstructorsSection({
  instructors,
  onAddInstructor,
  onRemoveInstructor,
  onUpdateInstructor,
  errors,
  isEditMode = false,
  hasAttemptedSubmit = false,
}: InstructorsSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Instructors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {instructors.map((instructor, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Instructor {i + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveInstructor(i)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Instructor name"
                  value={instructor.name}
                  onChange={(e) =>
                    onUpdateInstructor(i, "name", e.target.value)
                  }
                />
                {getFieldError(`instructor_${i}_name`) && hasAttemptedSubmit && (
                  <p className="text-sm text-red-600">
                    {getFieldError(`instructor_${i}_name`)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <InstructorImageUpload
                  value={instructor.imageFile}
                  onChange={(file) => onUpdateInstructor(i, "imageFile", file)}
                  label="Profile Image"
                  existingImageUrl={instructor.imageUrl}
                  isEditMode={isEditMode}
                />
                {getFieldError(`instructor_${i}_image`) && hasAttemptedSubmit && (
                  <p className="text-sm text-red-600">
                    {getFieldError(`instructor_${i}_image`)}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Specialization</Label>
                <Input
                  placeholder="e.g., Web Development"
                  value={instructor.specialization}
                  onChange={(e) =>
                    onUpdateInstructor(i, "specialization", e.target.value)
                  }
                />
                {getFieldError(`instructor_${i}_specialization`) && hasAttemptedSubmit && (
                  <p className="text-sm text-red-600">
                    {getFieldError(`instructor_${i}_specialization`)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input
                  placeholder="e.g., 5 years"
                  value={instructor.experience}
                  onChange={(e) =>
                    onUpdateInstructor(i, "experience", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  value={instructor.rating}
                  onChange={(e) =>
                    onUpdateInstructor(
                      i,
                      "rating",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
                {getFieldError(`instructor_${i}_rating`) && hasAttemptedSubmit && (
                  <p className="text-sm text-red-600">
                    {getFieldError(`instructor_${i}_rating`)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Students Taught</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={instructor.students}
                  onChange={(e) =>
                    onUpdateInstructor(
                      i,
                      "students",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
                {getFieldError(`instructor_${i}_students`) && hasAttemptedSubmit && (
                  <p className="text-sm text-red-600">
                    {getFieldError(`instructor_${i}_students`)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={onAddInstructor} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Instructor
        </Button>
        {getFieldError("instructors") && hasAttemptedSubmit && (
          <p className="text-sm text-red-600">{getFieldError("instructors")}</p>
        )}
      </CardContent>
    </Card>
  );
}
