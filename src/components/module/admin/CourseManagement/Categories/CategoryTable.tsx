import { useState, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, MoreHorizontal, BookOpen, Users } from "lucide-react";
import Pagination from "@/components/shared/Pagination";

interface Category {
  id: string;
  name: string;
  description?: string;
  courseCount: number;
  totalEnrollments: number;
  createdAt: string;
}

interface CategoryTableProps {
  onEditCategory: (category: Category) => void;
}

const CategoryTable = ({ onEditCategory }: CategoryTableProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  // Load categories data
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/data/courses.json");
        const data = await response.json();

        // Extract unique categories and count courses
        const categoryMap = new Map<string, Category>();

        data.courses.forEach((course: any) => {
          const categoryName = course.category;
          if (categoryMap.has(categoryName)) {
            const existing = categoryMap.get(categoryName)!;
            existing.courseCount += 1;
            existing.totalEnrollments += course.enrolled;
          } else {
            categoryMap.set(categoryName, {
              id: categoryName.toLowerCase().replace(/\s+/g, "-"),
              name: categoryName,
              description: `${categoryName} courses`,
              courseCount: 1,
              totalEnrollments: course.enrolled,
              createdAt: new Date().toISOString(),
            });
          }
        });

        const categoriesArray = Array.from(categoryMap.values());
        setCategories(categoriesArray);
        setTotalPages(Math.ceil(categoriesArray.length / itemsPerPage));
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Get paginated categories
  const getPaginatedCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categories.slice(startIndex, endIndex);
  };

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageCategoryIds = getPaginatedCategories().map(
        (category) => category.id
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
  const handleBulkDelete = () => {
    if (selectedCategories.length === 0) return;

    setCategories((prev) =>
      prev.filter((category) => !selectedCategories.includes(category.id))
    );
    setSelectedCategories([]);
  };

  // Handle individual delete
  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryToDelete.id)
      );
      setCategoryToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="md"
          variant="border"
          text="Loading categories..."
        />
      </div>
    );
  }

  const paginatedCategories = getPaginatedCategories();
  const isAllSelected =
    paginatedCategories.length > 0 &&
    selectedCategories.length === paginatedCategories.length;

  return (
    <div className="space-y-6">
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
                  onClick={handleBulkDelete}
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
            <span>Course Categories ({categories.length})</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>
                {categories.reduce(
                  (total, category) => total + category.courseCount,
                  0
                )}{" "}
                total courses
              </span>
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
                  <TableHead>Courses</TableHead>
                  <TableHead>Total Enrollments</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCategory(category.id, checked as boolean)
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
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand-secondary" />
                        <span className="font-medium">
                          {category.courseCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-secondary" />
                        <span className="font-medium">
                          {category.totalEnrollments.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onEditCategory(category)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCategory(category)}
                            className="text-red-600"
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{categoryToDelete?.name}"? This
              will also affect all courses in this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryTable;
