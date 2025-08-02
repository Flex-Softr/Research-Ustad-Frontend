"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addCategory, updateCategory } from "@/services/categories/categoriesSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import { Category } from "@/services/categories/categoriesSlice";

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleSaveCategory = async (categoryData: {
    name: string;
    description?: string;
    status?: 'active' | 'inactive';
  }) => {
    try {
      if (selectedCategory) {
        // Update existing category
        await dispatch(updateCategory({ 
          id: selectedCategory._id, 
          categoryData 
        })).unwrap();
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await dispatch(addCategory(categoryData)).unwrap();
        toast.success("Category created successfully!");
      }
      
      setIsFormOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast.error(error.message || "Failed to save category");
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
      <CategoryTable 
        onEditCategory={handleEditCategory} 
      />

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
