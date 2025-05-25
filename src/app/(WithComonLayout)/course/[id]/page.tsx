import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  User,
} from "lucide-react";
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
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    fee: 100,
    description:
      "Master the fundamentals of JavaScript programming with hands-on projects and real-world applications. This comprehensive course covers variables, functions, DOM manipulation, and modern ES6+ features.",
    duration: "8 weeks",
    level: "Beginner",
    modules: [
      "Introduction to JavaScript",
      "Variables and Data Types",
      "Functions and Scope",
      "DOM Manipulation",
      "Event Handling",
      "Asynchronous JavaScript",
      "ES6+ Features",
      "Final Project",
    ],
  },
];
const CourseSinglePage = async ({ params }) => {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg mb-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8">{course.description}</p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Course Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-lg font-bold text-blue-600">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>${course.fee}</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Instructor:</strong> {course.instruction}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Duration:</strong> {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Location:</strong> {course.location}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Level:</strong> {course.level}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Starts:</strong>{" "}
                      {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseSinglePage;
