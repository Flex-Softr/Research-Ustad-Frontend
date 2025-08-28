"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GetMe } from "@/services/singleUser";
import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import {
  Mail,
  Phone,
  GraduationCap,
  Award,
  Users,
  Linkedin,
  ExternalLink,
  BookOpen,
  Briefcase,
} from "lucide-react";
import ChangePasswordSection from "./ChangePasswordSection";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useUserStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResult = await GetMe();
        setUser(userResult?.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      const fetchData = async () => {
        try {
          const userResult = await GetMe();
          setUser(userResult?.data);
        } catch (error: any) {
          console.error("Error refreshing user data:", error);
        }
      };

      fetchData();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "superadmin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "research_associate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "lead_research_associate":
        return "bg-green-100 text-green-800 border-green-200";
      case "advisor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "lead":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "mentor_panel":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 p-6 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start bg-gray-100 p-6 min-h-screen">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header Card */}
        <Card className="shadow-xl rounded-lg bg-white relative">
          {/* Role Badge */}
          {user?.role && (
            <div className="absolute top-4 right-4 z-10">
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role.charAt(0).toUpperCase() +
                  user.role.slice(1).replace(/_/g, " ")}
              </Badge>
            </div>
          )}
          <CardContent className="p-8">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                {user?.image ? (
                  <AvatarImage src={user.image} alt={user?.fullName} />
                ) : (
                  <AvatarFallback className="text-4xl font-bold">
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                  {user?.fullName}
                </CardTitle>
                <p className="text-xl text-blue-600 font-semibold mb-2">
                  {user?.designation}
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {user?.email && user.email.trim() !== "" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user?.contactNo && user.contactNo.trim() !== "" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{user.contactNo}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio Section */}
          {user?.shortBio && user.shortBio.trim() !== "" && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">About</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{user.shortBio}</p>
              </CardContent>
            </Card>
          )}

          {/* Current Institution */}
          {user?.current &&
            ((user.current.institution &&
              user.current.institution.trim() !== "") ||
              (user.current.department &&
                user.current.department.trim() !== "") ||
              (user.current.degree && user.current.degree.trim() !== "") ||
              (user.current.inst_designation &&
                user.current.inst_designation.trim() !== "")) && (
              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Current Position
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {user.current.institution &&
                      user.current.institution.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Institution:</span>{" "}
                          {user.current.institution}
                        </p>
                      )}
                    {user.current.department &&
                      user.current.department.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Department:</span>{" "}
                          {user.current.department}
                        </p>
                      )}
                    {user.current.degree &&
                      user.current.degree.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Degree:</span>{" "}
                          {user.current.degree}
                        </p>
                      )}
                    {user.current.inst_designation &&
                      user.current.inst_designation.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Designation:</span>{" "}
                          {user.current.inst_designation}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Education */}
          {user?.education &&
            ((user.education.degree && user.education.degree.trim() !== "") ||
              (user.education.field && user.education.field.trim() !== "") ||
              (user.education.institution &&
                user.education.institution.trim() !== "") ||
              // (user.education.status && user.education.status.trim() !== "") ||
              (user.education.scholarship &&
                user.education.scholarship.trim() !== "")) && (
              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Education
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {user.education.degree &&
                      user.education.degree.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Degree:</span>{" "}
                          {user.education.degree}
                        </p>
                      )}
                    {user.education.field &&
                      user.education.field.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Field:</span>{" "}
                          {user.education.field}
                        </p>
                      )}
                    {user.education.institution &&
                      user.education.institution.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Institution:</span>{" "}
                          {user.education.institution}
                        </p>
                      )}
                    {user.education.degree &&
                      user.education.status.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {user.education.status}
                        </p>
                      )}
                    {user.education.scholarship &&
                      user.education.scholarship.trim() !== "" && (
                        <p>
                          <span className="font-semibold">Scholarship:</span>{" "}
                          {user.education.scholarship}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Expertise */}
          {user?.expertise &&
            user.expertise.length > 0 &&
            user.expertise.some((item) => item && item.trim() !== "") && (
              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Areas of Expertise
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise
                      .filter(
                        (expertise) => expertise && expertise.trim() !== ""
                      )
                      .map((expertise, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {expertise}
                        </span>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Awards */}
          {user?.awards &&
            user.awards.length > 0 &&
            user.awards.some((item) => item && item.trim() !== "") && (
              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Awards & Achievements
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {user.awards
                      .filter((award) => award && award.trim() !== "")
                      .map((award, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{award}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}

          {/* Conferences */}
          {user?.conferences &&
            user.conferences.length > 0 &&
            user.conferences.some(
              (conf) =>
                (conf.name && conf.name.trim() !== "") ||
                (conf.role && conf.role.trim() !== "") ||
                (conf.topic && conf.topic.trim() !== "")
            ) && (
              <Card className="shadow-lg rounded-lg lg:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Conference Participation
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.conferences
                      .filter(
                        (conf) =>
                          (conf.name && conf.name.trim() !== "") ||
                          (conf.role && conf.role.trim() !== "") ||
                          (conf.topic && conf.topic.trim() !== "")
                      )
                      .map((conference, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          {conference.name && conference.name.trim() !== "" && (
                            <p className="font-semibold text-gray-800">
                              {conference.name}
                            </p>
                          )}
                          {conference.role && conference.role.trim() !== "" && (
                            <p className="text-sm text-gray-600">
                              Role: {conference.role}
                            </p>
                          )}
                          {conference.topic &&
                            conference.topic.trim() !== "" && (
                              <p className="text-sm text-gray-600">
                                Topic: {conference.topic}
                              </p>
                            )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Social Links */}
          {user?.socialLinks &&
            ((user.socialLinks.linkedin &&
              user.socialLinks.linkedin.trim() !== "") ||
              (user.socialLinks.researchgate &&
                user.socialLinks.researchgate.trim() !== "") ||
              (user.socialLinks.google_scholar &&
                user.socialLinks.google_scholar.trim() !== "") ||
              (user.socialLinks.orcid &&
                user.socialLinks.orcid.trim() !== "")) && (
              <Card className="shadow-lg rounded-lg lg:col-span-2 border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Professional Links
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {user.socialLinks.linkedin &&
                      user.socialLinks.linkedin.trim() !== "" && (
                        <a
                          href={user.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Linkedin className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                              LinkedIn
                            </p>
                            <p className="text-xs text-gray-500">
                              Professional Network
                            </p>
                          </div>
                        </a>
                      )}
                    {user.socialLinks.researchgate &&
                      user.socialLinks.researchgate.trim() !== "" && (
                        <a
                          href={user.socialLinks.researchgate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="p-2 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                              ResearchGate
                            </p>
                            <p className="text-xs text-gray-500">
                              Research Network
                            </p>
                          </div>
                        </a>
                      )}
                    {user.socialLinks.google_scholar &&
                      user.socialLinks.google_scholar.trim() !== "" && (
                        <a
                          href={user.socialLinks.google_scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="p-2 bg-blue-800 rounded-lg group-hover:bg-blue-900 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">
                              Google Scholar
                            </p>
                            <p className="text-xs text-gray-500">
                              Academic Profile
                            </p>
                          </div>
                        </a>
                      )}
                    {user.socialLinks.orcid &&
                      user.socialLinks.orcid.trim() !== "" && (
                        <a
                          href={user.socialLinks.orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="p-2 bg-green-700 rounded-lg group-hover:bg-green-800 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                              ORCID ID
                            </p>
                            <p className="text-xs text-gray-500">
                              Research Identifier
                            </p>
                          </div>
                        </a>
                      )}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>

        {/* Password Management Section */}
        <ChangePasswordSection user={user} />
      </div>
    </div>
  );
};

export default Profile;
