"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses } from "@/services/courses/coursesSlice";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  Clock,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { calculateCourseStatus } from "@/lib/calculateCourseStatus";
import FallbackImage from "../shared/FallbackImage";

const CoursePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedStatus, setExpandedStatus] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

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

  console.log("coursessssssss", courses);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  // Filter courses based on selected filters
  const filteredCourses = courses.filter((course) => {
    const statusMatch =
      selectedStatus === "all" || course.status === selectedStatus;
    const categoryMatch =
      selectedCategory === "all" || course.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  // Get paginated courses
  const getPaginatedCourses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const totalItems = filteredCourses.length;

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    if (type === "status") {
      setSelectedStatus(value);
    } else if (type === "category") {
      setSelectedCategory(value);
    }
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get course status info
  const getCourseStatus = (course) => {
    const status = calculateCourseStatus(
      course.startDate,
      course.endDate,
      course.duration
    );
    const now = new Date();
    const startDate = new Date(course.startDate);

    if (status === "upcoming") {
      const daysUntil = Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        status: "upcoming",
        text: `${daysUntil} days away`,
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-200",
      };
    } else {
      return {
        status: "ongoing",
        text: "In Progress",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
      };
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading courses
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Courses",
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-brand-secondary" />
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              </div>

              {/* Status Filter */}
              <div className="mb-8">
                <button
                  onClick={() => setExpandedStatus(!expandedStatus)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-4 hover:text-brand-secondary transition-colors duration-300"
                >
                  <span>Course Status</span>
                  {expandedStatus ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedStatus && (
                  <div className="space-y-2">
                    {[
                      { id: "all", name: "All Courses", count: totalItems },
                      {
                        id: "upcoming",
                        name: "Upcoming",
                        count: courses.filter((c) => c.status === "upcoming")
                          .length,
                      },
                      {
                        id: "ongoing",
                        name: "Ongoing",
                        count: courses.filter((c) => c.status === "ongoing")
                          .length,
                      },
                    ].map((filter, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilterChange("status", filter.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                          selectedStatus === filter.id
                            ? "bg-brand-primary text-white shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{filter.name}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            selectedStatus === filter.id
                              ? "bg-white/20 text-white"
                              : "bg-brand-secondary/10 text-brand-secondary"
                          }`}
                        >
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <button
                  onClick={() => setExpandedCategory(!expandedCategory)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-4 hover:text-brand-secondary transition-colors duration-300"
                >
                  <span>Categories</span>
                  {expandedCategory ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedCategory && (
                  <div className="space-y-2">
                    {[
                      { id: "all", name: "All Categories", count: totalItems },
                      ...Array.from(
                        new Set(courses.map((c) => c.category))
                      ).map((categoryId) => ({
                        id: categoryId,
                        name: getCategoryName(categoryId),
                        count: courses.filter((c) => c.category === categoryId)
                          .length,
                      })),
                    ]
                      .slice(0, showAllCategories ? undefined : 6)
                      .map((filter, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleFilterChange("category", filter.id)
                          }
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                            selectedCategory === filter.id
                              ? "bg-brand-primary text-white shadow-lg"
                              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span className="font-medium">{filter.name}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              selectedCategory === filter.id
                                ? "bg-white/20 text-white"
                                : "bg-brand-secondary/10 text-brand-secondary"
                            }`}
                          >
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    {courses.length > 6 && (
                      <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="w-full text-sm text-brand-secondary hover:text-brand-primary transition-colors duration-300 mt-2"
                      >
                        {showAllCategories ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No courses found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to find more courses.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getPaginatedCourses().map((course, index) => {
                        const statusInfo = getCourseStatus(course);
                        const enrollmentPercentage = Math.round(
                          (course.enrolled / course.capacity) * 100
                        );

                        return (
                          <div
                            key={course._id || index}
                            className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                          >
                            {/* Image Section */}
                            <div className="relative overflow-hidden">
                              <FallbackImage
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                  {getCategoryName(course.category)}
                                </span>
                                {course.isFree && (
                                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
                                  {course.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                  {course.description
                                    ?.replace(/<[^>]*>/g, "")
                                    .substring(0, 100)}
                                  ...
                                </p>
                              </div>

                              {/* Course Stats */}
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                                    <Users className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <span className="font-medium">
                                    {course.enrolled}/{course.capacity} enrolled
                                  </span>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                                    <Clock className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <span className="font-medium">
                                    {course.duration}
                                  </span>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                  <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                                    <MapPin className="h-3 w-3 text-green-600" />
                                  </div>
                                  <span className="font-medium">
                                    {course.location === "Offline" &&
                                    course.offlineLocation
                                      ? course.offlineLocation
                                      : course.location}
                                  </span>
                                </div>
                              </div>

                              {/* Enrollment Progress */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Enrollment</span>
                                  <span>{enrollmentPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${enrollmentPercentage}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>

                              {/* Price and CTA */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center text-xl font-black text-brand-primary">
                                  {course.isFree ? (
                                    <>
                                      <span className="text-green-600 font-bold">
                                        Free
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span> {course.fee} BDT</span>
                                    </>
                                  )}
                                </div>

                                <Link
                                  href={`/course/${course._id}`}
                                  className="group/btn inline-flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                  <span>View Details</span>
                                </Link>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} border`}
                              >
                                {statusInfo.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        className="mt-8"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
