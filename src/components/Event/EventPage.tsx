"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { fetchEvents } from "@/services/events/eventSlice";
import { getEventStatus } from "@/lib/getEventStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Pagination from "../shared/Pagination";
import { EventPageSkeleton } from "./EventCardSkeleton";

const EventPage = () => {
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "ongoing" | "finished"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);


  const filteredEvents = events.filter((event) => {
    const statusInfo = getEventStatus(event);
    return filter === "all" || statusInfo.status === filter;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Breadcrumb
        items={[{ label: "Events" }]}
        className="py-4"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">All Events</h2>

        {isLoading ? (
          <EventPageSkeleton />
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div>
            <div className="mb-6 w-52">
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as typeof filter)}
              >
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="capitalize">
                    All
                  </SelectItem>
                  <SelectItem value="upcoming" className="capitalize">
                    Upcoming
                  </SelectItem>
                  <SelectItem value="ongoing" className="capitalize">
                    Ongoing
                  </SelectItem>
                  <SelectItem value="finished" className="capitalize">
                    Finished
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((event) => {
                const statusInfo = getEventStatus(event);
                return (
                  <Card key={event._id} className="overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="absolute top-4 left-4 bg-brand-secondary text-white px-3 py-1 rounded-full text-xs">
                        {event.category}
                      </span>
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs ${statusInfo.bgColor} ${statusInfo.color}`}
                      >
                        {statusInfo.status}
                      </span>
                    </div>

                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.startDate).toLocaleDateString()} -{" "}
                        {new Date(event.endDate).toLocaleDateString()}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.speakers.length} Speakers
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className={statusInfo.color}>
                          {statusInfo.text}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-lg font-bold text-brand-secondary">
                          {event.registrationFee === 0 ? "Free" : `${event.registrationFee} tk`}
                        </span>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-brand-primary to-brand-secondary"
                        >
                          <Link href={`/event/${event._id}`}>
                            {statusInfo.status === "upcoming"
                              ? "Register"
                              : "Details"}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {filteredEvents.length > itemsPerPage && (
          <div className="mt-6">
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalItems={filteredEvents.length}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
