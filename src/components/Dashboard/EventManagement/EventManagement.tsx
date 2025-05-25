"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, MapPin, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import EventForm from "./EventForm";

const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "Annual technology conference featuring industry leaders",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    location: "San Francisco, CA",
    attendees: 150,
    maxAttendees: 200,
    status: "upcoming",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    speakers: [
      {
        name: "John Doe",
        bio: "Tech Expert",
        imageUrl: "https://example.com/john.jpg",
      },
    ],
    registrationLink: "https://example.com/register",
  },
  {
    id: 2,
    title: "Startup Summit",
    description: "Connect with entrepreneurs and investors",
    startDate: "2025-04-20",
    endDate: "2025-04-20",
    location: "Online",
    attendees: 89,
    maxAttendees: 100,
    status: "active",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    speakers: [],
    registrationLink: "https://example.com/startup",
  },
  {
    id: 3,
    title: "Design Workshop",
    description: "Learn advanced design principles and techniques",
    startDate: "2025-03-10",
    endDate: "2025-03-10",
    location: "New York, NY",
    attendees: 25,
    maxAttendees: 30,
    status: "completed",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    speakers: [],
    registrationLink: "https://example.com/design",
  },
];

const EventManagement = () => {
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? { ...eventData, id: editingEvent.id }
            : event
        )
      );
    } else {
      const newEvent = { ...eventData, id: Date.now(), attendees: 0 };
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
    setEditingEvent(null);
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
        {events.map((event) => (
          <Card
            key={event.id}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge
                className={`absolute top-3 left-3 ${getStatusColor(
                  event.status
                )}`}
              >
                {event.status}
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
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
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
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
