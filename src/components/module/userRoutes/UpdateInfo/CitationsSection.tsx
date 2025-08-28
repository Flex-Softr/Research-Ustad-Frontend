"use client";

import { Input } from "@/components/ui/input";
import { UpdateInfoCitationsSectionProps } from "@/type";

export function CitationsSection({ register, errors }: UpdateInfoCitationsSectionProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Total Citations</span>
          <Input
            type="number"
            min="0"
            {...register("citations", {
              min: {
                value: 0,
                message: "Citations cannot be negative"
              },
              validate: (value) => {
                if (value && value < 0) {
                  return "Citations cannot be negative";
                }
                return true;
              }
            })}
            placeholder="Enter total number of citations"
          />
          {errors.citations && (
            <p className="text-red-500 text-sm">
              {errors.citations.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
