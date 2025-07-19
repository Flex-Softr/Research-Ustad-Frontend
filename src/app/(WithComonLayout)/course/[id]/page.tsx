"use client";

import { useState, useEffect } from "react";
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
  Users,
  Star,
  CheckCircle,
  Lock,
  Share2,
  Heart,
  Award,
  Target,
  BarChart3,
  Globe,
  Video,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getCourseById, type Course } from "@/services/courses";

const CourseSinglePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<
    Record<number, boolean>
  >({});
  const [activeTab, setActiveTab] = useState("overview");

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Course not found
          </h1>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/course">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const enrollmentPercentage = Math.round(
    (course.enrolled / course.capacity) * 100
  );
  const discountPercentage = Math.round(
    ((course.originalFee - course.fee) / course.originalFee) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Courses",
            href: "/course",
          },
          {
            label: course.title,
            current: false,
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-brand-secondary mr-1" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-brand-secondary mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-brand-secondary mr-1" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="relative h-80">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "curriculum", label: "Curriculum", icon: Video },
                    { id: "instructor", label: "Instructor", icon: User },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                          activeTab === tab.id
                            ? "border-brand-secondary text-brand-secondary"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What you'll learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Course Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.courseFeatures.map((feature, index) => {
                          let IconComponent = Video;
                          if (feature.icon === "FileText")
                            IconComponent = FileText;
                          else if (feature.icon === "Award")
                            IconComponent = Award;
                          else if (feature.icon === "Clock")
                            IconComponent = Clock;
                          else if (feature.icon === "Users")
                            IconComponent = Users;
                          else if (feature.icon === "Star")
                            IconComponent = Star;
                          else if (feature.icon === "CheckCircle")
                            IconComponent = CheckCircle;
                          else if (feature.icon === "Globe")
                            IconComponent = Globe;
                          else if (feature.icon === "MapPin")
                            IconComponent = MapPin;
                          else if (feature.icon === "DollarSign")
                            IconComponent = DollarSign;
                          else if (feature.icon === "BookOpen")
                            IconComponent = BookOpen;
                          else if (feature.icon === "Target")
                            IconComponent = Target;
                          else if (feature.icon === "BarChart3")
                            IconComponent = BarChart3;
                          else if (feature.icon === "Lock")
                            IconComponent = Lock;
                          else if (feature.icon === "Share2")
                            IconComponent = Share2;
                          else if (feature.icon === "Heart")
                            IconComponent = Heart;
                          else if (feature.icon === "ExternalLink")
                            IconComponent = ExternalLink;
                          else if (feature.icon === "ChevronDown")
                            IconComponent = ChevronDown;
                          else if (feature.icon === "ChevronUp")
                            IconComponent = ChevronUp;

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
                            >
                              <IconComponent className="w-5 h-5 text-brand-secondary" />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {feature.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === "curriculum" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        Course Curriculum
                      </h3>
                      <div className="text-sm text-gray-600">
                        {course.duration} •{" "}
                        {course.modules.reduce(
                          (total, module) => total + module.lessons.length,
                          0
                        )}{" "}
                        lessons
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8  ">
                      {course.curriculum ? (
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: course.curriculum,
                          }}
                        />
                      ) : (
                        <div className="prose prose-lg max-w-none">
                          <h2>Course Overview</h2>
                          <p>
                            This comprehensive course is designed to take you
                            from the fundamentals to advanced concepts in{" "}
                            {course.category.toLowerCase()}.
                          </p>

                          <h3>What You'll Learn</h3>
                          <ul>
                            {course.whatYouWillLearn.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>

                          <h3>Course Structure</h3>
                          <p>
                            The course is organized into {course.modules.length}{" "}
                            main modules, each focusing on specific aspects of
                            the subject matter:
                          </p>

                          {course.modules.map((module, index) => (
                            <div
                              key={index}
                              className="mb-6 p-4 bg-gray-50 rounded-lg"
                            >
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Module {index + 1}: {module.title}
                              </h4>
                              <p className="text-gray-600 mb-3">
                                {module.description}
                              </p>
                              <ul className="space-y-1">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <li
                                    key={lessonIndex}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                                    {lesson.title}
                                    <span className="text-gray-500">
                                      ({lesson.duration})
                                    </span>
                                    {lesson.free && (
                                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                        Free
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <h3>Learning Outcomes</h3>
                          <p>By the end of this course, you will have:</p>
                          <ul>
                            {course.learningOutcomes.map((outcome, index) => (
                              <li key={index}>{outcome}</li>
                            ))}
                          </ul>

                          <h3>Assessment and Certification</h3>
                          <p>{course.assessmentInfo}</p>

                          <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg p-4 mt-6">
                            <h4 className="font-semibold text-brand-secondary mb-2">
                              Course Features
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>
                                ✓ HD video lectures with expert instructors
                              </li>
                              <li>✓ Downloadable resources and materials</li>
                              <li>✓ Interactive quizzes and assessments</li>
                              <li>✓ Hands-on projects and exercises</li>
                              <li>✓ Certificate of completion</li>
                              <li>✓ Lifetime access to course materials</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === "instructor" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-2xl">
                      <div className="relative">
                        <Image
                          src={course.instructor.imageUrl}
                          alt={course.instructor.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {course.instructor.name}
                        </h3>
                        <p className="text-brand-secondary font-medium mb-2">
                          {course.instructor.specialization}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>
                              {course.instructor.rating} Instructor Rating
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-brand-secondary mr-1" />
                            <span>
                              {course.instructor.experience} Experience
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-brand-secondary mr-1" />
                            <span>
                              {course.instructor.students.toLocaleString()}{" "}
                              Students
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {course.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Card */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="relative h-48">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${course.fee}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${course.originalFee}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Enrollment</span>
                      <span className="font-medium">
                        {course.enrolled.toLocaleString()}/
                        {course.capacity.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-brand-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollmentPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      {course.capacity - course.enrolled} spots remaining
                    </p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300 mb-4">
                    Enroll Now
                  </Button>

                  <div className="text-center text-sm text-gray-600 mb-4">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Downloadable resources</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Course */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Share this course
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSinglePage;
