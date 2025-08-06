"use client";

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
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Users,
  DollarSign,
  Star,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { AllCoursesTableProps, Course } from "@/type";
import Pagination from "@/components/shared/Pagination";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses, deleteCourse } from "@/services/courses/coursesSlice";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import { toast } from "sonner";

const AllCoursesTable = ({
  onEditCourse,
  onViewCourse,
}: AllCoursesTableProps) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading, error } = useSelector(
    (state: RootState) => state.courses
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  // Load courses and categories on mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  // Get paginated courses
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return courses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageCourseIds = getPaginatedCourses().map(
        (course) => course._id
      );
      setSelectedCourses(currentPageCourseIds);
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedCourses.length > 0) {
      setBulkDeleteDialogOpen(true);
    }
  };

  const confirmBulkDelete = async () => {
    try {
      // Delete all selected courses
      const deletePromises = selectedCourses.map((courseId) =>
        dispatch(deleteCourse(courseId)).unwrap()
      );

      await Promise.all(deletePromises);

      toast.success(`Successfully deleted ${selectedCourses.length} courses`);
    } catch (error) {
      console.error("Error deleting courses:", error);
      toast.error("Failed to delete courses");
    }
    // Clear selection and close dialog regardless of success or error
    setSelectedCourses([]);
    setBulkDeleteDialogOpen(false);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (courseToDelete) {
      try {
        await dispatch(deleteCourse(courseToDelete._id)).unwrap();
        toast.success("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course");
      }
      setCourseToDelete(null);
    }
    // Always close the dialog, regardless of success or error
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading courses: {error}</p>
      </div>
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Management</span>
            {selectedCourses.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                Delete Selected ({selectedCourses.length})
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedCourses.length ===
                          getPaginatedCourses().length &&
                        getPaginatedCourses().length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPaginatedCourses().map((course, index) => {
                  const isSelected = selectedCourses.includes(course._id);
                  const enrollmentPercentage = Math.round(
                    (course.enrolled / course.capacity) * 100
                  );

                  return (
                    <TableRow key={course._id || index}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectCourse(course._id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={course.imageUrl || "/placeholder-course.jpg"}
                              alt={course.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-course.jpg";
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {course.title}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {course.description
                                ?.replace(/<[^>]*>/g, "")
                                .substring(0, 10)}
                              ...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {getCategoryName(course.category)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {course.level}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {course.enrolled}/{course.capacity}
                          </span>
                        </div>
                        {/* <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full"
                            style={{
                              width: `${enrollmentPercentage}%`,
                            }}
                          ></div>
                        </div> */}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {course.isFree ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Free
                            </span>
                          ) : (
                            <span className="font-medium text-green-600">
                              ${course.fee}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({course.totalReviews})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu key={course._id}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onViewCourse(course)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditCourse(course)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-red-600 focus:bg-red-50"
                              onClick={() => {
                                setTimeout(() => handleDeleteCourse(course), 0);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                Get started by creating your first course.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {courses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={courses.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          className="mt-6"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Course"
        itemName={courseToDelete?.title || ""}
        itemType="course"
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        title="Delete Selected Courses"
        itemName={`${selectedCourses.length} courses`}
        itemType="courses"
      />
    </>
  );
};

export default AllCoursesTable;
