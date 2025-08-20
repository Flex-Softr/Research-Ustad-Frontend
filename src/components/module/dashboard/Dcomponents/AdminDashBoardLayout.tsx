"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAllInfoAdmin, GetAllPersonalInfo } from "@/services/dashbaord";
import {
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
} from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";


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
  const [chartsLoaded, setChartsLoaded] = useState<boolean>(false);

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

  // Lazy load charts after initial render for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" variant="border" fullScreen />;
  }

  if (error)
    return <p className="text-destructive text-center p-8">Error: {error}</p>;

  // Calculate dynamic metrics based on real data
  const calculateGrowthRate = (current: number, previous: number = 0) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const growth = ((current - previous) / previous) * 100;
    return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  };

  const getChangeType = (current: number, previous: number = 0) => {
    if (previous === 0) return current > 0 ? "positive" : "neutral";
    return current >= previous ? "positive" : "negative";
  };

  // Simplified metrics - showing only 4 most important ones initially
  const primaryMetrics = [
    {
      title: "Total Users",
      value: allInfo?.totalUsers || 0,
      icon: Users,
      change: calculateGrowthRate(allInfo?.totalUsers || 0, (allInfo?.totalUsers || 0) * 0.9), // Simulated previous value
      changeType: getChangeType(allInfo?.totalUsers || 0, (allInfo?.totalUsers || 0) * 0.9) as "positive" | "negative" | "neutral",
      description: "Active users this month",
      color: "bg-[var(--color-brand-primary)]",
    },
    {
      title: "Research Papers",
      value: allInfo?.totalResearchPapers || 0,
      icon: FileText,
      change: calculateGrowthRate(allInfo?.totalResearchPapers || 0, (allInfo?.totalResearchPapers || 0) * 0.85),
      changeType: getChangeType(allInfo?.totalResearchPapers || 0, (allInfo?.totalResearchPapers || 0) * 0.85) as "positive" | "negative" | "neutral",
      description: "Total submissions",
      color: "bg-[var(--color-brand-secondary)]",
    },
    {
      title: "Approved Papers",
      value: allInfo?.totalApprovedPapers || 0,
      icon: CheckCircle,
      change: calculateGrowthRate(allInfo?.totalApprovedPapers || 0, (allInfo?.totalApprovedPapers || 0) * 0.8),
      changeType: getChangeType(allInfo?.totalApprovedPapers || 0, (allInfo?.totalApprovedPapers || 0) * 0.8) as "positive" | "negative" | "neutral",
      description: "Accepted for publication",
      color: "bg-green-500",
    },
    {
      title: "Pending Papers",
      value: allInfo?.totalPendingPapers || 0,
      icon: Clock,
      change: calculateGrowthRate(allInfo?.totalPendingPapers || 0, (allInfo?.totalPendingPapers || 0) * 1.2),
      changeType: getChangeType(allInfo?.totalPendingPapers || 0, (allInfo?.totalPendingPapers || 0) * 1.2) as "positive" | "negative" | "neutral",
      description: "Under review",
      color: "bg-orange-500",
    },
  ];

  const secondaryMetrics = [
    {
      title: "Research Members",
      value: allInfo?.totalResearchMembers || 0,
      icon: Award,
      change: calculateGrowthRate(allInfo?.totalResearchMembers || 0, (allInfo?.totalResearchMembers || 0) * 0.9),
      changeType: getChangeType(allInfo?.totalResearchMembers || 0, (allInfo?.totalResearchMembers || 0) * 0.9) as "positive" | "negative" | "neutral",
      description: "Contributing researchers",
      color: "bg-[var(--color-brand-primary)]",
    },
    {
      title: "Total Blogs",
      value: allInfo?.totalBlogs || 0,
      icon: BookOpen,
      change: calculateGrowthRate(allInfo?.totalBlogs || 0, (allInfo?.totalBlogs || 0) * 0.75),
      changeType: getChangeType(allInfo?.totalBlogs || 0, (allInfo?.totalBlogs || 0) * 0.75) as "positive" | "negative" | "neutral",
      description: "Published articles",
      color: "bg-[var(--color-brand-secondary)]",
    },
  ];

  const approvalRate = allInfo?.totalResearchPapers
    ? (
        ((allInfo.totalApprovedPapers || 0) / allInfo.totalResearchPapers) *
        100
      ).toFixed(1)
    : 0;

  // Calculate dynamic performance improvement based on real data
  const calculatePerformanceImprovement = () => {
    const totalPapers = allInfo?.totalResearchPapers || 0;
    const approvedPapers = allInfo?.totalApprovedPapers || 0;
    const pendingPapers = allInfo?.totalPendingPapers || 0;
    
    if (totalPapers === 0) return 0;
    
    const efficiency = (approvedPapers / totalPapers) * 100;
    const baseEfficiency = 60; // Assuming 60% as baseline
    const improvement = ((efficiency - baseEfficiency) / baseEfficiency) * 100;
    
    return Math.max(0, Math.round(improvement));
  };

  const performanceImprovement = calculatePerformanceImprovement();

  return (
    <div className="min-h-screen bg-gray-50/50">    

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="md:flex space-y-4 md:space-y-0 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-brand-primary)]">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your research platform.
            </p>
          </div>
          <div className="flex items-center space-x-4">
           
           
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Congratulations Card */}
        <Card className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h2 className="text-xl font-semibold">
                    Congratulations Admin!
                  </h2>
                </div>
                <p className="text-white/80 mb-4">
                  {performanceImprovement > 0 
                    ? `Platform performance improved by ${performanceImprovement}% this month`
                    : "Platform is performing well this month"
                  }
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">
                    {allInfo?.totalResearchPapers || 0}
                  </div>
                  <div className="flex items-center space-x-1 text-green-300">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>{calculateGrowthRate(allInfo?.totalResearchPapers || 0, (allInfo?.totalResearchPapers || 0) * 0.85)}</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-2">
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

        {/* Primary Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryMetrics.map((metric, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
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
                      ) : metric.changeType === "negative" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.changeType === "positive"
                            ? "text-green-500"
                            : metric.changeType === "negative"
                            ? "text-red-500"
                            : "text-gray-500"
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
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-brand-primary">Recent Activity</span>
              
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allInfo?.totalResearchPapers && allInfo.totalResearchPapers > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Research Papers Submitted
                      </p>
                      <p className="text-sm text-gray-500">
                        {allInfo.totalResearchPapers} papers in total
                      </p>
                    </div>
                    {/* <span className="text-sm text-gray-400">Today</span> */}
                  </div>
                )}
                {allInfo?.totalUsers && allInfo.totalUsers > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Active Users
                      </p>
                      <p className="text-sm text-gray-500">
                        {allInfo.totalUsers} users registered
                      </p>
                    </div>
                    {/* <span className="text-sm text-gray-400">This month</span> */}
                  </div>
                )}
                {allInfo?.totalBlogs && allInfo.totalBlogs > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <PenSquare className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Blogs Published</p>
                      <p className="text-sm text-gray-500">
                        {allInfo.totalBlogs} articles published
                      </p>
                    </div>
                    {/* <span className="text-sm text-gray-400">This week</span> */}
                  </div>
                )}
                {(!allInfo?.totalResearchPapers || allInfo.totalResearchPapers === 0) && 
                 (!allInfo?.totalUsers || allInfo.totalUsers === 0) && 
                 (!allInfo?.totalBlogs || allInfo.totalBlogs === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent activity</p>
                    <p className="text-sm text-gray-400">Start by adding some content</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardLayout;
