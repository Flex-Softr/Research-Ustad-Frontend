"use client";

import { useState } from "react";
import {
  validateCourseForm,
  type CourseFormData,
  type ValidationError,
} from "./CourseFormValidation";
import { BasicInformationSection } from "./BasicInformationSection";
import { PricingSection } from "./PricingSection";
import { CourseFeaturesSection } from "./CourseFeaturesSection";
import { TagsSection } from "./TagsSection";
import { LearningObjectivesSection } from "./LearningObjectivesSection";
import { RequirementsSection } from "./RequirementsSection";
import { InstructorsSection } from "./InstructorsSection";
import { FormSidebar } from "./FormSidebar";

type Instructor = {
  name: string;
  imageFile: File | null;
  specialization: string;
  experience: string;
  rating: number;
  students: number;
};

export default function AddCoursePage() {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    location: "Online",
    duration: "",
    level: "Beginner",
    category: "",
    fee: "",
    originalFee: "",
    enrolled: "",
    capacity: "",
    rating: "",
    totalReviews: "",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    thumbnail: null,
    instructors: [],
    tags: [],
    whatYouWillLearn: [],
    requirements: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (
    field: string,
    index: number,
    value: any,
    key = ""
  ) => {
    const arr = [...(formData as any)[field]];
    if (key) {
      arr[index][key] = value;
    } else {
      arr[index] = value;
    }
    setFormData({ ...formData, [field]: arr });
  };

  const addField = (field: string, defaultValue: any) => {
    const arr = [...(formData as any)[field]];
    arr.push(defaultValue);
    setFormData({ ...formData, [field]: arr });
  };

  const removeField = (field: string, index: number) => {
    const arr = [...(formData as any)[field]];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

  const handleThumbnailChange = (file: File) => {
    setFormData({ ...formData, thumbnail: file });
  };

  const handleSubmit = async () => {
    const validationErrors = validateCourseForm(formData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      console.log("Course Created:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Course created successfully!");
      // Reset form or redirect
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600">
          Fill in the details below to create your course
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInformationSection
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />

          <PricingSection
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />

          <CourseFeaturesSection formData={formData} onChange={handleChange} />

          <TagsSection
            tags={formData.tags}
            onAddTag={(tag) => addField("tags", tag)}
            onRemoveTag={(index) => removeField("tags", index)}
            onUpdateTag={(index, value) =>
              handleArrayChange("tags", index, value)
            }
            errors={errors}
          />

          <LearningObjectivesSection
            objectives={formData.whatYouWillLearn}
            onAddObjective={() => addField("whatYouWillLearn", "")}
            onRemoveObjective={(index) =>
              removeField("whatYouWillLearn", index)
            }
            onUpdateObjective={(index, value) =>
              handleArrayChange("whatYouWillLearn", index, value)
            }
            errors={errors}
          />

          <RequirementsSection
            requirements={formData.requirements}
            onAddRequirement={() => addField("requirements", "")}
            onRemoveRequirement={(index) => removeField("requirements", index)}
            onUpdateRequirement={(index, value) =>
              handleArrayChange("requirements", index, value)
            }
            errors={errors}
          />

          <InstructorsSection
            instructors={formData.instructors}
            onAddInstructor={() =>
              addField("instructors", {
                name: "",
                imageFile: null,
                specialization: "",
                experience: "",
                rating: 0,
                students: 0,
              })
            }
            onRemoveInstructor={(index) => removeField("instructors", index)}
            onUpdateInstructor={(index, field, value) =>
              handleArrayChange("instructors", index, value, field)
            }
            errors={errors}
          />
        </div>

        {/* Sidebar */}
        <FormSidebar
          formData={formData}
          onThumbnailChange={handleThumbnailChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
