import { Button } from "@/components/ui/button";
import { Calendar, Home } from "lucide-react";
import Link from "next/link";

const EventNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-12 w-12 text-gray-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, the event you're looking for doesn't exist or may have been
          removed. Please check the URL or browse our other events.
        </p>

        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary"
          >
            <Link href="/event">
              <Calendar className="h-4 w-4 mr-2" />
              Browse All Events
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventNotFound;
