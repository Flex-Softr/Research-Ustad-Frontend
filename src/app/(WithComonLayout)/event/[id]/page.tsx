"use client";

import { useState, useEffect, use } from "react";
import { getEventById, type Event } from "@/services/events";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  EventHeader,
  EventImage,
  EventContent,
  EventSidebar,
  LoadingSpinner,
  EventNotFound,
} from "@/components/Event/single";

const EventSinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Events",
            href: "/event",
          },
          {
            label: event.title,
            current: false,
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <EventHeader event={event} />
            <EventImage event={event} />
            <EventContent event={event} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <EventSidebar event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSinglePage;
