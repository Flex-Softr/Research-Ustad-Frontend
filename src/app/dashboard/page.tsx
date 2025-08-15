"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/AuthService";
import { JWTPayload } from "@/type";
import LoadingSpinner from "@/components/ui/loading-spinner";
import AdminDashBoardLayout from "@/components/module/dashboard/Dcomponents/AdminDashBoardLayout";

export default function DashboardPage() {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getCurrentUser();
        setUser(userInfo as JWTPayload);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 text-lg">User not found</p>
          <p className="text-gray-500 mt-2">
            Please log in to access the dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.email}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Dashboard Content */}
      <AdminDashBoardLayout />
    </div>
  );
}
