"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoSocialLinksSectionProps } from "@/type";

export function SocialLinksSection({ register, errors }: UpdateInfoSocialLinksSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">LinkedIn</span>
          <Input
            type="url"
            {...register("linkedin", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid LinkedIn URL"
              },
              validate: (value) => {
                if (value && value.trim() !== "") {
                  return /^https?:\/\/.+\..+/.test(value) || "Please enter a valid LinkedIn URL";
                }
                return true;
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
              },
              validate: (value) => {
                if (value && value.trim() !== "") {
                  return /^https?:\/\/.+\..+/.test(value) || "Please enter a valid ResearchGate URL";
                }
                return true;
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

        <label className="space-y-1">
          <span className="text-sm font-medium">Google Scholar</span>
          <Input
            type="url"
            {...register("googleScholar", {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid Google Scholar URL"
              },
              validate: (value) => {
                if (value && value.trim() !== "") {
                  return /^https?:\/\/.+\..+/.test(value) || "Please enter a valid Google Scholar URL";
                }
                return true;
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

        <label className="space-y-1">
          <span className="text-sm font-medium">ORCID ID</span>
          <Input
            type="text"
            {...register("orcid", {
              pattern: {
                value: /^https?:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/,
                message: "Please enter a valid ORCID ID (e.g., https://orcid.org/0000-0000-0000-0000)"
              },
              validate: (value) => {
                if (value && value.trim() !== "") {
                  return /^https?:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(value) || "Please enter a valid ORCID ID";
                }
                return true;
              }
            })}
            placeholder="https://orcid.org/0000-0000-0000-0000"
          />
          {errors.orcid && (
            <p className="text-red-500 text-sm">
              {errors.orcid.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
