"use client";

import { Container, SectionHeader, Button } from "@/components/ui/core";
import { useState, useEffect } from "react";
import UserAvatar from "@/components/shared/UserAvatar";
import Image from "next/image";
import { GetAllResearchAssociate } from "@/services/reserarchers";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Link from "next/link";
import { Star, AlertCircle } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  institution: string;
  image: string;
  category: string;
  shortBio: string;
}

// Error state component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <section className="py-20 bg-gray-100">
    <Container>
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-brand-primary mb-2">
          Failed to load team members
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </Container>
  </section>
);

// Loading state component
const LoadingState = () => (
  <section className="py-20 bg-gray-100">
    <Container>
      <SectionHeader
        title="Meet Our Team"
        description="Meet the distinguished scholars and researchers who form the backbone of Research Ustad."
      />
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="md"
          variant="border"
          text="Loading team members..."
        />
      </div>
    </Container>
  </section>
);

// Empty state component
const EmptyState = () => (
  <section className="py-20 bg-gray-100">
    <Container>
      <div className="text-center">
        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-brand-primary mb-2">
          No team members available
        </h3>
        <p className="text-gray-600">Check back later for our academic team!</p>
      </div>
    </Container>
  </section>
);

const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load team members data from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GetAllResearchAssociate();

        if (response?.success && Array.isArray(response.data)) {
          const transformedMembers = response.data.map((member: any) => ({
            id: member._id,
            name: member.fullName || "Unknown Member",
            title: member.designation || member.role || "Member",
            institution: member.current?.institution || "",
            image: member.image || "/default-avatar.jpg",
            shortBio: member.shortBio || "",
          }));

          setMembers(transformedMembers);
        } else {
          setMembers([]);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Error state
  if (error) {
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  }

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // No team members state
  if (!members || members?.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="py-10 bg-gray-100">
      <Container className="max-w-5xl">
        {/* Section Header */}
        <SectionHeader
          title="Meet Our Team"
          description="Meet the distinguished scholars and researchers who form the backbone of Research Ustad."
        />

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {members?.slice(0, 6)?.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-xl rounded-lg border border-gray-100 text-center"
            >
           
              {/* Member Image */}
              <div className="relative w-full py-2 flex items-center justify-center mx-auto">
              

                <div className=" w-56 h-56 border-2 border-gray-200 rounded-full flex items-center justify-center m-auto">
                  <UserAvatar
                    src={member?.image}
                    alt={member?.name}
                    name={member?.name}
                    size="lg"
                    className="object-cover ring-gray-200 shadow-lg w-full h-full"
                    fallbackClassName="text-5xl font-bold"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6 space-y-2">
                <Link href={`/team-members/${member.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:underline">
                    {member?.name}
                  </h3>
                </Link>
                <p className="text-base text-gray-600">
                  {member?.shortBio ? member?.shortBio : member.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link href="/team-members">
            <Button
              variant="primary"
              size="md"
              className="px-8 py-4 cursor-pointer"
            >
              VIEW ALL TEAM MEMBERS
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
