"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { LearningObjectivesSectionProps } from "@/type";


export function LearningObjectivesSection({
  objectives,
  onAddObjective,
  onRemoveObjective,
  onUpdateObjective,
  errors,
}: LearningObjectivesSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>What You Will Learn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {objectives.map((objective, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <Input
              value={objective}
              onChange={(e) => onUpdateObjective(i, e.target.value)}
              placeholder="Enter learning objective"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveObjective(i)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={onAddObjective} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Learning Objective
        </Button>
        {getFieldError("whatYouWillLearn") && (
          <p className="text-sm text-red-600">
            {getFieldError("whatYouWillLearn")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
