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

          {/* Member Info Section */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {member.fullName}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-1">
                  {member.designation}
                </Badge>

                {member.socialLinks?.facebook && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <a
                      href={member.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
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

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {/* {member.socialLinks?.linkedin && (
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
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}

              {member.socialLinks?.twitter && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )} */}
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
