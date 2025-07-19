import { Button } from "@/components/ui/button";
import {
  Clock,
  DollarSign,
  MapPin,
  User,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/core";

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
    id: "2",
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
    id: "3",
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

const CoursesSection = () => {
  return (
    <section className=" bg-gradient-to-br from-green-50 via-white to-blue-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center ">
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
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {course.category}
                  </span>
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
                    {course.syllabus}
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">
                      Instructor: {course.instruction}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="font-medium">
                      Starts: {new Date(course.startDate).toLocaleDateString()}
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
                    <DollarSign className="h-6 w-6 mr-1" />
                    <span>{course.fee}</span>
                  </div>

                  <Link
                    href={`/course/${course.id}`}
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
      </Container>
    </section>
  );
};

export default CoursesSection;
