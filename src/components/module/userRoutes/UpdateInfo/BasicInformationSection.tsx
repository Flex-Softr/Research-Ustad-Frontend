"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateInfoBasicSectionProps } from "@/type";
import { useState } from "react";
import { toast } from "sonner";
import ProfileImageUpload from "@/components/shared/ProfileImageUpload";

export function BasicInformationSection({
  register,
  errors,
  selectedFile,
  onFileChange,
  currentProfileImg,
}: UpdateInfoBasicSectionProps) {
  const [aboutCount, setAboutCount] = useState(0);

  const handleRequiredFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    if (value.trim() === "" && fieldName === "fullName") {
      // Show warning for required fields
      console.warn(`${fieldName} is a required field and cannot be empty`);
    }
  };

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-medium border-b pb-2">
        Basic Information
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Full Name *</span>
          <Input
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters",
              },
            })}
            placeholder="Enter full name (required)"
            className={errors.fullName ? "border-red-500" : ""}
            onChange={(e) => handleRequiredFieldChange(e, "fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
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
            <p className="text-red-500 text-sm">{errors.contactNo.message}</p>
          )}
        </label>

        <div className="space-y-1">
          <ProfileImageUpload
            onChange={onFileChange}
            selectedFile={selectedFile}
            currentProfileImg={currentProfileImg}
            label="Profile Image"
            required={false}
            aspectRatio={1}
            cropShape="round"
          />
          
          {/* Hidden input for form data */}
          <input type="hidden" {...register("profileImg")} />
          {errors.profileImg && (
            <p className="text-red-500 text-sm">{errors.profileImg.message}</p>
          )}
        </div>

        {/* short bio */}
        <label className="space-y-1">
          <span className="text-sm font-medium">Designation (Role in Research Ustad) </span>
          <Input
            {...register("shortBio")}
            placeholder="Enter a Designation (Role in Research Ustad) "
          />
          {errors.shortBio && (
            <p className="text-red-500 text-sm">{errors?.shortBio?.message}</p>
          )}
        </label>

        {/* About Yourself (optional, 300-word limit) */}
        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium">About yourself</span>
          <Textarea
            {...register("aboutYourSelf", {
              validate: (val) => {
                if (!val) return true;
                const wordCount = val.trim().split(/\s+/).filter(word => word.length > 0).length;
                return wordCount <= 300 || "Maximum 300 words allowed";
              },
              onChange: (e) => {
                const value = e.target.value as string;
                const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
                setAboutCount(wordCount);
              },
            })}
            placeholder="Write a brief about yourself..."
            className={errors.aboutYourSelf ? "border-red-500" : ""}
            rows={5}
          />
          <div className="flex items-center justify-between">
            <div className={`text-xs ${aboutCount > 300 ? 'text-red-500' : 'text-gray-500'}`}>
              {aboutCount}/300 words
            </div>
          </div>
          {errors.aboutYourSelf && (
            <p className="text-red-500 text-sm">{String(errors.aboutYourSelf.message)}</p>
          )}
        </label>
      </div>
    </div>
  );
}
