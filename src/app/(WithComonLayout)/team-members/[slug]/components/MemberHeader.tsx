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
import Link from "next/link";
import { TeamMember } from "../../components";
import UserAvatar from "@/components/shared/UserAvatar";
import { FaOrcid } from "react-icons/fa";

interface MemberHeaderProps {
  member: TeamMember;
}

const MemberHeader = ({ member }: MemberHeaderProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:items-start items-center lg:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 border-2 border-gray-200 rounded-full">
              <UserAvatar
                src={member?.profileImg}
                alt={member?.fullName}
                name={member?.fullName}
                size="lg"
                className="object-cover ring-gray-200 shadow-lg w-full h-full"
                fallbackClassName="text-5xl font-bold"
              />
              <div className="absolute bottom-1 right-3 w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Member social links Section */}
          <div className="flex-1">
            <div className="mb-3 space-y-3">
              <h1 className="text-3xl text-center lg:text-left font-bold text-gray-900 leading-tight">
                {member?.fullName}
              </h1>

              {(member?.current?.inst_designation ||
                member?.current?.department ||
                member?.current?.institution) && (
                <div className="flex items-center gap-2 text-gray-600 text-center lg:text-left">
                  <p className=" leading-relaxed capitalize">
                    {member?.current?.inst_designation && (
                      <span className="font-medium">
                        {member.current.inst_designation}
                      </span>
                    )}
                    {member?.current?.department &&
                      member?.current?.inst_designation && <span>, </span>}
                    {member?.current?.department && (
                      <span>{member.current.department}</span>
                    )}
                    {member?.current?.institution &&
                      (member?.current?.inst_designation ||
                        member?.current?.department) && <span>, </span>}
                    {member?.current?.institution && (
                      <span className="font-medium text-gray-700">
                        {member.current.institution}
                      </span>
                    )}
                  </p>
                </div>
              )}

              {member?.designation && (
                <div className="flex items-center gap-2 md:justify-start justify-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-gray-700  font-semibold capitalize">
                      Role:
                    </h2>
                    <p className="text-gray-700">{member?.designation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact & Location Info */}
            <div className="flex mb-6 gap-4">
              {member?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-5 w-5 md:block hidden text-brand-secondary" />
                  <a
                    href={`mailto:${member?.email}`}
                    className="text-gray-700 hover:text-brand-secondary transition-colors"
                  >
                    {member?.email}
                  </a>
                </div>
              )}

              {member?.citations && member?.citations > 0 ? (
                <div className="flex items-center gap-1">
                  <BookMarked className="h-5 w-5 md:block hidden text-brand-secondary" />
                  <span className="text-gray-700">
                    {member.citations} Citations
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex flex-wrap capitalize items-center gap-2 mb-4">
              {member?.socialLinks?.orcid && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href={member?.socialLinks?.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaOrcid />
                    ORCID
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              {member?.socialLinks?.google_scholar && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href={member?.socialLinks?.google_scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GraduationCap />
                    Google Scholar
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              {member?.socialLinks?.researchgate && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href={member?.socialLinks?.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Microscope />
                    research Gate
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              {member?.socialLinks?.linkedin && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href={member?.socialLinks?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon />
                    linkedin
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
            </div>

            {/* Back to Team Button */}
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 hover:bg-brand-secondary hover:text-white"
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
