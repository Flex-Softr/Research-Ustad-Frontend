"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAllInfoAdmin, GetAllPersonalInfo } from "@/services/dashbaord";
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  UserPlus,
  PenSquare,
  Bell,
  Search,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";

// Define types
interface DashboardData {
  totalUsers?: number;
  totalResearchMembers?: number;
  totalBlogs?: number;
  totalApprovedPapers?: number;
  totalPendingPapers?: number;
  totalResearchPapers?: number;
}

const AdminDashBoardLayout = () => {
  const [allInfo, setAllInfo] = useState<DashboardData | null>(null);
  const [result, setResult] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personalInfo = await GetAllPersonalInfo();
        const adminInfo = await GetAllInfoAdmin();

        setResult(personalInfo?.data || null);
        setAllInfo(adminInfo?.data || null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" variant="border" fullScreen />;
  }

  if (error)
    return <p className="text-destructive text-center p-8">Error: {error}</p>;

  // Chart data preparation
  const weeklyData = [
    { name: "Mon", papers: 12, blogs: 8, users: 15 },
    { name: "Tue", papers: 19, blogs: 12, users: 22 },
    { name: "Wed", papers: 15, blogs: 10, users: 18 },
    { name: "Thu", papers: 25, blogs: 16, users: 28 },
    { name: "Fri", papers: 22, blogs: 14, users: 25 },
    { name: "Sat", papers: 18, blogs: 11, users: 20 },
    { name: "Sun", papers: 14, blogs: 9, users: 16 },
  ];

  const paperStatusData = [
    {
      name: "Approved",
      value: allInfo?.totalApprovedPapers || 0,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: allInfo?.totalPendingPapers || 0,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value:
        (allInfo?.totalResearchPapers || 0) -
        (allInfo?.totalApprovedPapers || 0) -
        (allInfo?.totalPendingPapers || 0),
      color: "#EF4444",
    },
  ];

  const countryData = [
    { country: "US", sales: 8656, growth: 25.8, salesCount: 894 },
    { country: "UK", sales: 6543, growth: 18.2, salesCount: 567 },
    { country: "CA", sales: 5432, growth: 12.5, salesCount: 432 },
    { country: "AU", sales: 4321, growth: 8.9, salesCount: 321 },
  ];

  const metrics = [
    {
      title: "Total Users",
      value: allInfo?.totalUsers || 0,
      icon: Users,
      change: "+12.5%",
      changeType: "positive",
      description: "Active users this month",
      color: "bg-blue-500",
    },
    {
      title: "Research Members",
      value: allInfo?.totalResearchMembers || 0,
      icon: Award,
      change: "+8.2%",
      changeType: "positive",
      description: "Contributing researchers",
      color: "bg-green-500",
    },
    {
      title: "Total Blogs",
      value: allInfo?.totalBlogs || 0,
      icon: BookOpen,
      change: "+15.3%",
      changeType: "positive",
      description: "Published articles",
      color: "bg-purple-500",
    },
    {
      title: "Research Papers",
      value: allInfo?.totalResearchPapers || 0,
      icon: FileText,
      change: "+5.7%",
      changeType: "positive",
      description: "Total submissions",
      color: "bg-orange-500",
    },
    {
      title: "Approved Papers",
      value: allInfo?.totalApprovedPapers || 0,
      icon: CheckCircle,
      change: "+9.1%",
      changeType: "positive",
      description: "Accepted for publication",
      color: "bg-emerald-500",
    },
    {
      title: "Pending Papers",
      value: allInfo?.totalPendingPapers || 0,
      icon: Clock,
      change: "-2.3%",
      changeType: "negative",
      description: "Under review",
      color: "bg-yellow-500",
    },
  ];

  const approvalRate = allInfo?.totalResearchPapers
    ? (
        ((allInfo.totalApprovedPapers || 0) / allInfo.totalResearchPapers) *
        100
      ).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="md:flex space-y-4 md:space-y-0 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your research platform.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Moon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Congratulations Card */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h2 className="text-xl font-semibold">
                    Congratulations Admin!
                  </h2>
                </div>
                <p className="text-purple-100 mb-4">
                  Best performing platform this month
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">
                    {allInfo?.totalResearchPapers || 0}
                  </div>
                  <div className="flex items-center space-x-1 text-green-300">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>+42%</span>
                  </div>
                </div>
                <p className="text-purple-100 text-sm mt-2">
                  Total research papers published
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-12 w-12 text-yellow-300" />
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.slice(0, 4).map((metric, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {metric.value}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      {metric.changeType === "positive" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.changeType === "positive"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Overview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Weekly Overview</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <XAxis className="h-4 w-4" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="papers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="blogs" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  📈 Your platform performance is 45% better compared to last
                  month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Paper Status Distribution */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Paper Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paperStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paperStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {paperStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.slice(4).map((metric, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {metric.value}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      {metric.changeType === "positive" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.changeType === "positive"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by Countries */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Platform Activity by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryData.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          {country.country}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {country.sales}k Papers
                        </p>
                        <p className="text-sm text-gray-500">
                          {country.salesCount}k Users
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-green-500">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        +{country.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Activity</span>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      New Research Paper Submitted
                    </p>
                    <p className="text-sm text-gray-500">
                      Dr. Smith submitted "AI in Healthcare"
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      New Member Joined
                    </p>
                    <p className="text-sm text-gray-500">
                      Prof. Johnson joined the platform
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">15 min ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <PenSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Blog Published</p>
                    <p className="text-sm text-gray-500">
                      "Future of Research" by Dr. Brown
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardLayout;
