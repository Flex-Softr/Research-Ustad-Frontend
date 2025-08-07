"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  FilterSidebar,
  SearchBar,
  TeamMembersGrid,
  TeamMember,
} from "./components";

const TeamMembersPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 3 members per row * 3 rows

  // Load team members data from JSON file
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/json/team-members.json");
        const data = await response.json();
        if (data?.members) {
          setMembers(data.members);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
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
      member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        className="py-4"
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

          {/* Team Members Grid */}
          <TeamMembersGrid
            members={filteredMembers}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamMembersPage;
