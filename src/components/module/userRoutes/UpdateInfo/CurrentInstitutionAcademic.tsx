"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoCurrentInstitutionSectionProps } from "@/type";

export function CurrentInstitutionAcademic({ register, errors }: UpdateInfoCurrentInstitutionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Institution</span>
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
          <span className="text-sm font-medium">
            Institution Designation
          </span>
          <Input
            type="text"
            {...register("currentInstitutionAcademicInstDesignation")}
            placeholder="Enter academic designation"
          />
          {errors.currentInstitutionAcademicInstDesignation && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitutionAcademicInstDesignation.message || "Invalid designation")}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
