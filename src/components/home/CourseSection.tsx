"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses } from "@/services/courses/coursesSlice";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import { Button } from "@/components/ui/button";
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
import { Container } from "@/components/ui/core";

// Skeleton component for course cards
const CourseCardSkeleton = () => (
  <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="relative overflow-hidden">
      <Skeleton className="w-full h-48 bg-gray-300" />
      <div className="absolute top-4 left-4">
        <Skeleton className="w-24 h-8 rounded-full bg-gray-400" />
      </div>
      <div className="absolute top-4 right-4">
        <Skeleton className="w-8 h-8 rounded-full bg-gray-400" />
      </div>
    </div>

    {/* Content skeleton */}
    <div className="p-6">
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-gray-300" />
      </div>

      {/* Course details skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-32 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-28 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-20 bg-gray-300" />
        </div>
      </div>

      {/* Price and CTA skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Skeleton className="h-8 w-20 bg-gray-300" />
        <Skeleton className="h-10 w-32 rounded-full bg-gray-300" />
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


  console.log('coursesss', courses)

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
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-100 relative overflow-hidden">
        <Container>
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Star className="w-4 h-4" />
              Featured Courses
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary">
                Expert-Led
              </span>
              <span className="text-gray-900">Courses</span>
            </h2>
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Failed to load courses
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button
                  onClick={() => dispatch(fetchCourses())}
                  className="bg-brand-primary hover:bg-brand-secondary text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Loading state with skeleton
  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        <Container>
          {/* Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Star className="w-4 h-4" />
              Featured Courses
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary">
                Expert-Led
              </span>
              <span className="text-gray-900">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Enhance your skills with our expert-led courses designed for
              students and researchers.
            </p>
          </div>

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
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
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-100 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        <Container>
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Star className="w-4 h-4" />
              Featured Courses
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary">
                Expert-Led
              </span>
              <span className="text-gray-900">Courses</span>
            </h2>
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses available
                </h3>
                <p className="text-gray-600">
                  Check back later for new courses!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Get featured courses (first 3 courses)
  const featuredCourses = courses.slice(0, 3);

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-blue-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Star className="w-4 h-4" />
            Featured Courses
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary">
              Expert-Led
            </span>
            <span className="text-gray-900">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Enhance your skills with our expert-led courses designed for
            students and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          {featuredCourses.map((course) => (
            <div
              key={course._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    course.imageUrl ||
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback image on error
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {getCategoryName(course.category)}
                  </span>
                  {course.isFree && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Free
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-brand-primary fill-current" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.description?.substring(0, 100)}...
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">
                      Instructor: {course.instructors?.[0]?.name || "TBA"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="font-medium">
                      Starts: {formatDate(course.startDate)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">{course.location}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-2xl font-black text-brand-primary">
                    {course.isFree ? (
                      <>
                        <span className="text-green-600 font-bold">Free</span>
                      </>
                    ) : (
                      <>
                        <span> {course.fee} tk</span>
                      </>
                    )}
                  </div>

                  <Link
                    href={`/course/${course._id}`}
                    className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center pb-16">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 bg-white text-brand-primary border-2 border-brand-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CoursesSection;
