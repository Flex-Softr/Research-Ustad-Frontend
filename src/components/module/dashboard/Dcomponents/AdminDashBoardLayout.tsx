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
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error)
    return <p className="text-destructive text-center p-8">Error: {error}</p>;

  // Chart data preparation
  const paperStatusData = [
    {
      name: "Approved",
      value: allInfo?.totalApprovedPapers || 0,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Pending",
      value: allInfo?.totalPendingPapers || 0,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Total",
      value: allInfo?.totalResearchPapers || 0,
      color: "hsl(var(--chart-3))",
    },
  ];

  const overviewData = [
    { name: "Users", value: allInfo?.totalUsers || 0 },
    { name: "Research Members", value: allInfo?.totalResearchMembers || 0 },
    { name: "Blogs", value: allInfo?.totalBlogs || 0 },
    { name: "Research Papers", value: allInfo?.totalResearchPapers || 0 },
  ];

  const personalVsSystemData = [
    {
      name: "Approved Papers",
      personal: result?.totalApprovedPapers || 0,
      system: allInfo?.totalApprovedPapers || 0,
    },
    {
      name: "Pending Papers",
      personal: result?.totalPendingPapers || 0,
      system: allInfo?.totalPendingPapers || 0,
    },
    {
      name: "Blogs",
      personal: result?.totalBlogs || 0,
      system: allInfo?.totalBlogs || 0,
    },
  ];

  const metrics = [
    {
      title: "Total Users",
      value: allInfo?.totalUsers || 0,
      icon: Users,
      change: "+12.5%",
      changeType: "positive",
      description: "Active users this month",
    },
    {
      title: "Research Members",
      value: allInfo?.totalResearchMembers || 0,
      icon: Award,
      change: "+8.2%",
      changeType: "positive",
      description: "Contributing researchers",
    },
    {
      title: "Total Blogs",
      value: allInfo?.totalBlogs || 0,
      icon: BookOpen,
      change: "+15.3%",
      changeType: "positive",
      description: "Published articles",
    },
    {
      title: "Research Papers",
      value: allInfo?.totalResearchPapers || 0,
      icon: FileText,
      change: "+5.7%",
      changeType: "positive",
      description: "Total submissions",
    },
    {
      title: "Approved Papers",
      value: allInfo?.totalApprovedPapers || 0,
      icon: CheckCircle,
      change: "+9.1%",
      changeType: "positive",
      description: "Accepted for publication",
    },
    {
      title: "Pending Papers",
      value: allInfo?.totalPendingPapers || 0,
      icon: Clock,
      change: "-2.3%",
      changeType: "negative",
      description: "Under review",
    },
  ];

  const approvalRate = allInfo?.totalResearchPapers
    ? (
        ((allInfo.totalApprovedPapers || 0) / allInfo.totalResearchPapers) *
        100
      ).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Research Analytics
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Advanced insights and performance metrics
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70 mb-1">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {approvalRate}%
                    </p>
                    <p className="text-xs text-primary/60 mt-1">
                      Paper approval rate
                    </p>
                  </div>
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-foreground/70 mb-1">
                      Productivity
                    </p>
                    <p className="text-3xl font-bold text-secondary-foreground">
                      {(allInfo?.totalBlogs || 0) +
                        (allInfo?.totalResearchPapers || 0)}
                    </p>
                    <p className="text-xs text-secondary-foreground/60 mt-1">
                      Total content created
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-full">
                    <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-foreground/70 mb-1">
                      Engagement
                    </p>
                    <p className="text-3xl font-bold text-accent-foreground">
                      {(
                        ((allInfo?.totalResearchMembers || 0) /
                          (allInfo?.totalUsers || 1)) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                    <p className="text-xs text-accent-foreground/60 mt-1">
                      User participation
                    </p>
                  </div>
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card
              key={metric.title}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <TrendingUp
                      className={`h-4 w-4 ${
                        metric.changeType === "negative" ? "rotate-180" : ""
                      }`}
                    />
                    {metric.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {metric.title}
                  </h3>
                  <p className="text-3xl font-bold">
                    {metric.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced Analytics Section */}
        <div className="grid gap-6 mb-8">
          {/* Performance Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient
                      id="colorPrimary"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorPrimary)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Side by Side Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Paper Status Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">
                  Research Paper Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paperStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paperStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Personal vs System Comparison */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">
                  Personal vs System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={personalVsSystemData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                    />
                    <YAxis
                      fontSize={12}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="personal"
                      fill="hsl(var(--primary))"
                      name="Your Contribution"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="system"
                      fill="hsl(var(--secondary))"
                      name="Total System"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personal Insights Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold">
              Personal Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-3">
                <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl inline-block">
                  <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Approved Papers
                  </p>
                  <p className="text-4xl font-bold text-emerald-600 mt-2">
                    {result?.totalApprovedPapers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(
                      ((result?.totalApprovedPapers || 0) /
                        (allInfo?.totalApprovedPapers || 1)) *
                      100
                    ).toFixed(1)}
                    % of total approved
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl inline-block">
                  <Clock className="h-8 w-8 text-amber-600 mx-auto" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Pending Papers
                  </p>
                  <p className="text-4xl font-bold text-amber-600 mt-2">
                    {result?.totalPendingPapers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(
                      ((result?.totalPendingPapers || 0) /
                        (allInfo?.totalPendingPapers || 1)) *
                      100
                    ).toFixed(1)}
                    % of total pending
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl inline-block">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Published Blogs
                  </p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">
                    {result?.totalBlogs || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(
                      ((result?.totalBlogs || 0) / (allInfo?.totalBlogs || 1)) *
                      100
                    ).toFixed(1)}
                    % of total blogs
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashBoardLayout;
