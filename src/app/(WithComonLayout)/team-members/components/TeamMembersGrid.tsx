import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import TeamMemberCard, { TeamMember } from "./TeamMemberCard";

interface TeamMembersGridProps {
  members: TeamMember[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  selectedFilter: string;
}

const TeamMembersGrid = ({
  members,
  currentPage,
  itemsPerPage,
  onPageChange,
  selectedFilter,
}: TeamMembersGridProps) => {
  // Pagination
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = members.slice(startIndex, endIndex);

  // Filter options for display
  const filterOptions = [
    { id: "all", label: "All Members" },
    { id: "Advisor", label: "Advisors" },
    { id: "Lead", label: "Lead Members" },
    { id: "Research_Associate", label: "Research Associates" },
    { id: "Mentor_Panel", label: "Mentor Panel" },
  ];

  console.log("TeamMembersGrid - Members data:", members);
  console.log("TeamMembersGrid - Paginated members:", paginatedMembers);
  return (
    <div className="lg:col-span-3">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900">
            {selectedFilter === "all"
              ? "All Members"
              : filterOptions.find((f) => f.id === selectedFilter)?.label}
          </h3>
          <Badge
            variant="outline"
            className="bg-brand-secondary/10 text-brand-secondary"
          >
            {members.length} members
          </Badge>
        </div>
      </div>

      {/* Members Grid */}
      {paginatedMembers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={members.length}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            className="mt-12"
          />
        </>
      ) : (
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

export default TeamMembersGrid;
