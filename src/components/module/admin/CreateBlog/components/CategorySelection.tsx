import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface CategorySelectionProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  customCategory: string;
  setCustomCategory: (value: string) => void;
  showCustomInput: boolean;
  setShowCustomInput: (value: boolean) => void;
  allCategories: Array<{ value: string; label: string }>;
  addCategory: (category: { value: string; label: string }) => void;
  setValue: (name: string, value: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  customCategory,
  setCustomCategory,
  showCustomInput,
  setShowCustomInput,
  allCategories,
  addCategory,
  setValue,
}) => {
  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectedCategory("");
      setValue("category", "");
    } else {
      setShowCustomInput(false);
      setSelectedCategory(value);
      setValue("category", value);
      setCustomCategory("");
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      const newCategory = {
        value: customCategory.trim().toLowerCase().replace(/\s+/g, "-"),
        label: customCategory.trim(),
      };

      addCategory(newCategory);
      setSelectedCategory(newCategory.value);
      setValue("category", newCategory.value);
      setShowCustomInput(false);
      setCustomCategory("");
      toast.success("Custom category added successfully!");
    } else {
      toast.error("Please enter a category name");
    }
  };

  const handleCancelCustomCategory = () => {
    setShowCustomInput(false);
    setCustomCategory("");
    setSelectedCategory("");
    setValue("category", "");
  };

  return (
    <div>
      <Label htmlFor="category" className="text-lg font-semibold mb-2 block">
        Blog Category
      </Label>

      {!showCustomInput ? (
        <div className="space-y-3">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full text-lg" placeholder="Select a category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category, index) => (
                <SelectItem key={index} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCategory && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm text-green-700">
                Selected:{" "}
                <strong>
                  {allCategories.find((cat) => cat.value === selectedCategory)?.label}
                </strong>
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Can't find your category?</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowCustomInput(true);
                setSelectedCategory("");
                setValue("category", "");
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" />
              Add Custom Category
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter new category name"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomCategory();
                  }
                }}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelCustomCategory}
              className="text-gray-600 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Press Enter or click Add to create the category
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancelCustomCategory}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelection; 