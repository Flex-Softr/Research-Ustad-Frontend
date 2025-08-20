"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import FallbackImage from "@/components/shared/FallbackImage";
import { Calendar, Edit, MapPin, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { deleteEvent, fetchEvents } from "@/services/events/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { getEventStatus } from "@/lib/getEventStatus";
import { formatDate } from "@/lib/dateUtils";

const EventManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  // event delete function------
  const handleDeleteEvent = (event: any) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        await dispatch(deleteEvent(eventToDelete._id)).unwrap();
        toast.success("Event deleted successfully!");
      } catch (err: any) {
        toast.error(err || "Failed to delete event");
      }
      setEventToDelete(null);
    }
    // Always close the dialog, regardless of success or error
    setDeleteDialogOpen(false);
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

  if (!events || events.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Events (0)</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center flex items-center justify-center flex-col">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                There are no events in the system yet. Create your first event
                to get started!
              </p>
              <Button
                onClick={handleAddEvent}
                className="flex items-center justify-center w-fit gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                Create First Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("events", events);

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
                <FallbackImage
                  src={event.imageUrl}
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

              <CardHeader>
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
                    <span>{formatDate(event.startDate)}</span>
                    {event.endDate !== event.startDate && (
                      <span> - {formatDate(event.endDate)}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{event.maxAttendees} Max attendees</span>
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
                    onClick={() => handleDeleteEvent(event)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Event"
        itemName={eventToDelete?.title}
        itemType="event"
      />
    </div>
  );
};

export default EventManagement;
