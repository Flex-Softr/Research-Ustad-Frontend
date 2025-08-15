"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await getCurrentUser();
        setUser(userInfo);
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="font-semibold text-green-800">✅ Authenticated</h2>
              <p className="text-green-700 mt-2">
                User is logged in successfully!
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "N/A"}
              </p>
              <p>
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="font-semibold text-red-800">
                ❌ Not Authenticated
              </h2>
              <p className="text-red-700 mt-2">User is not logged in.</p>
            </div>

            <button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
