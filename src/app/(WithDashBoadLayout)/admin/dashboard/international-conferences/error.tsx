"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="flex items-center space-x-2 text-red-600">
        <AlertTriangle className="h-8 w-8" />
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
      </div>
      <p className="text-gray-600 text-center max-w-md">
        {error.message || "An unexpected error occurred while loading international conferences."}
      </p>
      <div className="flex space-x-2">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.href = "/admin/dashboard"} variant="outline">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
