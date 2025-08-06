import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteCategory, fetchCategories } from "@/services/categories/categoriesSlice";
import { fetchCourses } from "@/services/courses/coursesSlice";
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
import { Edit, Trash2, MoreHorizontal, BookOpen, Users } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { Category } from "@/services/categories/categoriesSlice";
import { Course } from "@/type";

interface CategoryTableProps {
  onEditCategory: (category: Category) => void;
}

interface CategoryWithStats extends Category {
  courseCount: number;
  totalEnrollments: number;
  averageRating: number;
  totalRevenue: number;
}

const CategoryTable = ({ onEditCategory }: CategoryTableProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categories
  );

  // Load categories and courses data on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCoursesLoading(true);
        const result = await dispatch(fetchCourses()).unwrap();
        setCourses(result);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
  }, [dispatch]);

  // Calculate category statistics
  const getCategoryStats = (category: Category): CategoryWithStats => {
    const categoryCourses = courses.filter(course => 
      course.category === category._id || course.category === category.name
    );

    const courseCount = categoryCourses.length;
    const totalEnrollments = categoryCourses.reduce((sum, course) => sum + course.enrolled, 0);
    const averageRating = categoryCourses.length > 0 
      ? categoryCourses.reduce((sum, course) => sum + course.rating, 0) / categoryCourses.length 
      : 0;
    const totalRevenue = categoryCourses.reduce((sum, course) => {
      if (course.isFree) {
        return sum; // Free courses don't contribute to revenue
      }
      return sum + (course.fee * course.enrolled);
    }, 0);

    return {
      ...category,
      courseCount,
      totalEnrollments,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalRevenue
    };
  };

  // Get categories with calculated stats
  const categoriesWithStats = categories.map(getCategoryStats);

  // Get paginated categories
  const getPaginatedCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categoriesWithStats.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(categoriesWithStats.length / itemsPerPage);

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
        dispatch(deleteCategory(categoryId)).unwrap()
      );
      
      await Promise.all(deletePromises);
      toast.success(`Successfully deleted ${selectedCategories.length} categories`);
    } catch (error) {
      console.error("Error deleting categories:", error);
      toast.error("Failed to delete categories");
    }
    // Clear selection and close dialog regardless of success or error
    setSelectedCategories([]);
    setBulkDeleteDialogOpen(false);
  };

  // Handle individual delete
  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await dispatch(deleteCategory(categoryToDelete._id)).unwrap();
        toast.success("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
      }
      setCategoryToDelete(null);
    }
    // Always close the dialog, regardless of success or error
    setDeleteDialogOpen(false);
  };

  if (isLoading || coursesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="md"
          variant="border"
          text="Loading categories and course data..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading categories: {error}</p>
      </div>
    );
  }

  const paginatedCategories = getPaginatedCategories();
  const isAllSelected =
    paginatedCategories.length > 0 &&
    selectedCategories.length === paginatedCategories.length;

  // Calculate overall statistics
  const totalCourses = categoriesWithStats.reduce((sum, cat) => sum + cat.courseCount, 0);
  const totalEnrollments = categoriesWithStats.reduce((sum, cat) => sum + cat.totalEnrollments, 0);
  const totalRevenue = categoriesWithStats.reduce((sum, cat) => sum + cat.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Courses</p>
                <p className="text-2xl font-bold text-blue-900">{totalCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-green-900">{totalEnrollments.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-900">${totalRevenue.toLocaleString()}</p>
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
            <span>Course Categories ({categoriesWithStats.length})</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>{totalCourses} total courses</span>
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
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Avg Rating</TableHead>
                  <TableHead>Revenue</TableHead>
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
                        {category.description  ?.replace(/<[^>]*>/g, "")
                                .substring(0, 10) || "No description"}...
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
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">
                          {category.averageRating}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">
                        ${category.totalRevenue.toLocaleString()}
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
                            onClick={() => {
                              setTimeout(() => handleDeleteCategory(category), 0);
                            }}
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
          {categoriesWithStats.length > 10 && (
            <div className="mt-6">
              <Pagination
                itemsPerPage={10}
                currentPage={currentPage}
                totalItems={categoriesWithStats.length}
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
        title="Delete Category"
        itemName={categoryToDelete?.name || ""}
        itemType="category"
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={handleBulkDelete}
        title="Delete Selected Categories"
        itemName={`${selectedCategories.length} categories`}
        itemType="categories"
      />
    </div>
  );
};

export default CategoryTable;