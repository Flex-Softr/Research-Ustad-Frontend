"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEvent, updateEvent, Event } from "@/services/events/eventSlice";
import { AppDispatch } from "@/store/store";
import { Plus, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

interface EventFormProps {
  event?: Event;
  onSave: (event: Event) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const EventForm = ({
  event,
  onSave,
  onCancel,
  isEditing = false,
}: EventFormProps) => {
  console.log("editingfdsaf", event);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.startDate || "",
      endDate: event?.endDate || "",
      location: event?.location || "",
      attendees: event?.attendees || 0,
      maxAttendees: event?.maxAttendees || 100,
      status: event?.status || "upcoming",
      category: event?.category || "",
      imageUrl: event?.imageUrl || "", // ✅ fixed
      registrationLink: event?.registrationLink || "",
      eventDuration: event?.eventDuration || 60, // ✅ added
      speakers: event?.speakers || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "speakers",
  });

  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // const onSubmit = async (data: Event) => {
  //   try {
  //     // Create FormData for multipart/form-data
  //     const formData = new FormData();

  //     if (selectedFile) {
  //       formData.append("file", selectedFile);
  //     }
  //     // Append the rest of the event data as JSON string
  //     formData.append("data", JSON.stringify(data));

  //     // Dispatch with FormData instead of plain JSON
  //     const result = await dispatch(addEvent(formData)).unwrap();

  //     toast.success("Event created successfully!");
  //     onSave(result);
  //     reset();
  //     setSelectedFile(null);
  //   } catch (error: any) {
  //     toast.error(error || "Failed to add event");
  //   }
  // };

  const onSubmit = async (data: Event) => {
    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("data", JSON.stringify(data));

      let result;
      if (isEditing && event?._id) {
        result = await dispatch(
          updateEvent({ _id: event._id, formData })
        ).unwrap();
        toast.success("Event updated successfully!");
      } else {
        result = await dispatch(addEvent(formData)).unwrap();
        toast.success("Event created successfully!");
      }

      onSave(result);
      reset();
      setSelectedFile(null);
    } catch (error: any) {
      toast.error(error || "Failed to save event");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" {...register("title", { required: true })} />
              {errors.title && (
                <p className="text-sm text-red-500">Title is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <p className="text-sm text-red-500">Category is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate", { required: true })}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">Start date is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate", { required: true })}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">End date is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDuration">Event Duration (in minutes)</Label>
              <Input
                type="number"
                id="eventDuration"
                {...register("eventDuration", { required: true })}
              />
              {errors.eventDuration && (
                <p className="text-sm text-red-500">
                  Event duration is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <p className="text-sm text-red-500">Location is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                type="number"
                id="maxAttendees"
                {...register("maxAttendees", { required: true })}
              />
              {errors.maxAttendees && (
                <p className="text-sm text-red-500">Required</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">Description is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Replace the imageUrl input with a file input */}
            <div className="space-y-2">
              <Label htmlFor="file">Upload Image</Label>
              <Input type="file" id="file" onChange={onFileChange} />
            </div>
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            )}

            <div className="space-y-2">
              <Label htmlFor="registrationLink">Registration Link</Label>
              <Input id="registrationLink" {...register("registrationLink")} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Speakers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ name: "", bio: "", imageUrl: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Speaker {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Speaker name"
                    {...register(`speakers.${index}.name`, { required: true })}
                  />
                  <Input
                    placeholder="Speaker bio"
                    {...register(`speakers.${index}.bio`)}
                  />
                  <Input
                    placeholder="Image URL"
                    {...register(`speakers.${index}.imageUrl`)}
                  />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEditing ? "Update Event" : "Create Event"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
