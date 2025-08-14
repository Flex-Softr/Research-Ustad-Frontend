"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateInfoBasicSectionProps } from "@/type";
import { useState } from "react";

export function BasicInformationSection({ 
  register, 
  errors, 
  selectedFile, 
  onFileChange,
  currentProfileImg 
}: UpdateInfoBasicSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileChange?.(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">
        Basic Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Full Name</span>
          <Input
            type="text"
            {...register("fullName")}
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
          <span className="text-sm font-medium">Designation</span>
          <Input
            type="text"
            {...register("designation")}
            placeholder="Enter designation"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">
              {errors.designation.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Profile Image</span>
          <div className="space-y-2">
            {/* File Upload */}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="profileImage"
            />
            
            {/* Image Preview - Only show when user selects a file */}
            {selectedFile && (
              <div className="w-full mt-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Profile Preview"
                  className="w-full h-32 object-cover rounded"
                />
                <div className="text-sm text-gray-500">
                  <p>Selected: {selectedFile.name}</p>
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
            
            {/* Hidden input for form data */}
            <input
              type="hidden"
              {...register("profileImg")}
            />
          </div>
          {errors.profileImg && (
            <p className="text-red-500 text-sm">
              {errors.profileImg.message}
            </p>
          )}
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-sm font-medium">Short Bio</span>
        <Textarea
          {...register("shortBio")}
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
