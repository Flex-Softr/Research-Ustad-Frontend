"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addBlogCategory, updateBlogCategory } from "@/services/blogCategories/blogCategoriesSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BlogCategoryTable from "./BlogCategoryTable";
import BlogCategoryFormModal from "./BlogCategoryFormModal";

// Blog Category interface
export interface BlogCategory {
  _id: string;
  name: string;
  description?: string;
  blogCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

const BlogCategoryForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditCategory = (category: BlogCategory) => {
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
    status?: "active" | "inactive";
  }) => {
    try {
      if (selectedCategory) {
        // Update existing category
        await dispatch(updateBlogCategory({ 
          id: selectedCategory._id, 
          categoryData 
        })).unwrap();
        toast.success("Blog category updated successfully!");
      } else {
        // Create new category
        await dispatch(addBlogCategory(categoryData)).unwrap();
        toast.success("Blog category created successfully!");
      }
      
      setIsFormOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error("Error saving blog category:", error);
      toast.error(error.message || "Failed to save blog category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
          <p className="text-gray-600">
            Manage blog categories and classifications
          </p>
        </div>
        <Button
          onClick={handleCreateCategory}
          className="cursor-pointer bg-brand-primary hover:bg-brand-primary/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Table */}
      <BlogCategoryTable onEditCategory={handleEditCategory} />

      {/* Category Form Modal */}
      <BlogCategoryFormModal
        category={selectedCategory}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default BlogCategoryForm;
