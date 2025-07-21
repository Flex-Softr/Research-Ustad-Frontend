"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface FormProgressIndicatorProps {
  formData: {
    title: string;
    description: string;
    category: string;
    fee: string;
    thumbnail: File | null;
    tags: string[];
    whatYouWillLearn: string[];
    requirements: string[];
    instructors: any[];
  };
}

const sections = [
  {
    id: "basic",
    title: "Basic Information",
    fields: ["title", "description", "category", "fee"],
    icon: CheckCircle,
  },
  {
    id: "media",
    title: "Media & Visuals",
    fields: ["thumbnail"],
    icon: CheckCircle,
  },
  {
    id: "content",
    title: "Course Content",
    fields: ["tags", "whatYouWillLearn", "requirements"],
    icon: CheckCircle,
  },
  {
    id: "instructors",
    title: "Instructors",
    fields: ["instructors"],
    icon: CheckCircle,
  },
];

export function FormProgressIndicator({
  formData,
}: FormProgressIndicatorProps) {
  const calculateSectionProgress = (section: (typeof sections)[0]) => {
    const totalFields = section.fields.length;
    let completedFields = 0;

    section.fields.forEach((field) => {
      switch (field) {
        case "title":
          if (formData.title.trim().length >= 5) completedFields++;
          break;
        case "description":
          if (formData.description.trim().length >= 20) completedFields++;
          break;
        case "category":
          if (formData.category.trim()) completedFields++;
          break;
        case "fee":
          if (formData.fee.trim() && !isNaN(Number(formData.fee)))
            completedFields++;
          break;
        case "thumbnail":
          if (formData.thumbnail) completedFields++;
          break;
        case "tags":
          if (formData.tags.length > 0) completedFields++;
          break;
        case "whatYouWillLearn":
          if (formData.whatYouWillLearn.length > 0) completedFields++;
          break;
        case "requirements":
          if (formData.requirements.length > 0) completedFields++;
          break;
        case "instructors":
          if (formData.instructors.length > 0) completedFields++;
          break;
      }
    });

    return {
      completed: completedFields,
      total: totalFields,
      percentage: totalFields > 0 ? (completedFields / totalFields) * 100 : 0,
    };
  };

  const overallProgress =
    sections.reduce((acc, section) => {
      const progress = calculateSectionProgress(section);
      return acc + progress.percentage;
    }, 0) / sections.length;

  const getSectionStatus = (section: (typeof sections)[0]) => {
    const progress = calculateSectionProgress(section);

    if (progress.percentage === 100) {
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    } else if (progress.percentage > 0) {
      return {
        icon: AlertCircle,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    } else {
      return { icon: Circle, color: "text-gray-400", bgColor: "bg-gray-100" };
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Form Progress</h3>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(overallProgress)}% Complete
            </span>
          </div>

          <Progress value={overallProgress} className="h-2" />

          <div className="space-y-3">
            {sections.map((section) => {
              const progress = calculateSectionProgress(section);
              const status = getSectionStatus(section);
              const Icon = status.icon;

              return (
                <div key={section.id} className="flex items-center space-x-3">
                  <div className={`p-1 rounded-full ${status.bgColor}`}>
                    <Icon className={`w-4 h-4 ${status.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {section.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {progress.completed}/{progress.total} fields completed
                    </p>
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    {Math.round(progress.percentage)}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Required fields marked with *</span>
              <span>{Math.round(overallProgress)}% ready to submit</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
