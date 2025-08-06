"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { TagsSectionProps } from "@/type";



export function TagsSection({
  tags,
  onAddTag,
  onRemoveTag,
  onUpdateTag,
  errors,
  hasAttemptedSubmit = false,
}: TagsSectionProps) {
  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  const handleAddTag = () => {
    const input = document.querySelector(
      'input[placeholder="Add a tag"]'
    ) as HTMLInputElement;
    if (input && input.value.trim()) {
      onAddTag(input.value.trim());
      input.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        onAddTag(input.value.trim());
        input.value = "";
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => onRemoveTag(i)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add a tag" onKeyPress={handleKeyPress} />
          <Button variant="outline" onClick={handleAddTag}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {getFieldError("tags") && hasAttemptedSubmit && (
          <p className="text-sm text-red-600">{getFieldError("tags")}</p>
        )}
      </CardContent>
    </Card>
  );
}
