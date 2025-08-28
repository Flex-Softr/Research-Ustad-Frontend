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
        title="Our Academic Team"
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(
    [{ id: "all", label: "All" }]
  );

  // Load team members data from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GetAllResearchAssociate();

        if (
          response?.success &&
          response?.data &&
          Array.isArray(response.data)
        ) {
          // Transform API data to match TeamMember interface
          const transformedMembers = response.data.map((member: any) => ({
            id: member._id,
            name: member.fullName || "Unknown Member",
            title: member.designation || member.role || "",
            institution: member.current?.institution || "",
            image: member.image || "/default-avatar.jpg",
            category: member.designation || member.role || "Other",
          }));

          // Generate categories dynamically from the data using designation
          const uniqueCategories = [
            ...new Set(transformedMembers.map((m) => m.category)),
          ];
          const dynamicCategories = [
            { id: "all", label: "All" },
            ...uniqueCategories.map((cat) => ({
              id: String(cat),
              label: String(cat),
            })),
          ];

          setCategories(dynamicCategories);
          setMembers(transformedMembers);
        } else if (response?.data && Array.isArray(response.data)) {
          // If no success flag but data exists
          const transformedMembers = response.data.map((member: any) => ({
            id: member._id,
            name: member.fullName || "Unknown Member",
            title: member.designation || member.role || "",
            institution: member.current?.institution || "",
            image: member.image || "/default-avatar.jpg",
            category: member.designation || member.role || "Other",
          }));

          // Generate categories dynamically from the data using designation
          const uniqueCategories = [
            ...new Set(transformedMembers.map((m) => m.category)),
          ];
          const dynamicCategories = [
            { id: "all", label: "All" },
            ...uniqueCategories.map((cat) => ({
              id: String(cat),
              label: String(cat),
            })),
          ];

          // console.log("Dynamic categories:", dynamicCategories);
          setCategories(dynamicCategories);
          setMembers(transformedMembers);
        } else {
          console.log("No valid members data available from API");
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

  const filteredMembers =
    activeCategory === "all"
      ? members.slice(0, 3) // Show first 3 items by default without filtering
      : members.filter((member) => member.category === activeCategory);

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
  if (!members || members.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="py-20 bg-gray-100">
      <Container>
        {/* Section Header */}
        <SectionHeader
          title="Our Academic Team"
          description="Meet the distinguished scholars and researchers who form the backbone of Research Ustad."
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => {
            const categoryCount = members.filter(
              (member) => member.category === category.id
            ).length;
            return (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary/5"
                }`}
              >
                {category.label}
              </Button>
            );
          })}
        </div>
        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-xl rounded-lg border border-gray-100 text-center"
            >
              {/* Member Image */}
              <div className="relative w-full h-60 mx-auto">
                <div className="w-full h-full rounded-t-lg overflow-hidden border border-gray-200">
                  {member.image && member.image !== "/default-avatar.jpg" ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full rounded-t-lg object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <UserAvatar
                        src={member.image}
                        alt={member.name}
                        name={member.name}
                        size="4xl"
                        className="w-32 h-32"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {member?.name}
                </h3>
                {member?.title && (
                  <p className="text-base text-gray-600">{member.title}</p>
                )}
               
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
              VIEW FULL FACULTY
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
