"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

interface Category {
  id: string;
  name: string;
  description?: string;
  courseCount: number;
  totalEnrollments: number;
  createdAt: string;
}

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleSaveCategory = (categoryData: {
    name: string;
    description?: string;
  }) => {
    // TODO: Implement actual save logic
    console.log("Saving category:", categoryData);

    if (selectedCategory) {
      // Update existing category
      console.log("Updating category:", selectedCategory.id);
    } else {
      // Create new category
      console.log("Creating new category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Categories
          </h1>
          <p className="text-gray-600">
            Manage course categories and classifications
          </p>
        </div>
        <Button onClick={handleCreateCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Table */}
      <CategoryTable onEditCategory={handleEditCategory} />

      {/* Category Form */}
      <CategoryForm
        category={selectedCategory}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default CategoriesPage;
