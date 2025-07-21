"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Paper Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The research paper you're looking for could not be found or
                there was an error loading it.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
              >
                Try Again
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
              >
                <Link href="/allpapers">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Papers
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
