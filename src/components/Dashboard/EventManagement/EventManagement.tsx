"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, MapPin, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { deleteEvent, fetchEvents } from "@/services/events/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { getEventStatus } from "@/lib/getEventStatus";

const EventManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  console.log("event management page", events);

  const getAttendanceColor = (attendees: number, maxAttendees: number) => {
    const percentage = (attendees / maxAttendees) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  // event delete funtion------
  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(eventId)).unwrap();
        toast.success("Event deleted successfully!");
      } catch (err: any) {
        toast.error(err || "Failed to delete event");
      }
    }
  };

  const handleSaveEvent = () => {
    setShowForm(false);
    setEditingEvent(null);
    dispatch(fetchEvents()); // Refresh event list after saving
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelForm}
          isEditing={!!editingEvent}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600">Organize and track your events</p>
        </div>
        <Button
          onClick={handleAddEvent}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const statusInfo = getEventStatus(event); // ✅ real-time status
          return (
            <Card
              key={event._id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000${event.imageUrl}`}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge
                  className={`absolute top-3 left-3 ${statusInfo.bgColor} ${statusInfo.color}`}
                >
                  {statusInfo.status}
                </Badge>
                <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                  {event.category}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">
                  {event.title}
                </CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString()}
                    </span>
                    {event.endDate !== event.startDate && (
                      <span>
                        {" "}
                        - {new Date(event.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span
                      className={getAttendanceColor(
                        event.attendees,
                        event.maxAttendees
                      )}
                    >
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EventManagement;
