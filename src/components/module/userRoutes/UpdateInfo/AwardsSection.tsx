"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UpdateInfoAwardsSectionProps } from "@/type";

export function AwardsSection({
  awardsList,
  onAddAward,
  onRemoveAward,
  onUpdateAward,
  errors,
}: UpdateInfoAwardsSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Awards & Achievements</h4>
      <div className="space-y-3">
        {awardsList.map((award, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <Input
              value={award}
              onChange={(e) => onUpdateAward(i, e.target.value)}
              placeholder="Enter award or achievement"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAward(i)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={onAddAward}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Award
        </Button>
        {errors.awards && (
          <p className="text-red-500 text-sm">
            {errors.awards.message}
          </p>
        )}
      </div>
    </div>
  );
}
