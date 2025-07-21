"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

const CourseManagementPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard/managecourse/all-courses");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner
        size="md"
        variant="border"
        text="Redirecting to course management..."
      />
    </div>
  );
};

export default CourseManagementPage;
