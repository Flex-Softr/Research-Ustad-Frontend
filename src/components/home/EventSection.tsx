"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchEvents } from "@/services/events/eventSlice";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight, Star, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/core";
import { Skeleton } from "@/components/ui/skeleton";

// Common background elements component
const BackgroundElements = () => (
  <>
    {/* Full-width gradient background with overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-brand-primary-900/90 to-slate-800/95"></div>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

    {/* Moving Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Large Floating Orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-green-400/25 to-brand-primary/25 rounded-full blur-2xl animate-bounce"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-brand-secondary/20 to-green-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "5s" }}
      ></div>

      {/* Additional Large Orbs */}
      <div
        className="absolute top-1/2 left-1/6 w-36 h-36 bg-gradient-to-br from-brand-primary/15 to-green-400/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/6 w-28 h-28 bg-gradient-to-br from-brand-secondary/25 to-brand-primary/25 rounded-full blur-xl animate-bounce"
        style={{ animationDuration: "3.5s", animationDelay: "1s" }}
      ></div>

      {/* Moving Lines - Enhanced */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-2 h-40 bg-gradient-to-b from-transparent via-brand-primary/40 to-transparent animate-pulse"></div>
        <div
          className="absolute top-1/3 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-brand-secondary/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-48 bg-gradient-to-b from-transparent via-green-400/35 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-1 h-24 bg-gradient-to-b from-transparent via-brand-primary/25 to-transparent animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-ping"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-2 h-2 bg-brand-primary/50 rounded-full animate-ping"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-brand-secondary/40 rounded-full animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-ping"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-ping"
          style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-brand-primary/35 rounded-full animate-ping"
          style={{ animationDuration: "2.8s", animationDelay: "0.8s" }}
        ></div>
      </div>

      {/* Enhanced Geometric Shapes */}
      <div
        className="absolute top-16 right-1/4 w-20 h-20 border-2 border-brand-primary/30 rotate-45 animate-spin"
        style={{ animationDuration: "25s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/3 w-16 h-16 border-2 border-brand-secondary/25 rotate-12 animate-spin"
        style={{ animationDuration: "18s", animationDirection: "reverse" }}
      ></div>
      <div
        className="absolute top-1/3 left-1/6 w-12 h-12 border border-green-400/20 rotate-30 animate-spin"
        style={{ animationDuration: "22s" }}
      ></div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-4 h-4 text-brand-primary/40 animate-ping">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute bottom-1/3 right-1/6 w-3 h-3 text-brand-secondary/50 animate-ping"
          style={{ animationDelay: "1s" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div
          className="absolute top-2/3 left-1/4 w-3.5 h-3.5 text-green-400/40 animate-ping"
          style={{ animationDelay: "2s" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      {/* Enhanced Wave Effects */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-primary/8 via-transparent to-transparent animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-secondary/5 via-transparent to-transparent animate-pulse"
        style={{ animationDuration: "7s", animationDelay: "2s" }}
      ></div>
    </div>
  </>
);

// Header section component
const HeaderSection = ({ title = "Connect", subtitle = "& Collaborate", description = "Join our community events and connect with fellow researchers and industry experts." }) => (
  <div className="text-center py-6 relative z-10">
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg hover:bg-white/15 transition-all duration-300 group">
      <Star className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      Upcoming Events
    </div>
    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary animate-pulse">
        {title}
      </span>
      <br />
      <span className="text-white">{subtitle}</span>
    </h2>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      {description}
    </p>

    {/* Modern Decorative Elements */}
    <div className="flex justify-center items-center gap-4 mt-8">
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
      <div className="w-3 h-3 bg-brand-secondary rounded-full animate-ping shadow-lg shadow-brand-secondary/50"></div>
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-secondary to-transparent"></div>
    </div>
  </div>
);

// Skeleton component for event cards
const EventCardSkeleton = () => (
  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="relative h-48 overflow-hidden">
      <Skeleton className="w-full h-full bg-gray-600" />
      <div className="absolute top-4 left-4">
        <Skeleton className="w-20 h-6 rounded-full bg-gray-500" />
      </div>
      <div className="absolute top-4 right-4">
        <Skeleton className="w-12 h-12 rounded-lg bg-gray-500" />
      </div>
    </div>

    {/* Content skeleton */}
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-1 h-6 bg-gray-500 rounded-full" />
        <Skeleton className="h-6 w-3/4 bg-gray-500" />
        <Skeleton className="w-1 h-6 bg-gray-500 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mb-2 bg-gray-500" />
      <Skeleton className="h-4 w-2/3 mb-6 bg-gray-500" />

      {/* Event details skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-3 bg-gray-500" />
          <Skeleton className="h-4 w-32 bg-gray-500" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-3 bg-gray-500" />
          <Skeleton className="h-4 w-24 bg-gray-500" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-3 bg-gray-500" />
          <Skeleton className="h-4 w-20 bg-gray-500" />
        </div>
      </div>

      {/* Speakers skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex -space-x-2">
          <Skeleton className="w-8 h-8 rounded-full bg-gray-500" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-500" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-500" />
        </div>
      </div>

      {/* CTA skeleton */}
      <Skeleton className="w-full h-12 rounded-lg bg-gray-500" />
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
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-primary/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-secondary/0 group-hover:from-brand-primary/8 group-hover:to-brand-secondary/8 transition-all duration-700 rounded-2xl"></div>

      {/* Floating Elements on Card */}
      <div
        className="absolute top-4 right-4 w-2 h-2 bg-brand-primary/60 rounded-full animate-ping"
        style={{ animationDuration: "2s" }}
      ></div>
      <div
        className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-brand-secondary/50 rounded-full animate-ping"
        style={{ animationDuration: "3s", animationDelay: "1s" }}
      ></div>
      
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl || ""}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Image Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10 group-hover:from-brand-primary/20 group-hover:to-brand-secondary/20 transition-all duration-500"></div>

        {/* Floating Elements on Image */}
        <div
          className="absolute top-2 right-2 w-1 h-1 bg-white/80 rounded-full animate-ping"
          style={{ animationDuration: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-brand-primary/70 rounded-full animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        ></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/30 shadow-lg">
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30 shadow-lg">
            <div className="text-white text-xs font-bold text-center">
              {new Date(event.startDate).getDate()}
            </div>
            <div className="text-white/80 text-xs text-center">
              {new Date(event.startDate).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Content Header Decoration */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-gradient-to-b from-brand-primary to-brand-secondary rounded-full"></div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {event.title}
          </h3>
          <div className="w-1 h-6 bg-gradient-to-b from-brand-secondary to-green-400 rounded-full"></div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-300">
            <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
              <Calendar className="h-3 w-3 text-purple-300" />
            </div>
            <span className="font-medium">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-300">
            <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center mr-3">
              <MapPin className="h-3 w-3 text-pink-300" />
            </div>
            <span className="font-medium">{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-300">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
              <Users className="h-3 w-3 text-blue-300" />
            </div>
            <span className="font-medium">
              {event.speakers?.length || 0} Speakers
            </span>
          </div>
        </div>

        {/* Speakers */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex -space-x-2">
            {event.speakers?.slice(0, 3).map((speaker: any, speakerIndex: number) => (
              <img
                key={speakerIndex}
                src={speaker.imageUrl || ""}
                alt={speaker.name}
                className="w-8 h-8 rounded-full border-2 border-white/20 shadow-lg"
              />
            ))}
            {event.speakers && event.speakers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-white/20 flex items-center justify-center">
                <span className="text-xs text-purple-300 font-bold">
                  +{event.speakers.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/event/${event._id}`}
          className="group/btn relative block w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white py-3 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-primary/30 border-0 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
          style={{
            borderRadius: "0.75rem 0 0.75rem 0",
          }}
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            View Event Details
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-brand-secondary/30 rounded-tr-full"></div>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

// Error state component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <section className="w-full bg-gradient-to-br from-brand-primary-900 via-green-900 to-slate-800 relative overflow-hidden">
    <BackgroundElements />
    <Container>
      <div className="text-center py-16">
        <HeaderSection />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Failed to load events
            </h3>
            <p className="text-gray-300 mb-4">{error}</p>
            <Button
              onClick={onRetry}
              className="bg-brand-primary hover:bg-brand-secondary text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// Loading state component
const LoadingState = () => (
  <section className="w-full bg-gradient-to-br from-brand-primary-900 via-green-900 to-slate-800 relative overflow-hidden">
    <BackgroundElements />
    <Container>
      <HeaderSection />
      {/* Skeleton grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 relative z-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  </section>
);

// Empty state component
const EmptyState = () => (
  <section className="w-full bg-gradient-to-br from-brand-primary-900 via-green-900 to-slate-800 relative overflow-hidden">
    <BackgroundElements />
    <Container>
      <div className="text-center py-16">
        <HeaderSection />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No events available
            </h3>
            <p className="text-gray-300">
              Check back later for upcoming events!
            </p>
          </div>
        </div>
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
    <section className="w-full bg-gradient-to-br from-brand-primary-900 via-green-900 to-slate-800 relative overflow-hidden">
      <BackgroundElements />
      <Container>
        <HeaderSection />
        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 relative z-10">
          {featuredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EventsSection;
