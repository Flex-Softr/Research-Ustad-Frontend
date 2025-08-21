"use client";

import { Container, SectionHeader, Button } from "@/components/ui/core";
import { useState, useEffect } from "react";
import UserAvatar from "@/components/shared/UserAvatar";
import Image from "next/image";
import { GetAllResearchAssociate } from "@/services/reserarchers";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  institution: string;
  image: string;
  category: string;
}

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

  // Show loading state
  if (loading) {
    return (
      <section className="py-14 bg-gray-100 container mb-10 md:px-40 mx-auto">
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
  }

  // Show error state
  if (error) {
    return (
      <section className="py-14 bg-gray-100 container mb-10 md:px-40 mx-auto">
        <Container>
          <SectionHeader
            title="Our Academic Team"
            description="Meet the distinguished scholars and researchers who form the backbone of Research Ustad."
          />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                Error loading team members: {error}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="px-6 py-3"
              >
                Retry
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Show no data state
  if (!members || members.length === 0) {
    return (
      <section className="py-14 bg-gray-100 container mb-10 md:px-40 mx-auto">
        <Container>
          <SectionHeader
            title="Our Academic Team"
            description="Meet the distinguished scholars and researchers who form the backbone of Research Ustad."
          />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-600 mb-4">No team members found</p>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="px-6 py-3"
              >
                Refresh
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-14 bg-gray-100 container mb-10 md:px-40 mx-auto">
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
                {member?.institution && (
                  <p className="text-sm text-gray-500">{member.institution}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link href="/team-members">
            <Button variant="primary" size="md" className="px-8 py-4">
              VIEW FULL FACULTY
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
