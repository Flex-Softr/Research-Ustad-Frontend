"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Filter,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/shared/Pagination";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getPaginatedEvents,
  getEventCategories,
  type Event,
  type EventsFilter,
} from "@/services/events";

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(6);

  // Fetch paginated events from server
  const fetchEvents = async (page: number, filter: string = "all") => {
    setLoading(true);
    try {
      const filterParams: EventsFilter = {
        page,
        limit: itemsPerPage,
        status: filter === "all" ? "all" : (filter as "upcoming" | "past"),
      };

      const response = await getPaginatedEvents(filterParams);

      setEvents(response.events);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
      setCurrentPage(response.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    fetchEvents(1, filter);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchEvents(page, selectedFilter);
  };

  // Get event status info
  const getEventStatus = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.startDate);

    if (startDate > now) {
      const daysUntil = Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        status: "upcoming",
        text: `${daysUntil} days away`,
        color: "text-green-600",
      };
    } else {
      return {
        status: "past",
        text: "Event completed",
        color: "text-gray-500",
      };
    }
  };

  // Load initial data
  useEffect(() => {
    fetchEvents(currentPage, selectedFilter);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Events",
            current: true,
          },
        ]}
        className="py-8"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-brand-secondary" />
              <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-200">
                {[
                  { id: "all", label: "All Events" },
                  { id: "upcoming", label: "Upcoming" },
                  { id: "past", label: "Past" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              {selectedFilter === "all"
                ? "All Events"
                : selectedFilter === "upcoming"
                ? "Upcoming Events"
                : "Past Events"}
            </h3>
            <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-semibold">
              {totalItems} events
            </span>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {events.map((event) => {
                const statusInfo = getEventStatus(event);
                const registrationPercentage = Math.round(
                  (event.registered / event.capacity) * 100
                );

                return (
                  <Card
                    key={event.id}
                    className="group bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    {/* Event Image */}
                    <div className="relative overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-brand-secondary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            statusInfo.status === "upcoming"
                              ? "bg-green-500/90 text-white"
                              : "bg-gray-500/90 text-white"
                          }`}
                        >
                          {statusInfo.status === "upcoming"
                            ? "Upcoming"
                            : "Past"}
                        </span>
                      </div>

                      {/* Registration Progress */}
                      {statusInfo.status === "upcoming" && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center justify-between text-white text-xs mb-1">
                              <span>Registration</span>
                              <span>
                                {event.registered}/{event.capacity}
                              </span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-brand-secondary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${registrationPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Event Details */}
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-brand-secondary" />
                          <span>
                            {new Date(event.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                            {new Date(event.startDate).toDateString() !==
                              new Date(event.endDate).toDateString() && (
                              <>
                                {" "}
                                -{" "}
                                {new Date(event.endDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-brand-secondary" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-brand-secondary" />
                          <span>{event.speakers.length} Speakers</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-brand-secondary" />
                          <span className={statusInfo.color}>
                            {statusInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-brand-secondary">
                          {event.price}
                        </span>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
                        >
                          <Link href={`/event/${event.id}`}>
                            {statusInfo.status === "upcoming"
                              ? "Register Now"
                              : "View Details"}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
