import { CheckCircle, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FallbackImage from "@/components/shared/FallbackImage";
import CountdownTimer from "../../shared/CountdownTimer";

const CourseSidebar = ({ course }) => {
  const enrollmentPercentage = Math.round(
    (course.enrolled / course.capacity) * 100
  );

  return (
    <div className="sticky top-8 space-y-6">
      {/* Countdown Timer Card */}
      {course.status === "upcoming" && (
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-center text-gray-900">
              Course Countdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CountdownTimer
              startDate={course.startDate}
              endDate={course.endDate}
              itemId={course._id}
              itemType="course"
              className="text-center"
            />
          </CardContent>
        </Card>
      )}

      {/* Course Card */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="relative h-48">
            <FallbackImage
              src={course.imageUrl}
              alt={course.title}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-baseline gap-3 mb-4">
            {course.isFree ? (
              <span className="text-3xl font-bold text-green-600">Free</span>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {course.fee} BDT
              </span>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Enrollment</span>
              {/* <span>{enrollmentPercentage}%</span> */}
              <span className="font-medium">
                {course.enrolled.toLocaleString()}/
                {course.capacity.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${enrollmentPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {course.capacity - course.enrolled} spots remaining
            </p>
          </div>

          {course.status === "upcoming" ? (
            <Button
              className="w-full bg-brand-primary hover:shadow-lg transition-all duration-300 mb-4"
              asChild
            >
              <a
                href={course?.enrollLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll Now
              </a>
            </Button>
          ) : (
            <Button
              className="w-full bg-brand-primary hover:shadow-lg transition-all duration-300 mb-4"
              disabled
            >
              Enrollment Closed
            </Button>
          )}

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
  );
};

export default CourseSidebar;
