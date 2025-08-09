import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  LinkedinIcon,
  Microscope,
  BookMarked,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "../../components";

interface MemberHeaderProps {
  member: TeamMember;
}

const MemberHeader = ({ member }: MemberHeaderProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={member.profileImg || "/placeholder-instructor.jpg"}
                alt={member.fullName}
                width={200}
                height={200}
                className="object-cover w-48 h-48 rounded-full ring-4 ring-gray-200 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-instructor.jpg";
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Member social links Section */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {member.fullName}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-1">
                  {member.role}
                </Badge>

                {member.socialLinks?.linkedin && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon />
                      linkedin
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {member.socialLinks?.google_scholar && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <a
                      href={member.socialLinks.google_scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GraduationCap />
                      Google Scholar
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {member.socialLinks?.researchgate && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <a
                      href={member.socialLinks.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Microscope />
                      research Gate
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>

              {member.shortBio && (
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {member.shortBio}
                </p>
              )}
            </div>

            {/* Contact & Location Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {member.current?.institution && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-secondary" />
                  <span className="text-gray-700">
                    {member.current.institution}
                  </span>
                </div>
              )}

              {member.education?.field && (
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-brand-secondary" />
                  <span className="text-gray-700">
                    {member.education.field}
                  </span>
                </div>
              )}

              {member.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-secondary" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-700 hover:text-brand-secondary transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              )}
            </div>

            {/* Back to Team Button */}
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link href="/team-members">← Back to Team Members</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberHeader;
