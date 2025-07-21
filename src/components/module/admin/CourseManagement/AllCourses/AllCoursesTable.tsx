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
import { Course } from "@/services/courses";
import Pagination from "@/components/shared/Pagination";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AllCoursesTableProps {
  onEditCourse: (course: Course) => void;
  onViewCourse: (course: Course) => void;
}

const AllCoursesTable = ({
  onEditCourse,
  onViewCourse,
}: AllCoursesTableProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/data/courses.json");
        const data = await response.json();
        setCourses(data.courses);
        setTotalPages(Math.ceil(data.courses.length / itemsPerPage));
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Get paginated courses
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return courses.slice(startIndex, endIndex);
  };

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageCourseIds = getPaginatedCourses().map(
        (course) => course.id
      );
      setSelectedCourses(currentPageCourseIds);
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, courseId]);
    } else {
      setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedCourses.length === 0) return;

    setCourses((prev) =>
      prev.filter((course) => !selectedCourses.includes(course.id))
    );
    setSelectedCourses([]);
  };

  // Handle individual delete
  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses((prev) =>
        prev.filter((course) => course.id !== courseToDelete.id)
      );
      setCourseToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="md" variant="border" text="Loading courses..." />
      </div>
    );
  }

  const paginatedCourses = getPaginatedCourses();
  const isAllSelected =
    paginatedCourses.length > 0 &&
    selectedCourses.length === paginatedCourses.length;

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedCourses.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-yellow-800">
                  {selectedCourses.length} course(s) selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCourses([])}
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

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Courses ({courses.length})</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>
                {courses
                  .reduce((total, course) => total + course.enrolled, 0)
                  .toLocaleString()}{" "}
                total enrollments
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
                  <TableHead>Course</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Instructors</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCourse(course.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded overflow-hidden">
                          <Image
                            src={course.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.duration} • {course.level}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {course.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {course.instructors.map((instructor, index) => (
                          <div key={index} className="text-gray-700">
                            {instructor.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {course.enrolled.toLocaleString()}/
                          {course.capacity.toLocaleString()}
                        </div>
                        <div className="text-gray-500">
                          {Math.round(
                            (course.enrolled / course.capacity) * 100
                          )}
                          % full
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-green-600">
                          ${course.fee}
                        </div>
                        {course.originalFee > course.fee && (
                          <div className="text-gray-500 line-through">
                            ${course.originalFee}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({course.totalReviews})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          new Date(course.startDate) > new Date()
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {new Date(course.startDate) > new Date()
                          ? "Upcoming"
                          : "Active"}
                      </span>
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
                            onClick={() => onViewCourse(course)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditCourse(course)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCourse(course)}
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

          {courses.length > 10 && (
            <div className="mt-6">
              <Pagination
                itemsPerPage={10}
                currentPage={currentPage}
                totalItems={courses.length}
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
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{courseToDelete?.title}"? This
              action cannot be undone.
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

export default AllCoursesTable;
