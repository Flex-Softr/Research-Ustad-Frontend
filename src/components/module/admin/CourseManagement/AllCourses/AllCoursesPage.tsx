"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import AllCoursesTable from "./AllCoursesTable";
import { Course } from "@/services/courses";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses } from "@/services/courses/coursesSlice";

const AllCoursesPage = () => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading, error } = useSelector(
    (state: RootState) => state.courses // adjust slice name if needed
  );

  // Load courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  console.log("courses", courses);

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (isEditModalOpen && !selectedCourse) {
      router.push("/admin/dashboard/managecourse/add-course");
    }
  }, [isEditModalOpen, selectedCourse, router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
          <p className="text-gray-600">Manage all courses in the system</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateCourse}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Table */}
      <AllCoursesTable
        onEditCourse={handleEditCourse}
        onViewCourse={handleViewCourse}
      />

      {/* TODO: Add Edit/View Modals here */}
      {/* These will be implemented as separate components */}
    </div>
  );
};

export default AllCoursesPage;
