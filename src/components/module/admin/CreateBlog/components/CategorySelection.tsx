import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, ExternalLink } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GetMe } from "@/services/singleUser";

interface CategorySelectionProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  allCategories: Array<{
    value: string;
    name: string;
    description?: string;
    blogCount?: number;
  }>;
  setValue: (name: string, value: string) => void;
  isLoading?: boolean;
  refreshCategories?: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  allCategories,
  setValue,
  isLoading = false,
  refreshCategories,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Check if user is admin or super admin
  const isAdmin = user?.role === "admin" || user?.role === "superAdmin";

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setValue("category", value);
  };

  // Fetch user data to determine role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await GetMe();
        setUser(result?.data || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCreateCategory = () => {
    // Navigate to blog category management page with return parameter
    router.push("/admin/dashboard/blogCategory");
  };

  // Handle newly created category selection
  useEffect(() => {
    const newCategoryId = searchParams.get("newCategoryId");
    const newCategoryName = searchParams.get("newCategoryName");

    if (newCategoryId && newCategoryName && refreshCategories) {
      // Refresh categories to include the new one
      refreshCategories();

      // Select the newly created category
      setTimeout(() => {
        setSelectedCategory(newCategoryId);
        setValue("category", newCategoryId);
        toast.success(
          `Category "${newCategoryName}" created and selected successfully!`
        );
      }, 500);

      // Clean up URL params
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("newCategoryId");
      newUrl.searchParams.delete("newCategoryName");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, setSelectedCategory, setValue, refreshCategories, router]);

  const selectedCategoryData = allCategories.find(
    (cat) => cat.value === selectedCategory
  );

  return (
    <div>
      <Label htmlFor="category" className="text-lg font-semibold mb-2 block">
        Blog Category *
      </Label>

      <div className="space-y-3">
        {/* Basic HTML Select - This solves the ID display problem */}
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          disabled={isLoading}
        >
          <option value="">Select a category</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category.value}>
              {category.name}
            </option>
          ))}

                  </select>

        {/* Message for non-admin users when categories exist */}
        {!isLoading &&
          allCategories.length > 0 &&
          !isAdmin &&
          !isUserLoading && (
            <div className="flex items-center justify-center p-2 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600 text-center">
                Please contact an administrator to create categories if you don't find your category.
              </p>
            </div>
          )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            <span>Loading categories...</span>
          </div>
        )}

        {/* No Categories State */}
        {!isLoading && allCategories.length === 0 && (
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                No categories available
              </p>
              {isAdmin && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCreateCategory}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4" />
                  Create First Category
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
              {!isAdmin && !isUserLoading && (
                <p className="text-sm text-gray-500">
                  Please contact an administrator to create categories.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Selected Category Display */}
        {selectedCategory && selectedCategoryData && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-sm text-green-700">
              Selected: <strong>{selectedCategoryData.name}</strong>
              {selectedCategoryData.description && (
                <span className="text-gray-600 ml-2">
                  - {selectedCategoryData.description}
                </span>
              )}
            </span>
          </div>
        )}

        {/* Create Category Link - Only show if categories exist and user is admin */}
        {!isLoading && allCategories.length > 0 && isAdmin && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Can't find your category?</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCreateCategory}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" />
              Create New Category
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelection;
