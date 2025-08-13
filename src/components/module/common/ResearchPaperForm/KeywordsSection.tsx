"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Plus, X } from "lucide-react";

interface KeywordsSectionProps {
  keywords: string[];
  onKeywordChange: (index: number, value: string) => void;
  onAddKeyword: () => void;
  onRemoveKeyword: (index: number) => void;
}

const KeywordsSection: React.FC<KeywordsSectionProps> = ({
  keywords,
  onKeywordChange,
  onAddKeyword,
  onRemoveKeyword,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-pink-600" />
        <h3 className="text-lg font-semibold text-gray-900">Keywords</h3>
      </div>
      
      <div className="space-y-4">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1">
              <Label className="text-sm text-gray-600 mb-2 block">
                Keyword {index + 1}
              </Label>
              <Input
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(index, e.target.value)}
                placeholder={`Enter keyword ${index + 1}`}
                className={`${
                  keyword.trim() !== "" && keyword.trim().length < 2
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-blue-500"
                } transition-colors`}
              />
              {keyword.trim() !== "" && keyword.trim().length < 2 && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  Keyword must be at least 2 characters
                </p>
              )}
            </div>
            {keywords.length > 1 && (
              <Button
                type="button"
                onClick={() => onRemoveKeyword(index)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-6"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Add Keyword Button */}
      <Button
        variant="outline"
        type="button"
        onClick={onAddKeyword}
        className="w-full mt-4 border-dashed border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Keyword
      </Button>
    </div>
  );
};

export default KeywordsSection;
