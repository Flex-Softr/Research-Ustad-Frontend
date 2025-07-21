import { Button } from "@/components/ui/button";
import Link from "next/link";

const CourseNotFound = () => {
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
};

export default CourseNotFound;
