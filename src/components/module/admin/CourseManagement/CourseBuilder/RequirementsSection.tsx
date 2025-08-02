"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { RequirementsSectionProps } from "@/type";



export function RequirementsSection({
  requirements,
  onAddRequirement,
  onRemoveRequirement,
  onUpdateRequirement,
  errors,
}: RequirementsSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requirements.map((requirement, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <Input
              value={requirement}
              onChange={(e) => onUpdateRequirement(i, e.target.value)}
              placeholder="Enter requirement"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveRequirement(i)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={onAddRequirement} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Requirement
        </Button>
        {getFieldError("requirements") && (
          <p className="text-sm text-red-600">
            {getFieldError("requirements")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
