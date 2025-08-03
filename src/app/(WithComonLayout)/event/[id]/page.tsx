"use client";

import { use } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSingleEvent } from "@/services/events/eventSlice";
import {
  EventHeader,
  EventImage,
  EventContent,
  EventSidebar,
  LoadingSpinner,
  EventNotFound,
} from "@/components/Event/single";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { CustomEvent } from "@/type/event";

const EventSinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // ✅ unwrap dynamic route param
  const dispatch = useDispatch<AppDispatch>();
  const { event, isLoading, error } = useSelector(
    (state: RootState) => state.event
  );

  // Type assertion to ensure event is CustomEvent
  const typedEvent = event as CustomEvent | null;

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id));
    }
  }, [id, dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !typedEvent) return <EventNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* ✅ Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Events", href: "/event" },
          { label: typedEvent.title, current: true },
        ]}
      />

      {/* ✅ Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Main Event Info */}
          <div className="lg:col-span-2 space-y-8">
            <EventHeader event={typedEvent} />
            <EventImage event={typedEvent} />
            <EventContent event={typedEvent} />
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <EventSidebar event={typedEvent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSinglePage;
