"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Edit, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import CourseForm from "./CourseForm";

const mockCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Web Development",
    students: 45,
    fee: 100,
    startDate: "2025-03-15",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    instruction: "John Doe",
    syllabus: "Learn JavaScript from basics to advanced concepts",
    location: "Online",
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    category: "Web Development",
    students: 32,
    fee: 150,
    startDate: "2025-04-01",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    instruction: "Jane Smith",
    syllabus: "Advanced React patterns and best practices",
    location: "New York",
  },
  {
    id: 3,
    title: "Python for Data Science",
    category: "Data Science",
    students: 28,
    fee: 120,
    startDate: "2025-03-20",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    instruction: "Dr. Brown",
    syllabus: "Python programming for data analysis and machine learning",
    location: "Online",
  },
];

const CourseManagement = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleSaveCourse = (courseData) => {
    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? { ...courseData, id: editingCourse.id }
            : course
        )
      );
    } else {
      const newCourse = { ...courseData, id: Date.now(), students: 0 };
      setCourses([...courses, newCourse]);
    }
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <CourseForm
          course={editingCourse}
          onSave={handleSaveCourse}
          onCancel={handleCancelForm}
          isEditing={!!editingCourse}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Course Management
          </h2>
          <p className="text-gray-600">
            Manage your courses and track enrollment
          </p>
        </div>
        <Button
          onClick={handleAddCourse}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge
                className={`absolute top-3 left-3 ${getStatusColor(
                  course.status
                )}`}
              >
                {course.status}
              </Badge>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">
                {course.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{course.category}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span>${course.fee}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditCourse(course)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
