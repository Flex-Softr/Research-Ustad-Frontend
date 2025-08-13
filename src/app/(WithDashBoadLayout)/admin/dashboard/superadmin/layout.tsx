"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetMe } from "@/services/singleUser";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const result = await GetMe();
        const userRole = result?.data?.role;

        if (userRole === "superAdmin") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          toast.error("Access denied. Only SuperAdmin users can access this page.");
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        setIsAuthorized(false);
        toast.error("Error checking authorization. Redirecting to dashboard.");
        router.push("/admin/dashboard");
      }
    };

    checkAuthorization();
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" variant="border" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to dashboard
  }

  return <>{children}</>;
}
