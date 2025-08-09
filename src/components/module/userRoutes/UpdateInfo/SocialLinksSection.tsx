"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoSocialLinksSectionProps } from "@/type";

export function SocialLinksSection({ register, errors }: UpdateInfoSocialLinksSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">LinkedIn</span>
          <Input
            type="url"
            {...register("linkedin", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid LinkedIn URL"
              }
            })}
            placeholder="Enter LinkedIn URL"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">
              {errors.linkedin.message}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">ResearchGate</span>
          <Input
            type="url"
            {...register("researchgate", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid ResearchGate URL"
              }
            })}
            placeholder="Enter ResearchGate URL"
          />
          {errors.researchgate && (
            <p className="text-red-500 text-sm">
              {errors.researchgate.message}
            </p>
          )}
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium">Google Scholar</span>
          <Input
            type="url"
            {...register("googleScholar", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid Google Scholar URL"
              }
            })}
            placeholder="Enter Google Scholar URL"
          />
          {errors.googleScholar && (
            <p className="text-red-500 text-sm">
              {errors.googleScholar.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
