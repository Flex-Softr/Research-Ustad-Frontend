"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoCurrentInstitutionSectionProps } from "@/type";

export function CurrentInstitutionSection({ register, errors }: UpdateInfoCurrentInstitutionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">University/Institute</span>
          <Input
            type="text"
            {...register("currentInstitution")}
            placeholder="Enter current institution"
          />
          {errors.currentInstitution && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstitution.message || "Invalid institution")}
            </p>
          )}
        </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="space-y-1">
          <span className="text-sm font-medium">Department</span>
          <Input
            type="text"
            {...register("currentDepartment")}
            placeholder="Enter current department"
          />
          {errors.currentDepartment && (
            <p className="text-red-500 text-sm">
              {String(errors.currentDepartment.message || "Invalid department")}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">
            Designation
          </span>
          <Input
            type="text"
            {...register("currentInstDesignation")}
            placeholder="Enter institution designation"
          />
          {errors.currentInstDesignation && (
            <p className="text-red-500 text-sm">
              {String(errors.currentInstDesignation.message || "Invalid designation")}
            </p>
          )}
        </label>
      </div>
      </div>
    </div>
  );
}
