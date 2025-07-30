"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  DollarSign,
  MapPin,
  User,
  Filter,
  ExternalLink,
  Users,
  Calendar,
  BookOpen,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/shared/Pagination";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getPaginatedCourses,
  getCourseCategories,
  getCourseLevels,
  type Course,
  type CoursesFilter,
} from "@/services/courses";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/services/blogs/blogsSlice";

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(6);
  const [expandedStatus, setExpandedStatus] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);



  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);


  console.log("blogsssssssssssssssssssss", blogs)






  // Fetch paginated courses from server
  const fetchCourses = async (
    page: number,
    status: string = "all",
    category: string = "all"
  ) => {
    setLoading(true);
    try {
      const filterParams: CoursesFilter = {
        page,
        limit: itemsPerPage,
        status:
          status === "all"
            ? "all"
            : (status as "upcoming" | "ongoing" | "completed"),
        category: category === "all" ? undefined : category,
      };

      const response = await getPaginatedCourses(filterParams);

      setCourses(response.courses);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
      setCurrentPage(response.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    if (type === "status") {
      setSelectedStatus(value);
    } else if (type === "category") {
      setSelectedCategory(value);
    }
    setCurrentPage(1);
    fetchCourses(
      1,
      type === "status" ? value : selectedStatus,
      type === "category" ? value : selectedCategory
    );
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchCourses(page, selectedStatus, selectedCategory);
  };

  // Get course status info
  const getCourseStatus = (course: Course) => {
    const now = new Date();
    const startDate = new Date(course.startDate);

    if (startDate > now) {
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
    } else if (now) {
      return {
        status: "ongoing",
        text: "In Progress",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
      };
    } else {
      return {
        status: "completed",
        text: "Completed",
        color: "text-gray-500",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-200",
      };
    }
  };

  // Load initial data
  useEffect(() => {
    fetchCourses(currentPage, selectedStatus, selectedCategory);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Courses",
            current: true,
          },
        ]}
        className="py-8"
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
                      { id: "upcoming", name: "Upcoming", count: 0 },
                      { id: "ongoing", name: "Ongoing", count: 0 },
                      { id: "completed", name: "Completed", count: 0 },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterChange("status", filter.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                          selectedStatus === filter.id
                            ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
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
                      { id: "Technology", name: "Technology", count: 0 },
                      { id: "Education", name: "Education", count: 0 },
                      { id: "Science", name: "Science", count: 0 },
                      { id: "Business", name: "Business", count: 0 },
                      { id: "Healthcare", name: "Healthcare", count: 0 },
                      { id: "Finance", name: "Finance", count: 0 },
                      { id: "Marketing", name: "Marketing", count: 0 },
                      { id: "Design", name: "Design", count: 0 },
                      { id: "Engineering", name: "Engineering", count: 0 },
                      { id: "Arts", name: "Arts", count: 0 },
                      { id: "Sports", name: "Sports", count: 0 },
                    ]
                      .slice(0, showAllCategories ? undefined : 6)
                      .map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() =>
                            handleFilterChange("category", filter.id)
                          }
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                            selectedCategory === filter.id
                              ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
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

                    {/* Load More Button */}
                    {!showAllCategories && (
                      <button
                        onClick={() => setShowAllCategories(true)}
                        className="w-full p-3 text-brand-secondary hover:text-brand-primary font-medium transition-colors duration-300 border border-dashed border-brand-secondary/30 rounded-xl hover:border-brand-secondary/50"
                      >
                        Load More Categories
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Courses</span>
                    <span className="font-semibold text-gray-900">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Categories</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Page</span>
                    <span className="font-semibold text-gray-900">
                      {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedStatus === "all" && selectedCategory === "all"
                    ? "All Courses"
                    : `${selectedStatus !== "all" ? selectedStatus : ""} ${
                        selectedCategory !== "all" ? selectedCategory : ""
                      } Courses`.trim()}
                </h2>
                <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-semibold">
                  {totalItems} courses
                </span>
              </div>

              {(selectedStatus !== "all" || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSelectedStatus("all");
                    setSelectedCategory("all");
                    fetchCourses(1, "all", "all");
                  }}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {courses.map((course) => {
                    const statusInfo = getCourseStatus(course);
                    const enrollmentPercentage = Math.round(
                      (course.enrolled / course.capacity) * 100
                    );

                    return (
                      <Card
                        key={course.id}
                        className="group bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                      >
                        {/* Course Image */}
                        <div className="relative overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={course.imageUrl}
                              alt={course.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} border`}
                            >
                              {statusInfo.status === "upcoming"
                                ? "Upcoming"
                                : statusInfo.status === "ongoing"
                                ? "Ongoing"
                                : "Completed"}
                            </span>
                          </div>

                          {/* Level Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-brand-secondary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                              {course.level}
                            </span>
                          </div>

                          {/* Enrollment Progress */}
                          {statusInfo.status === "upcoming" && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                                <div className="flex items-center justify-between text-white text-xs mb-1">
                                  <span>Enrollment</span>
                                  <span>
                                    {course.enrolled}/{course.capacity}
                                  </span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                  <div
                                    className="bg-brand-secondary h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${enrollmentPercentage}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-gray-600 line-clamp-3">
                            {course.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Course Details */}
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-brand-secondary" />
                              <span>{course.duration}</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-brand-secondary" />
                              <span className="line-clamp-1">
                                {course.location}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2 text-brand-secondary" />
                              <span>{course.enrolled} enrolled</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <Award className="h-4 w-4 mr-2 text-brand-secondary" />
                              <span className={statusInfo.color}>
                                {statusInfo.text}
                              </span>
                            </div>
                          </div>

                          {/* Price and Action */}
                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center text-lg font-bold text-brand-secondary">
                              <DollarSign className="h-5 w-5 mr-1" />
                              <span>{course.fee}</span>
                            </div>
                            <Button
                              asChild
                              className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
                            >
                              <Link href={`/course/${course.id}`}>
                                {statusInfo.status === "upcoming"
                                  ? "Enroll Now"
                                  : "View Details"}
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  className="mt-12"
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filter selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
