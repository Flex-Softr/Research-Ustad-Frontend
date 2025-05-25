import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, MapPin, User } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Course 1",
    startDate: "2025-03-15T04:40:00Z",
    location: "Online",
    instruction: "John Doe",
    syllabus: "JavaScript Basics",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    fee: 100,
  },
  {
    id: "1",
    title: "Course 1",
    startDate: "2025-03-15T04:40:00Z",
    location: "Online",
    instruction: "John Doe",
    syllabus: "JavaScript Basics",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    fee: 100,
  },
  {
    id: "1",
    title: "Course 1",
    startDate: "2025-03-15T04:40:00Z",
    location: "Online",
    instruction: "John Doe",
    syllabus: "JavaScript Basics",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    fee: 100,
  },
];

const CoursePage = () => {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your skills with our expert-led courses designed for
            students and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {course.title}
                </CardTitle>
                <CardDescription>{course.syllabus}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Instructor: {course.instruction}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    Starts: {new Date(course.startDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{course.location}</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-lg font-bold text-blue-600">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span>{course.fee}</span>
                  </div>

                  <Button asChild>
                    <Link href={`/course/${course.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
