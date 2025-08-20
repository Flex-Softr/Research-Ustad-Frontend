import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Filter, GraduationCap, UserCheck, Users } from "lucide-react";
import { TeamMember } from "./TeamMemberCard";

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
  // Get unique designations from members data
  const getUniqueDesignations = () => {
    const designations = new Set<string>();
    members.forEach((member) => {
      if (member.designation && member.designation.trim()) {
        designations.add(member.designation);
      }
    });
    return Array.from(designations).filter(designation => 
      designation && 
      designation !== "user" && 
      designation !== "admin" && 
      designation !== "superAdmin"
    );
  };

  const uniqueDesignations = getUniqueDesignations();

  // Helper function to get appropriate icon based on designation
  const getIconForDesignation = (designation: string) => {
    const lowerDesignation = designation.toLowerCase();
    if (lowerDesignation.includes("advisor") || lowerDesignation.includes("mentor")) {
      return Award;
    } else if (lowerDesignation.includes("lead") || lowerDesignation.includes("head")) {
      return UserCheck;
    } else if (lowerDesignation.includes("research") || lowerDesignation.includes("associate")) {
      return GraduationCap;
    } else {
      return Users;
    }
  };

  // Helper function to format designation label
  const formatDesignationLabel = (designation: string) => {
    return designation
      .replace(/_/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s+/g, " ")
      .trim();
  };

  // Filter options
  const filterOptions = [
    { 
      id: "all", 
      label: "All Members", 
      icon: Users, 
      count: members.length 
    },
    ...uniqueDesignations.map((designation) => ({
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
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 ${
                selectedFilter === option.id
                  ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <option.icon className="h-4 w-4 mr-3" />
                <span className="font-medium">{option.label}</span>
              </div>
              <Badge
                variant={selectedFilter === option.id ? "secondary" : "outline"}
                className="ml-2"
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
