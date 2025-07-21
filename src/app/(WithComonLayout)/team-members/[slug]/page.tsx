"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { TeamMember } from "../components";
import {
  MemberHeader,
  ResearchStats,
  Publications,
  OngoingProjects,
  Blogs,
  Expertise,
} from "./components";

const SingleMemberPage = () => {
  const params = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const response = await fetch("/json/team-members.json");
        const data = await response.json();

        if (data?.members) {
          const foundMember = data.members.find(
            (m: TeamMember) => m.id === params.slug
          );
          if (foundMember) {
            setMember(foundMember);
          } else {
            setError("Member not found");
          }
        } else {
          setError("Failed to load member data");
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

  if (loading) {
    return <LoadingSpinner size="lg" variant="border" fullScreen />;
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <Breadcrumb
          items={[
            { label: "Team Members", href: "/team-members" },
            { label: "Member Not Found", current: true },
          ]}
          className="py-8"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: "Team Members", href: "/team-members" },
          { label: member.fullName, current: true },
        ]}
        className="py-8"
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

            {/* Publications */}
            <Publications member={member} />

            {/* Ongoing Projects */}
            <OngoingProjects member={member} />

            {/* Blogs */}
            <Blogs member={member} />
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
