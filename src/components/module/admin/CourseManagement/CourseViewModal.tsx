"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Star,
  DollarSign,
  Clock,
  MapPin,
  Calendar,
  Globe,
  Award,
  BookOpen,
  Edit,
  X,
} from "lucide-react";
import Image from "next/image";
import { Course } from "@/type";
import { calculateCourseStatus } from "@/lib/calculateCourseStatus";

interface CourseViewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (course: Course) => void;
}

const CourseViewModal = ({
  course,
  isOpen,
  onClose,
  onEdit,
}: CourseViewModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector(
    (state: RootState) => state.categories
  );

  // Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  if (!course) return null;

  const enrollmentPercentage = Math.round(
    (course.enrolled / course.capacity) * 100
  );

  const getCourseStatus = () => {
    const status = calculateCourseStatus(course.startDate, course.endDate, course.duration);
    
    switch (status) {
      case "upcoming":
        return {
          status: "Upcoming",
          color: "bg-blue-100 text-blue-800",
          icon: Clock,
        };
      case "ongoing":
        return {
          status: "Ongoing",
          color: "bg-green-100 text-green-800",
          icon: BookOpen,
        };
      default:
        return {
          status: "Upcoming",
          color: "bg-blue-100 text-blue-800",
          icon: Clock,
        };
    }
  };

  const statusInfo = getCourseStatus();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Course Details</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(course)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Header */}
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={statusInfo.color}>
                  <statusInfo.icon className="h-3 w-3 mr-1" />
                  {statusInfo.status}
                </Badge>
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="outline">{getCategoryName(course.category)}</Badge>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Enrolled</p>
                    <p className="font-semibold">
                      {course.enrolled}/{course.capacity}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${enrollmentPercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold">{course.rating}/5</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {course.totalReviews} reviews
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    {course.isFree ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Free
                      </span>
                    ) : (
                      <p className="font-semibold text-green-600">
                        ${course.fee}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="font-medium">{course.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Start Date:</span>
                  <span className="font-medium">
                    {new Date(course.startDate).toLocaleDateString()}
                  </span>
                </div>
                {course.endDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">End Date:</span>
                    <span className="font-medium">
                      {new Date(course.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Language:</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Certificate:</span>
                  <span className="font-medium">
                    {course.certificate ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Lifetime Access:</span>
                  <span className="font-medium">
                    {course.lifetimeAccess ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Instructors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.instructors.map((instructor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={instructor.imageUrl || "/placeholder-instructor.jpg"}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-instructor.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {instructor.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {instructor.specialization}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{instructor.experience} experience</span>
                        <span>⭐ {instructor.rating}</span>
                        <span>{instructor.students} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* What You Will Learn */}
          {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You Will Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Requirements */}
          {course.requirements && course.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseViewModal; 