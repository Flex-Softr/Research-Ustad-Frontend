import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/services/courses";
import CourseTabs from "./CourseTabs";
import OverviewTab from "./tabs/OverviewTab";
import CurriculumTab from "./tabs/CurriculumTab";
import InstructorTab from "./tabs/InstructorTab";

interface CourseContentProps {
  course: Course;
}

const CourseContent = ({ course }: CourseContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab course={course} />;
      case "curriculum":
        return <CurriculumTab course={course} />;
      case "instructor":
        return <InstructorTab course={course} />;
      default:
        return <OverviewTab course={course} />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
      <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-8">{renderTabContent()}</div>
    </Card>
  );
};

export default CourseContent;
