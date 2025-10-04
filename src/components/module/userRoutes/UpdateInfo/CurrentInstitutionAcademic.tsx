"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoCurrentInstitutionSectionProps } from "@/type";

export function CurrentInstitutionAcademic({ register, errors }: UpdateInfoCurrentInstitutionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">University/Institute</span>
          <Input
            type="text"
            {...register("currentInstitutionAcademicInstitution")}
            placeholder="Enter academic institution"
          />
          {errors.currentInstitutionAcademicInstitution && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitutionAcademicInstitution.message || "Invalid institution")}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Department</span>
          <Input
            type="text"
            {...register("currentInstitutionAcademicDepartment")}
            placeholder="Enter academic department"
          />
          {errors.currentInstitutionAcademicDepartment && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitutionAcademicDepartment.message || "Invalid department")}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Degree</span>
          <Input
            type="text"
            {...register("currentInstitutionAcademicDegree")}
            placeholder="Enter academic degree"
          />
          {errors.currentInstitutionAcademicDegree && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitutionAcademicDegree.message || "Invalid degree")}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Status</span>
          <select
            {...register("currentInstitutionAcademicStatus")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.currentInstitutionAcademicStatus && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitutionAcademicStatus.message || "Invalid status")}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
