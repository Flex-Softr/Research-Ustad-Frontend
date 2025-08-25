import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteBlogCategory, fetchBlogCategories } from "@/services/blogCategories/blogCategoriesSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Edit, Trash2, MoreHorizontal, FileText, Eye } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { BlogCategory } from "./BlogCategoryForm";

interface BlogCategoryTableProps {
  onEditCategory: (category: BlogCategory) => void;
}

const BlogCategoryTable = ({ onEditCategory }: BlogCategoryTableProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<BlogCategory | null>(
    null
  );
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.blogCategories
  );

  // Load categories data on mount
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  // Get paginated categories
  const getPaginatedCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categories.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageCategoryIds = getPaginatedCategories().map(
        (category) => category._id
      );
      setSelectedCategories(currentPageCategoryIds);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedCategories.length === 0) return;

    try {
      // Delete all selected categories
      const deletePromises = selectedCategories.map(categoryId => 
        dispatch(deleteBlogCategory(categoryId)).unwrap()
      );
      
      await Promise.all(deletePromises);
      toast.success(`Successfully deleted ${selectedCategories.length} blog categories`);
    } catch (error) {
      console.error("Error deleting blog categories:", error);
      toast.error("Failed to delete blog categories");
    }
    // Clear selection and close dialog regardless of success or error
    setSelectedCategories([]);
    setBulkDeleteDialogOpen(false);
  };

  // Handle individual delete
  const handleDeleteCategory = (category: BlogCategory) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await dispatch(deleteBlogCategory(categoryToDelete._id)).unwrap();
        toast.success("Blog category deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog category:", error);
        toast.error("Failed to delete blog category");
      }
      setCategoryToDelete(null);
    }
    // Always close the dialog, regardless of success or error
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="md"
          variant="border"
          text="Loading blog categories..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading blog categories: {error}</p>
      </div>
    );
  }

  const paginatedCategories = getPaginatedCategories();
  const isAllSelected =
    paginatedCategories.length > 0 &&
    selectedCategories.length === paginatedCategories.length;

  // Calculate overall statistics
  const totalBlogs = categories.reduce((sum, cat) => sum + cat.blogCount, 0);
  const activeCategories = categories.filter(cat => cat.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Blogs</p>
                <p className="text-2xl font-bold text-blue-900">{totalBlogs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">Active Categories</p>
                <p className="text-2xl font-bold text-green-900">{activeCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-yellow-800">
                  {selectedCategories.length} category(ies) selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Blog Categories ({categories.length})</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              <span>{totalBlogs} total blogs</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Blogs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category._id)}
                        onCheckedChange={(checked) =>
                          handleSelectCategory(category._id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {category.description || "No description"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-secondary" />
                        <span className="font-medium">
                          {category.blogCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer"
                            onClick={() => {
                              setTimeout(() => onEditCategory(category), 0);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setTimeout(() => handleDeleteCategory(category), 0);
                            }}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {categories.length > 10 && (
            <div className="mt-6">
              <Pagination
                itemsPerPage={10}
                currentPage={currentPage}
                totalItems={categories.length}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Blog Category"
        itemName={categoryToDelete?.name || ""}
        itemType="blog category"
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        title="Delete Selected Blog Categories"
        itemName={`${selectedCategories.length} blog categories`}
        itemType="blog categories"
      />
    </div>
  );
};

export default BlogCategoryTable;
