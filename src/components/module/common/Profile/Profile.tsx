"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { logout } from "@/services/AuthService";
import { ChangePassword } from "@/services/ChangePassword";
import { GetMe } from "@/services/singleUser";
import { GetSinglePersonalMember } from "@/services/reserarchers";
import { TUser, UserProfile, MemberData } from "@/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUserStatus } from "@/hooks/useUserStatus";
import { 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  Users, 
  Linkedin, 
  ExternalLink,
  Calendar,
  BookOpen,
  Briefcase
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  
  // Use the user status hook to check for account deletion
  useUserStatus();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ oldPassword: string; newPassword: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch basic user data
        const userResult = await GetMe();
        setUser(userResult?.data);
        
        // Fetch detailed member data
        try {
          const memberResult = await GetSinglePersonalMember();
          if (memberResult?.data) {
            setMemberData(memberResult.data);
          }
        } catch (memberError: any) {
          console.error("Error fetching member data:", memberError);
          // Don't fail the entire component if member data fails
          // This allows the profile to still show basic user info
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        // If user data fails, the useUserStatus hook will handle logout
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      if (data) {
        const res = await ChangePassword(data);
        if (res.success) {
          reset();
          logout();
          router.push("/");
          toast.success("Password changed successfully!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password. Please try again.");
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
        <Card className="shadow-xl rounded-lg bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                {memberData?.profileImg ? (
                  <AvatarImage src={memberData.profileImg} alt={user?.fullName} />
                ) : user?.image ? (
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
                  {user?.fullName || memberData?.fullName}
                </CardTitle>
                <p className="text-xl text-blue-600 font-semibold mb-2">
                  {user?.designation || memberData?.designation}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-semibold">Role:</span> {user?.role}
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {user?.email && user.email.trim() !== "" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {memberData?.contactNo && memberData.contactNo.trim() !== "" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{memberData.contactNo}</span>
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
          {memberData?.shortBio && memberData.shortBio.trim() !== "" && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">About</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{memberData.shortBio}</p>
              </CardContent>
            </Card>
          )}

          {/* Current Institution */}
          {memberData?.current && (
            (memberData.current.institution && memberData.current.institution.trim() !== "") ||
            (memberData.current.department && memberData.current.department.trim() !== "") ||
            (memberData.current.degree && memberData.current.degree.trim() !== "") ||
            (memberData.current.inst_designation && memberData.current.inst_designation.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Current Position</h3>
                </div>
                <div className="space-y-2">
                  {memberData.current.institution && memberData.current.institution.trim() !== "" && (
                    <p><span className="font-semibold">Institution:</span> {memberData.current.institution}</p>
                  )}
                  {memberData.current.department && memberData.current.department.trim() !== "" && (
                    <p><span className="font-semibold">Department:</span> {memberData.current.department}</p>
                  )}
                  {memberData.current.degree && memberData.current.degree.trim() !== "" && (
                    <p><span className="font-semibold">Degree:</span> {memberData.current.degree}</p>
                  )}
                  {memberData.current.inst_designation && memberData.current.inst_designation.trim() !== "" && (
                    <p><span className="font-semibold">Designation:</span> {memberData.current.inst_designation}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {memberData?.education && (
            (memberData.education.degree && memberData.education.degree.trim() !== "") ||
            (memberData.education.field && memberData.education.field.trim() !== "") ||
            (memberData.education.institution && memberData.education.institution.trim() !== "") ||
            (memberData.education.status && memberData.education.status.trim() !== "") ||
            (memberData.education.scholarship && memberData.education.scholarship.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Education</h3>
                </div>
                <div className="space-y-2">
                  {memberData.education.degree && memberData.education.degree.trim() !== "" && (
                    <p><span className="font-semibold">Degree:</span> {memberData.education.degree}</p>
                  )}
                  {memberData.education.field && memberData.education.field.trim() !== "" && (
                    <p><span className="font-semibold">Field:</span> {memberData.education.field}</p>
                  )}
                  {memberData.education.institution && memberData.education.institution.trim() !== "" && (
                    <p><span className="font-semibold">Institution:</span> {memberData.education.institution}</p>
                  )}
                  {memberData.education.status && memberData.education.status.trim() !== "" && (
                    <p><span className="font-semibold">Status:</span> {memberData.education.status}</p>
                  )}
                  {memberData.education.scholarship && memberData.education.scholarship.trim() !== "" && (
                    <p><span className="font-semibold">Scholarship:</span> {memberData.education.scholarship}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expertise */}
          {memberData?.expertise && memberData.expertise.length > 0 && memberData.expertise.some(item => item && item.trim() !== "") && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Areas of Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {memberData.expertise
                    .filter(expertise => expertise && expertise.trim() !== "")
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
          {memberData?.awards && memberData.awards.length > 0 && memberData.awards.some(item => item && item.trim() !== "") && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Awards & Achievements</h3>
                </div>
                <ul className="space-y-2">
                  {memberData.awards
                    .filter(award => award && award.trim() !== "")
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
          {memberData?.conferences && memberData.conferences.length > 0 && memberData.conferences.some(conf => 
            (conf.name && conf.name.trim() !== "") || 
            (conf.role && conf.role.trim() !== "") || 
            (conf.topic && conf.topic.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Conference Participation</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {memberData.conferences
                    .filter(conf => 
                      (conf.name && conf.name.trim() !== "") || 
                      (conf.role && conf.role.trim() !== "") || 
                      (conf.topic && conf.topic.trim() !== "")
                    )
                    .map((conference, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        {conference.name && conference.name.trim() !== "" && (
                          <p className="font-semibold text-gray-800">{conference.name}</p>
                        )}
                        {conference.role && conference.role.trim() !== "" && (
                          <p className="text-sm text-gray-600">Role: {conference.role}</p>
                        )}
                        {conference.topic && conference.topic.trim() !== "" && (
                          <p className="text-sm text-gray-600">Topic: {conference.topic}</p>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Links */}
          {memberData?.socialLinks && (
            (memberData.socialLinks.linkedin && memberData.socialLinks.linkedin.trim() !== "") ||
            (memberData.socialLinks.researchgate && memberData.socialLinks.researchgate.trim() !== "") ||
            (memberData.socialLinks.google_scholar && memberData.socialLinks.google_scholar.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Professional Links</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {memberData.socialLinks.linkedin && memberData.socialLinks.linkedin.trim() !== "" && (
                    <a
                      href={memberData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {memberData.socialLinks.researchgate && memberData.socialLinks.researchgate.trim() !== "" && (
                    <a
                      href={memberData.socialLinks.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      ResearchGate
                    </a>
                  )}
                  {memberData.socialLinks.google_scholar && memberData.socialLinks.google_scholar.trim() !== "" && (
                    <a
                      href={memberData.socialLinks.google_scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Google Scholar
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Password Management Section */}
        <Card className="shadow-lg rounded-lg">
          <CardContent className="p-6">
            {/* Password Change Notice */}
            <div
              className={`p-4 rounded-md mb-6 text-center font-semibold 
              ${
                user?.needsPasswordChange
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }
            `}
            >
              {user?.needsPasswordChange ? (
                <p>Please change your password as soon as possible!</p>
              ) : (
                <div>
                  <p>Password Up to Date</p>
                  <p>
                    Password changed at:{" "}
                    {new Date(user?.passwordChangedAt as string).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Change Password Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Change Password
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                {/* Old Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Old Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter Old Password"
                    {...register("oldPassword", {
                      required: "Old password is required",
                    })}
                    className="w-full border rounded-md p-2"
                  />
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter New Password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    className="w-full border rounded-md p-2"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                >
                  Change Password
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
