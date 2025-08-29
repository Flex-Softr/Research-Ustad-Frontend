"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Paper page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Paper Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">
            The research paper you're looking for could not be found or may have been removed.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={reset}
              className="w-full bg-brand-primary hover:bg-brand-secondary transition-colors"
            >
              Try Again
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/allpapers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Papers
              </Link>
            </Button>
            
            <Button
              asChild
              variant="ghost"
              className="w-full"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
