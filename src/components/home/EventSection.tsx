"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchEvents } from "@/services/events/eventSlice";

import { Calendar, MapPin, Users, Star, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeader, Button } from "@/components/ui/core";
import { Skeleton } from "@/components/ui/skeleton";
import FallbackImage from "../shared/FallbackImage";
import UserAvatar from "@/components/shared/UserAvatar";

// Skeleton component for event cards
const EventCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="relative h-48 overflow-hidden">
      <Skeleton className="w-full h-full bg-gray-200" />
      <div className="absolute top-4 left-4">
        <Skeleton className="w-20 h-6 rounded-full bg-gray-300" />
      </div>
      <div className="absolute top-4 right-4">
        <Skeleton className="w-12 h-12 rounded-lg bg-gray-300" />
      </div>
    </div>

    {/* Content skeleton */}
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300" />
      <Skeleton className="h-4 w-full mb-2 bg-gray-300" />
      <Skeleton className="h-4 w-2/3 mb-6 bg-gray-300" />

      {/* Event details skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-32 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-24 bg-gray-300" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 rounded-full mr-3 bg-gray-300" />
          <Skeleton className="h-4 w-20 bg-gray-300" />
        </div>
      </div>

      {/* Speakers skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex -space-x-2">
          <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* CTA skeleton */}
      <Skeleton className="w-full h-12 rounded-lg bg-gray-300" />
    </div>
  </div>
);

// Event card component
const EventCard = ({ event }: { event: any }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <FallbackImage
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#3A5A78] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="text-[#3A5A78] text-xs font-bold text-center">
              {new Date(event.startDate).getDate()}
            </div>
            <div className="text-gray-500 text-xs text-center">
              {new Date(event.startDate).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold font-serif text-[#3A5A78] mb-3 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-[#3A5A78] mr-3" />
            <span className="font-medium">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-[#3A5A78] mr-3" />
            <span className="font-medium">{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 text-[#3A5A78] mr-3" />
            <span className="font-medium">
              {event.speakers?.length || 0} Speakers
            </span>
          </div>
        </div>

        {/* Speakers */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex -space-x-2">
            {event.speakers
              ?.slice(0, 3)
              .map((speaker: any, speakerIndex: number) => (
                <UserAvatar
                  key={speakerIndex}
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  name={speaker.name}
                  size="sm"
                  className="border-2 border-white shadow-lg"
                  fallbackClassName="bg-[#3A5A78] text-white"
                />
              ))}
            {event.speakers && event.speakers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-[#3A5A78]/20 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-[#3A5A78] font-bold">
                  +{event.speakers.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/event/${event._id}`}
          className="block w-full bg-[#3A5A78] text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-[#2d4a65] transition-colors duration-300"
        >
          View Event Details
        </Link>
      </div>
    </div>
  );
};

// Error state component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <section className="py-20 bg-white">
    <Container>
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#3A5A78] mb-2">
          Failed to load events
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </Container>
  </section>
);

// Loading state component
const LoadingState = () => (
  <section className="py-20 bg-white">
    <Container>
      <SectionHeader
        title="Upcoming Events"
        description="Join our community events and connect with fellow researchers and industry experts."
      />
      {/* Skeleton grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  </section>
);

// Empty state component
const EmptyState = () => (
  <section className="py-20 bg-white">
    <Container>
      <div className="text-center">
        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#3A5A78] mb-2">
          No events available
        </h3>
        <p className="text-gray-600">Check back later for upcoming events!</p>
      </div>
    </Container>
  </section>
);

// Main EventsSection component
const EventsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, error } = useSelector(
    (state: RootState) => state.event
  );

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  console.log("eventsss", events);

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => dispatch(fetchEvents())} />;
  }

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // No events state
  if (!events || events.length === 0) {
    return <EmptyState />;
  }

  // Get featured events (first 3 events)
  const featuredEvents = events.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Upcoming Events"
          description="Join our community events and connect with fellow researchers and industry experts."
        />

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Link href="/event">
            <Button variant="primary">View All Events</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default EventsSection;
