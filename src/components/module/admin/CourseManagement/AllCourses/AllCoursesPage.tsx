"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import AllCoursesTable from "./AllCoursesTable";
import { useRouter } from "next/navigation";
import { Course } from "@/type";

const AllCoursesPage = () => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleEditCourse = (course: Course) => {
    // Redirect to the add course page with edit parameter
    router.push(`/admin/dashboard/managecourse/add-course?edit=${course._id}`);
  };

  const handleViewCourse = (course: Course) => {
    // Redirect to the single course page
    router.push(`/course/${course._id}`);
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
    </div>
  );
};

export default AllCoursesPage;
