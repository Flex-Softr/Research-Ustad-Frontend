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
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
      ],
    },
    {
      title: "Manage Membar",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Create Membar",
          url: "/admin/dashboard/createassociate",
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
          title: "My ResearchPaper",
          url: "/admin/dashboard/myresearchpaper",
          icon: FileText,
        },
        {
          title: "Create ResearchPaper",
          url: "/admin/dashboard/createresearchPaper",
          icon: PenSquare,
        },
        {
          title: "Blog Post",
          url: "/admin/dashboard/blogpost",
          icon: PenSquare,
        },
        {
          title: "Show All Blog",
          url: "/admin/dashboard/allblog",
          icon: NotebookPen,
        },
        {
          title: "Profile",
          url: "/admin/dashboard/profile",
          icon: User,
        },
      ],
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
      name: "Design Engineering",
      url: "#",
      icon: Briefcase,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: Globe,
    },
    {
      name: "Travel",
      url: "#",
      icon: Globe,
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
      title: "Update Information",
      url: "/user/dashboard/updateinfo",
      icon: UserPlus,
    },
    {
      title: "My All Papers",
      url: "/user/dashboard/mypapers",
      icon: FileStack,
    },
    {
      title: "Post a Blog",
      url: "/user/dashboard/createblog",
      icon: PenSquare,
    },
    {
      title: "My All Blogs",
      url: "/user/dashboard/myallblog",
      icon: NotebookPen,
    },
    {
      title: "Add Research Paper",
      url: "/user/dashboard/addresearchpaper",
      icon: FileText,
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
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

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
      <Sidebar>
        <div className="px-4">
          <div className="w-full my-10 h-5 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-25 h-5 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="space-y-4 mt-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center space-x-3"
              >
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

  const data =
    user.role === "superAdmin" || user.role === "admin"
      ? adminRoute
      : userRoute;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <h2 className="font-bold text-[22px] flex">
                  Research{" "}
                  <span className="text-[#bc986b] hover:text-yellow-500">
                    Ustad
                  </span>
                </h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
