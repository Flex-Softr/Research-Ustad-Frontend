import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight } from "lucide-react";
import TeamMemberCard, { TeamMember } from "./TeamMemberCard";
import { DESIGNATION_OPTIONS } from "@/constants/designations";

interface TeamMembersSectionsProps {
  members: TeamMember[];
  searchQuery: string;
  onFilterChange: (filter: string) => void;
}

const TeamMembersSections = ({ 
  members, 
  searchQuery, 
  onFilterChange 
}: TeamMembersSectionsProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Filter members based on search query
  const filteredMembers = members.filter((member) => {
    if (!searchQuery) return true;
    
    return (
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.designation || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.current?.institution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.education?.field?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise?.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.shortBio?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Group members by designation
  const groupedMembers = DESIGNATION_OPTIONS.reduce((acc, designation) => {
    const sectionMembers = filteredMembers.filter(
      (member) => member.designation === designation
    );
    acc[designation] = sectionMembers;
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Handle section expansion
  const toggleSection = (designation: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(designation)) {
      newExpanded.delete(designation);
    } else {
      newExpanded.add(designation);
    }
    setExpandedSections(newExpanded);
  };

  // Handle "See All" button click
  const handleSeeAll = (designation: string) => {
    onFilterChange(designation);
  };

  // Get section display name
  const getSectionDisplayName = (designation: string) => {
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



  return (
    <div className="space-y-12">
      {DESIGNATION_OPTIONS.map((designation) => {
        const sectionMembers = groupedMembers[designation] || [];
        const isExpanded = expandedSections.has(designation);
        const displayCount = isExpanded ? sectionMembers.length : Math.min(6, sectionMembers.length);
        const hasMoreMembers = sectionMembers.length > 6;

        if (sectionMembers.length === 0) return null;

        return (
          <section key={designation} className="space-y-3">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {getSectionDisplayName(designation)}
                </h2>
                <p className="text-gray-600">
                  {sectionMembers.length} member{sectionMembers.length !== 1 ? "s" : ""}
                </p>
              </div>
              
              {hasMoreMembers && !isExpanded && (
                <Button
                  variant="outline"
                  onClick={() => handleSeeAll(designation)}
                  className="flex items-center gap-2 hover:bg-brand-primary hover:text-white transition-colors"
                >
                  See all {getSectionDisplayName(designation).toLowerCase()}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionMembers.slice(0, displayCount).map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {/* Show More/Less Button */}
            {hasMoreMembers && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => toggleSection(designation)}
                  className="flex items-center gap-2"
                >
                  {isExpanded ? (
                    <>
                      Show Less
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </>
                  ) : (
                    <>
                      Show More ({sectionMembers.length - 6} more)
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </section>
        );
      })}

      {/* No Results */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No members found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filter selection.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamMembersSections;
