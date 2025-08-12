"use client";

import { useEffect, useState } from "react";
import { GetAllPersonalInfo, GetUserBlogs } from "@/services/dashbaord";
import { GetMe } from "@/services/singleUser";
import { GetAllResearchPaperMy } from "@/services/allreserchPaper";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Plus,
  Edit,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Define types
interface PersonalData {
  totalApprovedPapers: number;
  totalPendingPapers: number;
  totalBlogs: number;
}

interface User {
  _id: string;
  email: string;
  fullName?: string;
  role: string;
  image?: string;
  designation?: string;
}

interface ResearchPaper {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  isApproved: boolean;
  createdAt: string;
  paperType: string;
}

interface Blog {
  _id: string;
  title: string;
  publishedDate: string;
  readTime: string;
  views: number;
  likes: number;
  status: string;
  category?: string;
  content?: string;
}

const UserDashBoardLayout = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [recentPapers, setRecentPapers] = useState<ResearchPaper[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalResponse, userResponse, papersResponse, blogsResponse] = await Promise.all([
          GetAllPersonalInfo(),
          GetMe(),
          GetAllResearchPaperMy(),
          GetUserBlogs()
        ]);
        
        setPersonalInfo(personalResponse?.data || null);
        setUser(userResponse?.data || null);
        setRecentPapers(papersResponse?.data?.slice(0, 5) || []);
        setRecentBlogs(blogsResponse?.data?.slice(0, 3) || []);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const stats = [
    {
      title: "Approved Papers",
      value: personalInfo?.totalApprovedPapers || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverBg: "hover:bg-green-100",
      trend: "+15%",
      trendColor: "text-green-600",
    },
    {
      title: "Pending Papers",
      value: personalInfo?.totalPendingPapers || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-100",
      trend: "+8%",
      trendColor: "text-orange-600",
    },
    {
      title: "Total Papers",
      value: (personalInfo?.totalApprovedPapers || 0) + (personalInfo?.totalPendingPapers || 0),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-100",
      trend: "+12%",
      trendColor: "text-blue-600",
    },
    {
      title: "Total Blogs",
      value: personalInfo?.totalBlogs || 0,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverBg: "hover:bg-purple-100",
      trend: "+20%",
      trendColor: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Add Research Paper",
      description: "Submit a new research paper",
      icon: Plus,
      href: "/user/dashboard/addresearchpaper",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      title: "Create Blog",
      description: "Write and publish a new blog post",
      icon: Edit,
      href: "/user/dashboard/createblog",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
    {
      title: "View My Papers",
      description: "Manage your research papers",
      icon: FileText,
      href: "/user/dashboard/mypapers",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
    },
    {
      title: "Update Profile",
      description: "Edit your profile information",
      icon: Users,
      href: "/user/dashboard/updateinfo",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      hoverBg: "hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.fullName || user?.email?.split('@')[0] || 'Researcher'}!
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your research today
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl border ${stat.borderColor} ${stat.bgColor} ${stat.hoverBg} transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className={stat.trendColor}>{stat.trend} from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`p-4 rounded-xl border border-gray-200 ${action.bgColor} ${action.hoverBg} transition-all duration-300 transform hover:scale-105 hover:shadow-md group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Research Papers */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Research Papers</h2>
              <Link 
                href="/user/dashboard/mypapers"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentPapers.length > 0 ? (
                recentPapers.map((paper) => (
                  <div
                    key={paper._id}
                    className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {paper.authors.join(", ")}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{paper.journal}</span>
                          <span>•</span>
                          <span>{paper.year}</span>
                          <span>•</span>
                          <span className="capitalize">{paper.paperType}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          paper.isApproved 
                            ? "bg-green-100 text-green-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {paper.isApproved ? "Approved" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No research papers yet</p>
                  <Link 
                    href="/user/dashboard/addresearchpaper"
                    className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                  >
                    Add your first paper
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={user?.image || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 w-20 h-20 border-blue-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg";
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                {user?.fullName || user?.email?.split('@')[0] || 'Researcher'}
              </h3>
              {/* <p className="text-gray-600 capitalize">{user?.role}</p> */}
              {user?.designation && (
                <p className="text-sm text-gray-500">{user.designation}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/user/dashboard/profileinfo"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoardLayout;
