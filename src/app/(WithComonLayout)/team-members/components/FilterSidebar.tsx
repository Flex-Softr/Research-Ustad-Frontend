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
  // Filter options
  const filterOptions = [
    { id: "all", label: "All Members", icon: Users, count: members.length },
    {
      id: "Advisor",
      label: "Advisors",
      icon: Award,
      count: members.filter((m) => m.designation === "Advisor").length,
    },
    {
      id: "Lead",
      label: "Lead Members",
      icon: UserCheck,
      count: members.filter((m) => m.designation === "Lead").length,
    },
    {
      id: "Research_Associate",
      label: "Research Associates",
      icon: GraduationCap,
      count: members.filter((m) => m.designation === "Research_Associate")
        .length,
    },
    {
      id: "Mentor_Panel",
      label: "Mentor Panel",
      icon: Users,
      count: members.filter((m) => m.designation === "Mentor_Panel").length,
    },
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
