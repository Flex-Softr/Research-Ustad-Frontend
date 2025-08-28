"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoCurrentInstitutionSectionProps } from "@/type";

export function CurrentInstitutionSection({ register, errors }: UpdateInfoCurrentInstitutionSectionProps) {
  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-medium border-b pb-2">
        Current Institution
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Institution</span>
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
          <span className="text-sm font-medium">Degree</span>
          <Input
            type="text"
            {...register("currentDegree")}
            placeholder="Enter current degree"
          />
          {errors.currentDegree && (
            <p className="text-red-500 text-sm">
              {String(errors.currentDegree.message || "Invalid degree")}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">
            Institution Designation
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
  );
}
