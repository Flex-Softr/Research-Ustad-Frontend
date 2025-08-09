"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateInfoBasicSectionProps } from "@/type";

export function BasicInformationSection({ register, errors }: UpdateInfoBasicSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">
        Basic Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Full Name *</span>
          <Input
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters"
              }
            })}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">
              {errors.fullName.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Contact Number</span>
          <Input
            type="text"
            {...register("contactNo")}
            placeholder="Enter contact number"
          />
          {errors.contactNo && (
            <p className="text-red-500 text-sm">
              {errors.contactNo.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Designation *</span>
          <Input
            type="text"
            {...register("designation", {
              required: "Designation is required",
              minLength: {
                value: 2,
                message: "Designation must be at least 2 characters"
              }
            })}
            placeholder="Enter designation"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">
              {errors.designation.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Profile Image URL</span>
          <Input
            type="url"
            {...register("profileImg", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid URL"
              }
            })}
            placeholder="Enter profile image URL"
          />
          {errors.profileImg && (
            <p className="text-red-500 text-sm">
              {errors.profileImg.message}
            </p>
          )}
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-sm font-medium">Short Bio *</span>
        <Textarea
          {...register("shortBio", {
            required: "Short bio is required",
            minLength: {
              value: 10,
              message: "Short bio must be at least 10 characters"
            }
          })}
          placeholder="Enter a short bio"
          className="min-h-[100px]"
        />
        {errors.shortBio && (
          <p className="text-red-500 text-sm">
            {errors.shortBio.message}
          </p>
        )}
      </label>
    </div>
  );
}
