import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const EventCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="relative h-48">
      <Skeleton className="h-full w-full" />
      <div className="absolute top-4 left-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="absolute top-4 right-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>

    <CardHeader>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
    </CardHeader>

    <CardContent className="space-y-3">
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-28" />
      </div>

      <div className="flex items-center justify-between pt-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-10 w-24" />
      </div>
    </CardContent>
  </Card>
);

export const EventPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-8 w-32 mb-6" />
      
      <div className="mb-6 w-52">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);
