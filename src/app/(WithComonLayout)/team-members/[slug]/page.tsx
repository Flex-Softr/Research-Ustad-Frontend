"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TeamMember } from "../components";
import {
  MemberHeader,
  ResearchStats,
  Publications,
  OngoingPapers,
  Blogs,
  Expertise,
} from "./components";
import { GetSingleMember } from "@/services/reserarchers";

const SingleMemberPage = () => {
  const params = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("publications");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const response = await GetSingleMember(params.slug as string);
        console.log("Single Member API Response:", response);

        if (response?.success && response?.data) {
          // Transform API data to match TeamMember interface
          const transformedMember = {
            id: response?.data?._id,
            user: response?.data?._id,
            fullName: response?.data?.fullName,
            email: response?.data?.email,
            contactNo: response?.data?.contactNo,
            role: response?.data?.role,
            designation: response?.data?.designation,
            profileImg: response?.data?.image,
            shortBio: response?.data?.shortBio,
            research: response?.data?.research || [],
            isDeleted: response?.data?.isDeleted,
            current: response?.data?.current,
            education: response?.data?.education,
            socialLinks: response?.data?.socialLinks,
            expertise: response?.data?.expertise || [],
            awards: response?.data?.awards || [],
            conferences: response?.data?.conferences || [],
            publications: response?.data?.publications || [], // This will be populated from the API
            blogs: response?.data?.blogs || [], // This will be populated from the API
          };
          
          setMember(transformedMember);
        } else if (response?.data) {
          // If no success flag but data exists
          const transformedMember = {
            id: response?.data?._id,
            user: response?.data?._id,
            fullName: response?.data?.fullName,
            email: response?.data?.email,
            contactNo: response?.data?.contactNo,
            role: response?.data?.role,
            designation: response?.data?.designation,
            profileImg: response?.data?.image,
            shortBio: response?.data?.shortBio,
            research: response?.data?.research || [],
            isDeleted: response?.data?.isDeleted,
            current: response?.data?.current,
            education: response?.data?.education,
            socialLinks: response?.data?.socialLinks,
            expertise: response?.data?.expertise || [],
            awards: response?.data?.awards || [],
            conferences: response?.data?.conferences || [],
            publications: response?.data?.publications || [],
            blogs: response?.data?.blogs || [],
          };
          
          setMember(transformedMember);
        } else {
          setError("Member not found");
        }
      } catch (error) {
        console.error("Error fetching member:", error);
        setError("Failed to load member data");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchMember();
    }
  }, [params.slug]);

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  if (loading) {
    return <LoadingSpinner size="lg" variant="border" fullScreen />;
  }

  console.log("membersssssssssttt", member);

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <Breadcrumb
          items={[
            { label: "Team Members", href: "/team-members" },
            { label: "Member Not Found", current: true },
          ]}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Member Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {error || "The requested team member could not be found."}
            </p>
            <a
              href="/team-members"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-secondary hover:bg-brand-primary transition-colors"
            >
              ← Back to Team Members
            </a>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "publications",
      label: "Publications",
      count: member.publications?.filter(pub => (pub.status === "published" || pub.status === "Published")).length || 0,
    },
    {
      id: "ongoing",
      label: "Ongoing Papers",
      count: member.publications?.filter(pub => (pub.status !== "published" && pub.status !== "Published")).length || 0,
    },
    { id: "blogs", label: "Blog Posts", count: member.blogs?.length || 0 },
  ];

  // Get current tab data and pagination info
  const getCurrentTabData = () => {
    switch (activeTab) {
      case "publications":
        const publishedPapers = member.publications?.filter(
          pub => (pub.status === "published" || pub.status === "Published")
        ) || [];
        return {
          data: publishedPapers,
          totalItems: publishedPapers.length,
          hasPagination: publishedPapers.length > itemsPerPage
        };
      case "ongoing":
        const ongoingPapers = member.publications?.filter(
          pub => (pub.status !== "published" && pub.status !== "Published")
        ) || [];
        return {
          data: ongoingPapers,
          totalItems: ongoingPapers.length,
          hasPagination: ongoingPapers.length > itemsPerPage
        };
      case "blogs":
        const blogs = member.blogs || [];
        return {
          data: blogs,
          totalItems: blogs.length,
          hasPagination: blogs.length > itemsPerPage
        };
      default:
        return { data: [], totalItems: 0, hasPagination: false };
    }
  };

  const { data: currentData, totalItems, hasPagination } = getCurrentTabData();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "publications":
        return <Publications member={member} paginatedData={paginatedData} />;
      case "ongoing":
        return <OngoingPapers member={member} paginatedData={paginatedData} />;
      case "blogs":
        return <Blogs member={member} paginatedData={paginatedData} />;
      default:
        return <Publications member={member} paginatedData={paginatedData} />;
    }
  };

  const renderPagination = () => {
    if (!hasPagination) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} items
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: "Team Members", href: "/team-members" },
          { label: member.fullName },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Member Header */}
        <div className="mb-8">
          <MemberHeader member={member} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Research Statistics */}
            <ResearchStats member={member} />

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "border-brand-secondary text-brand-secondary"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{tab.label}</span>
                        {tab.count > 0 && (
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                            {tab.count}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="">
                {renderTabContent()}
                {renderPagination()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Expertise member={member} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMemberPage;
