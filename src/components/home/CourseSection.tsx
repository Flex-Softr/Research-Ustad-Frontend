"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses } from "@/services/courses/coursesSlice";
import { fetchCategories } from "@/services/categories/categoriesSlice";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  MapPin,
  User,
  ArrowRight,
  Star,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Container, SectionHeader, Button } from "@/components/ui/core";
import FallbackImage from "@/components/shared/FallbackImage";

// Skeleton component for course cards
const CourseCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="relative overflow-hidden">
      <Skeleton className="w-full h-48 bg-gray-200" />
      <div className="absolute top-4 left-4">
        <Skeleton className="w-20 h-6 rounded-full bg-gray-300" />
      </div>
    </div>

    {/* Content skeleton */}
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300" />
        <Skeleton className="h-4 w-full mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-2/3 mb-6 bg-gray-300" />
      </div>

      {/* Course details skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-32 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-28 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-20 bg-gray-300" />
        </div>
      </div>

      {/* Price and CTA skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Skeleton className="h-8 w-20 bg-gray-300" />
        <Skeleton className="h-10 w-24 rounded-lg bg-gray-300" />
      </div>
    </div>
  </div>
);

const CoursesSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading, error } = useSelector(
    (state: RootState) => state.courses
  );
  const { categories } = useSelector((state: RootState) => state.categories);

  // Fetch courses and categories on component mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);


  // Helper function to get category name from ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  };

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-2">
              Failed to load courses
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button variant="primary" onClick={() => dispatch(fetchCourses())}>
              Try Again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Loading state with skeleton
  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <Container>
          <SectionHeader
            title="Featured Courses"
            description="Enhance your skills with our expert-led courses designed for students and researchers."
          />

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // No courses state
  if (!courses || courses.length === 0) {
    return (
      <section className="py-20 bg-gray-100">
        <Container>
          <div className="text-center">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-brand-primary)] mb-2">
              No courses available
            </h3>
            <p className="text-gray-600">Check back later for new courses!</p>
          </div>
        </Container>
      </section>
    );
  }

  // Get featured courses (first 3 courses)
  const featuredCourses = courses.slice(0, 3);

  return (
    <section className="py-20 bg-gray-100">
      <Container>
        <SectionHeader
          title="Featured Courses"
          description="Enhance your skills with our expert-led courses designed for students and researchers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <FallbackImage
                  src={
                    course.imageUrl ||
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover"
                  width={1000}
                  height={1000}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {getCategoryName(course.category)}
                  </span>
                  {course.isFree && (
                    <span className="bg-green-500 w-fit
                     text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Free
                    </span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold font-serif text-[var(--color-brand-primary)] mb-3 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {course.description?.substring(0, 100)}...
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 text-[var(--color-brand-primary)] mr-3" />
                    <span className="font-medium">
                      Instructor: {course.instructors?.[0]?.name || "TBA"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-[var(--color-brand-primary)] mr-3" />
                    <span className="font-medium">
                      Starts: {formatDate(course.startDate)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[var(--color-brand-primary)] mr-3" />
                    <span className="font-medium">{course.location}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-2xl font-bold text-[var(--color-brand-primary)]">
                    {course.isFree ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>{course.fee} BDT</span>
                    )}
                  </div>

                  <Link
                    href={`/course/${course._id}`}
                    className="bg-[var(--color-brand-primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-brand-primary)]/80 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <Link href="/course">
            <Button variant="primary">View All Courses</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CoursesSection;
