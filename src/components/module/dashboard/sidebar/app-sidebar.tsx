"use client";

import {
  Briefcase,
  CalendarCheck,
  FileStack,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  NotebookPen,
  PenSquare,
  SlidersHorizontal,
  User,
  UserPlus,
  Users,
  Home,
  Settings,
  LogOut,
  ChevronRight,
  X,
  Menu,
  BookOpen,
  FolderOpen,
  Clock,
  Crown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GetMe } from "@/services/singleUser";
import Link from "next/link";
import React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface User {
  _id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const adminRoute = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Manage Events",
      url: "/admin/dashboard/manageevent",
      icon: CalendarCheck,
    },
    {
      title: "Manage Courses",
      url: "/admin/dashboard/managecourse",
      icon: GraduationCap,
      items: [
        {
          title: "All Courses",
          url: "/admin/dashboard/managecourse/all-courses",
          icon: BookOpen,
        },
        {
          title: "Add Course",
          url: "/admin/dashboard/managecourse/add-course",
          icon: PenSquare,
        },
        {
          title: "Course Categories",
          url: "/admin/dashboard/managecourse/categories",
          icon: FolderOpen,
        },
      ],
    },
    {
      title: "Manage Blog",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "All Blogs",
          url: "/admin/dashboard/allblogs",
          icon: FileText,
        },
        {
          title: "Create Blogs",
          url: "/admin/dashboard/createblog",
          icon: PenSquare,
        },
      ],
    },
    {
      title: "Manage Research Paper",
      url: "#",
      icon: FileStack,
      items: [
        {
          title: "All Research Paper",
          url: "/admin/dashboard/allresearchpaper",
          icon: FileText,
        },
        {
          title: "Pending Research Paper",
          url: "/admin/dashboard/pendingresearchpaper",
          icon: Clock,
        },
        {
          title: "Create Research Paper",
          url: "/admin/dashboard/adminCreateResearchPaper",
          icon: PenSquare,
        },
      ],
    },
    {
      title: "Manage Members",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Create Member",
          url: "/admin/dashboard/createMember",
          icon: UserPlus,
        },
        {
          title: "All Users",
          url: "/admin/dashboard/allusers",
          icon: User,
        },
        {
          title: "Manage Members",
          url: "/admin/dashboard/members",
          icon: Users,
        },
      ],
    },
    {
      title: "Personal Working",
      url: "#",
      icon: SlidersHorizontal,
      items: [
        {
          title: "My Research Paper",
          url: "/admin/dashboard/myresearchpaper",
          icon: FileText,
        },
        {
          title: "My Blogs",
          url: "/admin/dashboard/myblogs",
          icon: NotebookPen,
        },
        {
          title: "Profile",
          url: "/admin/dashboard/profile",
          icon: User,
        },
        {
          title: "Update Profile",
          url: "/admin/dashboard/updateinfo",
          icon: UserPlus,
        },
      ],
    },
    {
      title: "SuperAdmin Management",
      url: "/admin/dashboard/superadmin",
      icon: Crown,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "#",
      icon: MessageSquare,
    },
  ],
  projects: [
    {
      name: "Research Platform",
      url: "#",
      icon: Briefcase,
    },
    {
      name: "Academic Network",
      url: "#",
      icon: Globe,
    },
    {
      name: "Publications",
      url: "#",
      icon: FileStack,
    },
  ],
};

const userRoute = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Blogs",
      url: "/user/dashboard/myallblog",
      icon: NotebookPen,
      items: [
        {
          title: "My All Blogs",
          url: "/user/dashboard/myallblog",
          icon: NotebookPen,
        },
        {
          title: "Post a Blog",
          url: "/user/dashboard/createblog",
          icon: PenSquare,
        },
      ],
    },
    {
      title: "Research Paper",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "My All Research Papers",
          url: "/user/dashboard/mypapers",
          icon: FileStack,
        },
        {
          title: "Add Research Paper",
          url: "/user/dashboard/addresearchpaper",
          icon: FileText,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: SlidersHorizontal,
      items: [
        {
          title: "Profile",
          url: "/user/dashboard/profileinfo",
          icon: User,
        },
        {
          title: "Update Profile",
          url: "/user/dashboard/updateinfo",
          icon: UserPlus,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMe();
        setUser(result?.data || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Sidebar className="border-r border-gray-200 bg-white">
        <div className="px-4 py-6">
          <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
    );
  }

  if (!user) return null;

  // Create admin route with conditional SuperAdmin management
  const adminRouteWithSuperAdmin = {
    ...adminRoute,
    navMain:
      user.role === "superAdmin"
        ? [...adminRoute.navMain]
        : adminRoute.navMain.filter(
            (item) => item.title !== "SuperAdmin Management"
          ),
  };

  const data =
    user.role === "superAdmin" || user.role === "admin"
      ? adminRouteWithSuperAdmin
      : userRoute;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white"
      {...props}
    >
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Link href="/">
                <GraduationCap className="w-5 h-5 text-white" />
              </Link>
            </div>
            {!isCollapsed && (
              <div>
                <Link href="/">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Research Ustad
                  </h2>
                </Link>

                <p className="text-xs text-gray-500 capitalize">
                  {user.role} Dashboard
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <NavMain items={data.navMain} />
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
