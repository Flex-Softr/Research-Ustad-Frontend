"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  FilterSidebar,
  SearchBar,
  TeamMembersGrid,
  TeamMembersSections,
  TeamMember,
} from "./components";
import { GetAllResearchAssociate } from "@/services/reserarchers";

const TeamMembersPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 3 members per row * 3 rows
  const [viewMode, setViewMode] = useState<"sections" | "filtered">("sections");

  // Load team members data from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await GetAllResearchAssociate();
        // console.log("API Response:", response);

        if (response?.success && response?.data) {
          // Transform API data to match TeamMember interface
          const transformedMembers = response.data.map((member: any) => ({
            id: member._id,
            user: member._id,
            fullName: member.fullName,
            email: member.email,
            contactNo: member.contactNo,
            role: member.role,
            designation: member.designation, // Map role to designation for compatibility
            profileImg: member.image,
            shortBio: member.shortBio,
            citations: member.citations,
            research: member.research || [],
            isDeleted: member.isDeleted,
            current: member.current,
            education: member.education,
            socialLinks: member.socialLinks,
            expertise: member.expertise || [],
            awards: member.awards || [],
            conferences: member.conferences || [],
            publications: member.publications || [], // This will be populated from the API
          }));

          // console.log("Available roles:", [
          //   ...new Set(transformedMembers.map((m) => m.role)),
          // ]);
          setMembers(transformedMembers);
        } else if (response?.data) {
          // If no success flag but data exists
          const transformedMembers = response.data.map((member: any) => ({
            id: member._id,
            user: member._id,
            fullName: member.fullName,
            email: member.email,
            contactNo: member.contactNo,
            role: member.role,
            designation: member.designation, // Map role to designation for compatibility
            profileImg: member.image,
            shortBio: member.shortBio,
            citations: member.citations,
            research: member.research || [],
            isDeleted: member.isDeleted,
            current: member.current,
            education: member.education,
            socialLinks: member.socialLinks,
            expertise: member.expertise || [],
            awards: member.awards || [],
            conferences: member.conferences || [],
            publications: member.publications || [],
          }));

          // console.log("Available roles:", [
          //   ...new Set(transformedMembers.map((m) => m.designation)),
          // ]);
          setMembers(transformedMembers);
        } else {
          console.log("No members data available from API");
          setMembers([]);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter and search members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.designation || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.current?.institution
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.education?.field
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.expertise?.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      member.shortBio?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || member.designation === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
    
    // If a specific filter is selected, switch to filtered view
    if (filter !== "all") {
      setViewMode("filtered");
    } else {
      setViewMode("sections");
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" variant="border" fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Team Members",
            current: false,
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar
              members={members}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Team Members Content */}
          <div className="lg:col-span-3">
            {viewMode === "sections" ? (
              <TeamMembersSections
                members={members}
                searchQuery={searchQuery}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <div className="space-y-6">
                {/* Back to Sections Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedFilter === "all" ? "All Members" : selectedFilter}
                    </h2>
                    <p className="text-gray-600">
                      {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFilter("all");
                      setViewMode("sections");
                    }}
                    className="flex items-center gap-2"
                  >
                    ← Back to Sections
                  </Button>
                </div>
                
                <TeamMembersGrid
                  members={filteredMembers}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  selectedFilter={selectedFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersPage;
