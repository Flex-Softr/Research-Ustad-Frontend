"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ResearchPaperFormData } from "./types";
import { Link, FileText, CheckCircle, FileType, Quote, MapPin, DollarSign } from "lucide-react";

interface AdditionalFieldsProps {
  register: UseFormRegister<ResearchPaperFormData>;
  errors: FieldErrors<ResearchPaperFormData>;
  watch: UseFormWatch<ResearchPaperFormData>;
  setValue: UseFormSetValue<ResearchPaperFormData>;
  trigger: UseFormTrigger<ResearchPaperFormData>;
}

const AdditionalFields: React.FC<AdditionalFieldsProps> = ({
  register,
  errors,
  watch,
  setValue,
  trigger,
}) => {
  return (
    <div className="space-y-6">
      {/* Paper Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Paper Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Paper Link */}
          <div className="md:col-span-2">
            <Label htmlFor="visitLink" className="mb-2 flex items-center gap-2">
              <Link className="h-4 w-4 text-gray-500" />
              <span className="text-red-500">*</span>
              Research Paper Link
            </Label>
            <Input
              id="visitLink"
              type="url"
              placeholder="https://example.com/paper"
              {...register("visitLink", {
                required: "Research paper link is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message:
                    "Please enter a valid URL starting with http:// or https://",
                },
              })}
              className={`${errors.visitLink ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.visitLink && (
              <p className="text-sm text-red-500 mt-1">
                {errors.visitLink.message}
              </p>
            )}
          </div>

          {/* Paper Type */}
          <div>
            <Label htmlFor="paperType" className="mb-2 flex items-center gap-2">
              <FileType className="h-4 w-4 text-gray-500" />
              <span className="text-red-500">*</span>
              Paper Type
            </Label>
            <Select
              value={watch("paperType") || ""}
              onValueChange={(value) => {
                setValue("paperType", value, { shouldValidate: true });
                trigger("paperType");
              }}
            >
              <SelectTrigger
                className={`${errors.paperType ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
                placeholder="Select paper type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journal">Journal</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
              </SelectContent>
            </Select>
            {errors.paperType && (
              <p className="text-sm text-red-500 mt-1">
                {errors.paperType.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span className="text-red-500">*</span>
              Status
            </Label>
            <input
              type="hidden"
              {...register("status", {
                required: "Status is required",
              })}
            />
            <Select
              value={watch("status") || ""}
              onValueChange={(value) => {
                setValue("status", value as "published" | "ongoing" | "under_review" | "in_preparation" | "revision", {
                  shouldValidate: true,
                });
                trigger("status");
              }}
            >
              <SelectTrigger
                className={`${errors.status ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
                placeholder="Select status"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="in_preparation">In Preparation</SelectItem>
                <SelectItem value="revision">Revision</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Abstract Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Abstract</h3>
        </div>
        
        <div>
          <Label htmlFor="abstract" className="mb-2 block text-gray-700">
            Research Abstract
          </Label>
          <textarea
            id="abstract"
            placeholder="Enter a brief summary of your research paper..."
            {...register("abstract", {
              validate: (value) => {
                if (value && value.trim().length > 0 && value.trim().length < 10) {
                  return "Abstract must be at least 10 characters";
                }
                return true;
              }
            })}
            className={`w-full px-3 py-2 border rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.abstract ? "border-red-500" : "border-gray-300"
            } transition-colors`}
          />
          {errors.abstract && (
            <p className="text-sm text-red-500 mt-1">
              {errors.abstract.message}
            </p>
          )}
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Citations */}
          <div>
            <Label htmlFor="citations" className="mb-2 flex items-center gap-2">
              <Quote className="h-4 w-4 text-gray-500" />
              Citations
            </Label>
            <Input
              id="citations"
              type="number"
              placeholder="0"
              {...register("citations", {
                min: {
                  value: 0,
                  message: "Citations cannot be negative",
                },
                valueAsNumber: true,
              })}
              className={`${errors.citations ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.citations && (
              <p className="text-sm text-red-500 mt-1">
                {errors.citations.message}
              </p>
            )}
          </div>

          {/* Research Area */}
          <div>
            <Label htmlFor="researchArea" className="mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Research Area
            </Label>
            <Input
              id="researchArea"
              type="text"
              placeholder="e.g., Artificial Intelligence"
              {...register("researchArea", {
                validate: (value) => {
                  if (value && value.trim().length > 0 && value.trim().length < 2) {
                    return "Research area must be at least 2 characters";
                  }
                  return true;
                }
              })}
              className={`${errors.researchArea ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.researchArea && (
              <p className="text-sm text-red-500 mt-1">
                {errors.researchArea.message}
              </p>
            )}
          </div>

          {/* Funding */}
          <div>
            <Label htmlFor="funding" className="mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              Funding
            </Label>
            <Input
              id="funding"
              type="text"
              placeholder="e.g., National Institutes of Health"
              {...register("funding", {
                validate: (value) => {
                  if (value && value.trim().length > 0 && value.trim().length < 2) {
                    return "Funding information must be at least 2 characters";
                  }
                  return true;
                }
              })}
              className={`${errors.funding ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"} transition-colors`}
            />
            {errors.funding && (
              <p className="text-sm text-red-500 mt-1">
                {errors.funding.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFields;
