"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UpdateInfoExpertiseSectionProps } from "@/type";

export function ExpertiseSection({
  expertiseList,
  onAddExpertise,
  onRemoveExpertise,
  onUpdateExpertise,
  errors,
}: UpdateInfoExpertiseSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Expertise Areas (Optional)</h4>
      <div className="space-y-3">
        {expertiseList.map((expertise, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <Input
              value={expertise}
              onChange={(e) => onUpdateExpertise(i, e.target.value)}
              placeholder="Enter expertise area"
              className="flex-1"
            />
            {expertiseList.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveExpertise(i)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={onAddExpertise}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expertise Area
        </Button>
        {errors.expertise && (
          <p className="text-red-500 text-sm">
            {errors.expertise.message}
          </p>
        )}
      </div>
    </div>
  );
}
