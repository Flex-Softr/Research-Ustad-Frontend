"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/services/AuthService";
import { ChangePassword } from "@/services/ChangePassword";
import { GetMe } from "@/services/singleUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  Briefcase
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
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

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);



  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'superadmin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'research_associate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lead_research_associate':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'advisor':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lead':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mentor_panel':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
        <Card className="shadow-xl rounded-lg bg-white relative">
          {/* Role Badge */}
          {user?.role && (
            <div className="absolute top-4 right-4 z-10">
              <Badge 
                variant="outline" 
                className={`text-xs font-semibold ${getRoleBadgeColor(user.role)}`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace(/_/g, ' ')}
              </Badge>
            </div>
          )}
          <CardContent className="p-8">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
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
          {user?.current && (
            (user.current.institution && user.current.institution.trim() !== "") ||
            (user.current.department && user.current.department.trim() !== "") ||
            (user.current.degree && user.current.degree.trim() !== "") ||
            (user.current.inst_designation && user.current.inst_designation.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Current Position</h3>
                </div>
                <div className="space-y-2">
                  {user.current.institution && user.current.institution.trim() !== "" && (
                    <p><span className="font-semibold">Institution:</span> {user.current.institution}</p>
                  )}
                  {user.current.department && user.current.department.trim() !== "" && (
                    <p><span className="font-semibold">Department:</span> {user.current.department}</p>
                  )}
                  {user.current.degree && user.current.degree.trim() !== "" && (
                    <p><span className="font-semibold">Degree:</span> {user.current.degree}</p>
                  )}
                  {user.current.inst_designation && user.current.inst_designation.trim() !== "" && (
                    <p><span className="font-semibold">Designation:</span> {user.current.inst_designation}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {user?.education && (
            (user.education.degree && user.education.degree.trim() !== "") ||
            (user.education.field && user.education.field.trim() !== "") ||
            (user.education.institution && user.education.institution.trim() !== "") ||
            (user.education.status && user.education.status.trim() !== "") ||
            (user.education.scholarship && user.education.scholarship.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Education</h3>
                </div>
                <div className="space-y-2">
                  {user.education.degree && user.education.degree.trim() !== "" && (
                    <p><span className="font-semibold">Degree:</span> {user.education.degree}</p>
                  )}
                  {user.education.field && user.education.field.trim() !== "" && (
                    <p><span className="font-semibold">Field:</span> {user.education.field}</p>
                  )}
                  {user.education.institution && user.education.institution.trim() !== "" && (
                    <p><span className="font-semibold">Institution:</span> {user.education.institution}</p>
                  )}
                  {user.education.status && user.education.status.trim() !== "" && (
                    <p><span className="font-semibold">Status:</span> {user.education.status}</p>
                  )}
                  {user.education.scholarship && user.education.scholarship.trim() !== "" && (
                    <p><span className="font-semibold">Scholarship:</span> {user.education.scholarship}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expertise */}
          {user?.expertise && user.expertise.length > 0 && user.expertise.some(item => item && item.trim() !== "") && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Areas of Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.expertise
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
          {user?.awards && user.awards.length > 0 && user.awards.some(item => item && item.trim() !== "") && (
            <Card className="shadow-lg rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Awards & Achievements</h3>
                </div>
                <ul className="space-y-2">
                  {user.awards
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
          {user?.conferences && user.conferences.length > 0 && user.conferences.some(conf => 
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
                  {user.conferences
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
          {user?.socialLinks && (
            (user.socialLinks.linkedin && user.socialLinks.linkedin.trim() !== "") ||
            (user.socialLinks.researchgate && user.socialLinks.researchgate.trim() !== "") ||
            (user.socialLinks.google_scholar && user.socialLinks.google_scholar.trim() !== "")
          ) && (
            <Card className="shadow-lg rounded-lg lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Professional Links</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {user.socialLinks.linkedin && user.socialLinks.linkedin.trim() !== "" && (
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {user.socialLinks.researchgate && user.socialLinks.researchgate.trim() !== "" && (
                    <a
                      href={user.socialLinks.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      ResearchGate
                    </a>
                  )}
                  {user.socialLinks.google_scholar && user.socialLinks.google_scholar.trim() !== "" && (
                    <a
                      href={user.socialLinks.google_scholar}
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Change Password
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update your account password for better security
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Old Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      {...register("oldPassword", {
                        required: "Current password is required",
                      })}
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.oldPassword 
                          ? "border-red-300 bg-red-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  {errors.oldPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.oldPassword.message}
                    </div>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                        },
                      })}
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.newPassword 
                          ? "border-red-300 bg-red-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.newPassword && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-600">At least 6 characters long</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-600">Contains uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-600">Contains lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-600">Contains number</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Update Password
                  </div>
                </Button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="text-sm font-semibold text-yellow-800">Security Notice</h5>
                    <p className="text-sm text-yellow-700 mt-1">
                      After changing your password, you will be automatically logged out for security purposes. 
                      Please log in again with your new password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
