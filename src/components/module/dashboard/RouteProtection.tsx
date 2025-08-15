"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/AuthService";
import { JWTPayload } from "@/type";
import { getFilteredNavItems } from "@/components/module/dashboard/sidebar/nav-items";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AlertTriangle, Shield } from "lucide-react";

interface RouteProtectionProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
}

export default function RouteProtection({
  children,
  requiredRoles = ["superadmin", "admin", "agent"],
  fallbackPath = "/dashboard",
}: RouteProtectionProps) {
  const router = useRouter();
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userInfo = await getCurrentUser();
        if (!userInfo) {
          router.push("/login");
          return;
        }

        const jwtPayload = userInfo as any;
        const userRole = jwtPayload.role || "agent";
        
        setUser(userInfo as JWTPayload);

        // Check if user has required role
        if (requiredRoles.includes(userRole)) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Access check error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [router, requiredRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Required roles: {requiredRoles.join(", ")}
          </p>
          <button
            onClick={() => router.push(fallbackPath)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
