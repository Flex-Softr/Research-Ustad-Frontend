"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/AuthService";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push("/login?redirectPath=/(WithDashBoadLayout)/dashboard");
          return;
        }

        // Redirect to the dashboard layout route
        router.push("/(WithDashBoadLayout)/dashboard");
      } catch (error) {
        console.error("Redirect error:", error);
        router.push("/login?redirectPath=/(WithDashBoadLayout)/dashboard");
      }
    };

    redirectToDashboard();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
