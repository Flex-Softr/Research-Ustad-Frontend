import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/type";
import Image from "next/image";
import Link from "next/link";

// Extended interface for the JSON data structure
export interface TeamMember extends UserProfile {
  researchStats?: {
    totalPapers: number;
    publishedPapers: number;
    ongoingPapers: number;
    totalCitations: number;
    hIndex: number;
    impactFactor: number;
    researchGrants: number;
    totalGrantAmount: number;
  };
  publications?: Array<{
    id: string;
    title: string;
    journal: string;
    year: number;
    impactFactor: number;
    citations: number;
    authors: string[];
    doi: string;
    status: string;
  }>;
  ongoingProjects?: Array<{
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    funding: number;
    collaborators: string[];
    status: string;
  }>;
  blogs?: Array<{
    id: string;
    title: string;
    publishedDate: string;
    readTime: string;
    views: number;
    likes: number;
    status: string;
  }>;
  expertise?: string[];
  awards?: string[];
  conferences?: Array<{
    name: string;
    role: string;
    topic: string;
  }>;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Card className="group bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <CardContent className="p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Image
              src={member.profileImg || "https://via.placeholder.com/150"}
              alt={member.fullName}
              width={120}
              height={120}
              className="object-cover w-24 h-24 rounded-full ring-4 ring-gray-200 group-hover:ring-brand-secondary/30 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Member Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-brand-secondary transition-colors duration-300">
            {member.fullName}
          </h3>
          <p className="text-sm text-brand-secondary font-medium mb-2">
            {member.designation}
          </p>
          {member.current?.institution && (
            <p className="text-xs text-gray-600 mb-1">
              {member.current.institution}
            </p>
          )}
          {member.education?.field && (
            <p className="text-xs text-gray-600 mb-1">
              {member.education.field}
            </p>
          )}

          {/* Research Stats */}
          {member.researchStats && (
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Papers:</span>
                <span className="font-medium">
                  {member.researchStats.totalPapers}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Citations:</span>
                <span className="font-medium">
                  {member.researchStats.totalCitations.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>H-index:</span>
                <span className="font-medium">
                  {member.researchStats.hIndex}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Expertise Tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {member.expertise.slice(0, 2).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-brand-secondary/5 text-brand-secondary border-brand-secondary/20"
                >
                  {skill}
                </Badge>
              ))}
              {member.expertise.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-100 text-gray-600"
                >
                  +{member.expertise.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* View Profile Button */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
        >
          <Link href={`/team-members/${member.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
