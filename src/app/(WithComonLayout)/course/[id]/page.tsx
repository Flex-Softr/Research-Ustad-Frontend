"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSingleCourse } from "@/services/courses/coursesSlice";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  CourseHeader,
  CourseContent,
  CourseSidebar,
  LoadingSpinner,
  CourseNotFound,
} from "@/components/course/single";

const CourseSinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course, isLoading, error } = useSelector(
    (state: RootState) => state.courses
  );

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { id } = await params;
        if (id) {
          dispatch(fetchSingleCourse(id));
        }
      } catch (error) {
        console.error("Error loading course:", error);
      }
    };

    loadCourse();
  }, [dispatch, params]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading course
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
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
