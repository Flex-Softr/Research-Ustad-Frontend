"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { type Event } from "@/services/events";

interface EventSidebarProps {
  event: Partial<Event>; // 👈 Accept partial Event object to allow missing fields
}

const EventSidebar = ({ event }: EventSidebarProps) => {
  const getEventStatus = (event: Partial<Event>) => {
    const now = new Date();
    const startDate = event?.startDate ? new Date(event.startDate) : null;

    if (startDate && startDate > now) {
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

  const statusInfo = getEventStatus(event);
  const registered = event?.registered ?? 0;
  const capacity = event?.capacity ?? 100;
  const registrationPercentage = Math.round((registered / capacity) * 100);

  return (
    <div className="space-y-6">
      {/* Event Information Card */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Event Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <DollarSign className="h-5 w-5 text-brand-secondary" />
              <span className="text-3xl font-bold text-brand-secondary">
                {event?.price ?? "Free"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Registration Fee</p>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-brand-secondary" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-sm text-gray-600">
                  {event?.startDate
                    ? new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                  {event?.startDate &&
                    event?.endDate &&
                    new Date(event.startDate).toDateString() !==
                      new Date(event.endDate).toDateString() && (
                      <>
                        {" "}
                        -{" "}
                        {new Date(event.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </>
                    )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-brand-secondary" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Event Duration</p>
                {/* <p className="text-sm text-gray-600">
                  {event?.startDate
                    ? new Date(event.startDate).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}{" "}
                  -{" "}
                  {event?.endDate
                    ? new Date(event.endDate).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p> */}
                {event?.eventDuration} min
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-brand-secondary" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">
                  {event?.location ?? "TBA"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-brand-secondary" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Speakers</p>
                <p className="text-sm text-gray-600">
                  {event?.speakers?.length ?? 0} featured speakers
                </p>
              </div>
            </div>
          </div>

          {/* Registration Progress */}
          {statusInfo.status === "upcoming" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">Registration</span>
                <span className="text-gray-600">
                  {registered}/{capacity}
                </span>
              </div>
              <Progress
                value={registrationPercentage}
                className="h-2"
                // removed indicatorClassName if not used by your Progress component
              />
              <p className="text-xs text-gray-500 text-center">
                {capacity - registered} spots remaining
              </p>
            </div>
          )}

          {/* Status */}
          <div className="text-center">
            <p className={`text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </p>
          </div>

          {/* Registration Button */}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
            disabled={statusInfo.status === "past"}
          >
            <a
              href={event?.registrationLink ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {statusInfo.status === "upcoming"
                ? "Register Now"
                : "Event Ended"}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By registering, you agree to our terms and conditions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">
            Event Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Category</span>
            <span className="font-medium text-gray-900">
              {event?.category ?? "General"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span
              className={`font-medium ${
                statusInfo.status === "upcoming"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {statusInfo.status === "upcoming" ? "Upcoming" : "Past"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Capacity</span>
            <span className="font-medium text-gray-900">{capacity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Registered</span>
            <span className="font-medium text-gray-900">{registered}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventSidebar;
