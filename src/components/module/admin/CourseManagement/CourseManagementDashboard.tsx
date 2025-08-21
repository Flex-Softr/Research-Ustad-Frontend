"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Star,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCourses } from "@/services/courses/coursesSlice";
import { Course } from "@/type";
import AllCoursesTable from "./AllCourses/AllCoursesTable";
import CategoriesPage from "./Categories/CategoriesPage";

const CourseManagementDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading, error } = useSelector(
    (state: RootState) => state.courses
  );

  // Load courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEditCourse = (course: Course) => {
    router.push(`/admin/dashboard/managecourse/add-course?edit=${course._id}`);
  };

  const handleViewCourse = (course: Course) => {
    router.push(`/course/${course._id}`);
  };

  const handleCreateCourse = () => {
    router.push("/admin/dashboard/managecourse/add-course");
  };

  // Calculate dashboard stats
  const totalCourses = courses.length;
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolled, 0);
  const averageRating = courses.length > 0 
    ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length 
    : 0;
  const totalRevenue = courses.reduce((sum, course) => {
    if (course.isFree) {
      return sum; // Free courses don't contribute to revenue
    }
    return sum + (course.fee * course.enrolled);
  }, 0);
  
  const upcomingCourses = courses.filter(course => {
    const startDate = new Date(course.startDate);
    const now = new Date();
    return startDate > now;
  }).length;

  const ongoingCourses = courses.filter(course => {
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate || "2100-01-01");
    const now = new Date();
    return startDate <= now && endDate > now;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage all courses and track performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateCourse} className="bg-brand-primary to-brand-secondary hover:shadow-lg cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Courses</p>
                <p className="text-2xl font-bold text-blue-900">{totalCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-green-900">{totalEnrollments.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-900">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-900">${totalRevenue.toLocaleString()} BDT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-900">{upcomingCourses}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Ongoing</p>
                <p className="text-2xl font-bold text-green-900">{ongoingCourses}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All Courses
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                All Courses ({totalCourses})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AllCoursesTable
                onEditCourse={handleEditCourse}
                onViewCourse={handleViewCourse}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <CategoriesPage />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Course Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics Coming Soon
                </h3>
                <p className="text-gray-500">
                  Detailed course analytics and insights will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* TODO: Add Edit/View Modals here */}
      {/* These will be implemented as separate components */}
    </div>
  );
};

export default CourseManagementDashboard; 