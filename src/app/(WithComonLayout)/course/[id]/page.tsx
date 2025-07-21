"use client";

import { useState, useEffect, use } from "react";
import { getCourseById, type Course } from "@/services/courses";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  CourseHeader,
  CourseImage,
  CourseContent,
  CourseSidebar,
  LoadingSpinner,
  CourseNotFound,
} from "@/components/course/single";

const CourseSinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return <CourseNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Courses",
            href: "/course",
          },
          {
            label: course.title,
            current: false,
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <CourseHeader course={course} />
            <CourseImage course={course} />
            <CourseContent course={course} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSinglePage;
