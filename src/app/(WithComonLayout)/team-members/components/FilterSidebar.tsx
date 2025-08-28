import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Filter, GraduationCap, UserCheck, Users } from "lucide-react";
import { TeamMember } from "./TeamMemberCard";
import { DESIGNATION_OPTIONS } from "@/constants/designations";

interface FilterSidebarProps {
  members: TeamMember[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterSidebar = ({
  members,
  selectedFilter,
  onFilterChange,
}: FilterSidebarProps) => {
  // Get available designations that have members
  const getAvailableDesignations = () => {
    return DESIGNATION_OPTIONS.filter((designation) => {
      return members.some((member) => member.designation === designation);
    });
  };

  const availableDesignations = getAvailableDesignations();

  // Helper function to get appropriate icon based on designation
  const getIconForDesignation = (designation: string) => {
    const lowerDesignation = designation.toLowerCase();
    if (
      lowerDesignation.includes("advisor") ||
      lowerDesignation.includes("mentor")
    ) {
      return Award;
    } else if (
      lowerDesignation.includes("lead") ||
      lowerDesignation.includes("head")
    ) {
      return UserCheck;
    } else if (
      lowerDesignation.includes("research") ||
      lowerDesignation.includes("associate")
    ) {
      return GraduationCap;
    } else {
      return Users;
    }
  };

  // Helper function to format designation label
  const formatDesignationLabel = (designation: string) => {
    switch (designation) {
      case "Advisor":
        return "Advisor Panel";
      case "Mentor":
        return "Mentor Panel";
      case "Team Lead":
        return "Team Lead";
      case "Executive Board":
        return "Executive Board";
      default:
        return designation;
    }
  };

  // Filter options
  const filterOptions = [
    {
      id: "all",
      label: "All Members",
      icon: Users,
      count: members.length,
    },
    ...availableDesignations.map((designation) => ({
      id: designation,
      label: formatDesignationLabel(designation),
      icon: getIconForDesignation(designation),
      count: members.filter((m) => m.designation === designation).length,
    })),
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-brand-secondary" />
          Categories
        </h3>
        <div className="space-y-3">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 cursor-pointer ${
                selectedFilter === option.id
                  ? "bg-brand-primary text-white shadow-lg"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <option.icon className="h-4 w-4 mr-3" />
                <span className="font-medium">{option.label}</span>
              </div>
              <Badge
                variant={selectedFilter === option.id ? "secondary" : "outline"}
                className={`ml-2 ${
                  selectedFilter === option.id
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20"
                }`}
              >
                {option.count}
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
