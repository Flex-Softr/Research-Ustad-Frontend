"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ResearchPaperFormData } from "./types";
import { Calendar, BookOpen, Hash, Star, Award } from "lucide-react";

interface BasicInfoFieldsProps {
  register: UseFormRegister<ResearchPaperFormData>;
  errors: FieldErrors<ResearchPaperFormData>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Input */}
          <div className="md:col-span-2">
            <Label htmlFor="title" className="mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter the title of the paper"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              className={`${errors.title ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠</span>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Year Input */}
          <div>
            <Label htmlFor="year" className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-red-500">*</span>
              Year
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="e.g., 2024"
              {...register("year", {
                required: "Year is required",
                min: {
                  value: 1900,
                  message: "Year must be at least 1900",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year cannot be greater than ${new Date().getFullYear()}`,
                },
              })}
              className={`${errors.year ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.year && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠</span>
                {errors.year.message}
              </p>
            )}
          </div>

          {/* Journal */}
          <div>
            <Label htmlFor="journal" className="mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="text-red-500">*</span>
              Journal
            </Label>
            <Input
              id="journal"
              type="text"
              placeholder="Enter the journal name"
              {...register("journal", {
                required: "Journal is required",
                minLength: {
                  value: 3,
                  message: "Journal name must be at least 3 characters",
                },
              })}
              className={`${errors.journal ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.journal && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠</span>
                {errors.journal.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Publication Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Publication Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Volume */}
          <div>
            <Label htmlFor="volume" className="mb-2 flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-500" />
              Volume
            </Label>
            <Input
              id="volume"
              type="text"
              placeholder="e.g., 15"
              {...register("volume")}
              className="focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Impact Factor */}
          <div>
            <Label htmlFor="impactFactor" className="mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-gray-500" />
              Impact Factor
            </Label>
            <Input
              id="impactFactor"
              type="number"
              step="0.1"
              placeholder="e.g., 3.5"
              {...register("impactFactor", {
                min: {
                  value: 0,
                  message: "Impact factor cannot be negative",
                },
                max: {
                  value: 50,
                  message: "Impact factor cannot exceed 50",
                },
              })}
              className={`${errors.impactFactor ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.impactFactor && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠</span>
                {errors.impactFactor.message}
              </p>
            )}
          </div>

          {/* Journal Rank */}
          <div>
            <Label htmlFor="journalRank" className="mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-gray-500" />
              Journal Rank
            </Label>
            <Input
              id="journalRank"
              type="text"
              placeholder="e.g., Q1, Q2"
              {...register("journalRank")}
              className="focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
