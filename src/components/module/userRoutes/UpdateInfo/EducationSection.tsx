"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoEducationSectionProps } from "@/type";

export function EducationSection({ register, errors }: UpdateInfoEducationSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Degree *</span>
          <Input
            type="text"
            {...register("educationDegree", {
              required: "Education degree is required",
              minLength: {
                value: 2,
                message: "Education degree must be at least 2 characters"
              }
            })}
            placeholder="Enter education degree"
          />
          {errors.educationDegree && (
            <p className="text-red-500 text-sm">
              {errors.educationDegree.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Field of Study *</span>
          <Input
            type="text"
            {...register("educationField", {
              required: "Field of study is required",
              minLength: {
                value: 2,
                message: "Field of study must be at least 2 characters"
              }
            })}
            placeholder="Enter field of study"
          />
          {errors.educationField && (
            <p className="text-red-500 text-sm">
              {errors.educationField.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Institution *</span>
          <Input
            type="text"
            {...register("educationInstitution", {
              required: "Institution is required",
              minLength: {
                value: 2,
                message: "Institution must be at least 2 characters"
              }
            })}
            placeholder="Enter education institution"
          />
          {errors.educationInstitution && (
            <p className="text-red-500 text-sm">
              {errors.educationInstitution.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Status *</span>
          <select
            {...register("educationStatus", {
              required: "Status is required"
            })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.educationStatus && (
            <p className="text-red-500 text-sm">
              {errors.educationStatus.message}
            </p>
          )}
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium">Scholarship</span>
          <Input
            type="text"
            {...register("scholarship")}
            placeholder="Enter scholarship information (if any)"
          />
          {errors.scholarship && (
            <p className="text-red-500 text-sm">
              {errors.scholarship.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
