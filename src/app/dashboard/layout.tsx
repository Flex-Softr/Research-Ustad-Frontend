"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/module/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/module/dashboard/sidebar/nav-user";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { JWTPayload } from "@/type";
import { dashboardNavItems } from "@/components/module/dashboard/sidebar/nav-items";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await getCurrentUser();
        if (!userInfo) {
          router.push("/login?redirectPath=/dashboard");
          return;
        }
        setUser(userInfo as JWTPayload);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login?redirectPath=/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  // Get user role from JWT payload
  const userRole = (user as any).role || "agent"; // Default to agent if role not found

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Simple Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <NavMain userRole={userRole} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <NavUser />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
