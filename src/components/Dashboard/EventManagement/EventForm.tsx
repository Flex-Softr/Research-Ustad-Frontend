"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addEvent, updateEvent } from "@/services/events/eventSlice";
import { AppDispatch } from "@/store/store";
import { Plus, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Event, EventFormProps } from "@/type";
import { formatDateForInput } from "@/lib/dateUtils";

const EventForm = ({
  event,
  onSave,
  onCancel,
  isEditing = false,
}: EventFormProps) => {
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
      startDate: formatDateForInput(event?.startDate),
      endDate: formatDateForInput(event?.endDate),
      location: event?.location || "",
      maxAttendees: event?.maxAttendees || 100,
      status: event?.status || "upcoming",
      category: event?.category || "",
      imageUrl: event?.imageUrl || "",
      registrationLink: event?.registrationLink || "",
      eventDuration: event?.eventDuration || 60,
      speakers: event?.speakers || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "speakers",
  });

  // State to hold the selected files
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [speakerFiles, setSpeakerFiles] = useState<{
    [key: number]: File | null;
  }>({});

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSpeakerFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setSpeakerFiles((prev) => ({
        ...prev,
        [index]: e.target.files![0],
      }));
    }
  };

  // create event
  const onSubmit = async (data: Event) => {
    try {
      const formData = new FormData();

      // Add main event image
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Add speaker images
      Object.entries(speakerFiles).forEach(([index, file]) => {
        if (file) {
          formData.append(`speakerFiles`, file);
        }
      });

      // Remove imageUrl from speakers data since we're using files
      const speakersWithoutImageUrl = data.speakers.map((speaker) => ({
        name: speaker.name,
        bio: speaker.bio,
        // imageUrl will be set by backend after file upload
      }));

      const eventData = {
        ...data,
        speakers: speakersWithoutImageUrl,
        eventDuration: Number(data.eventDuration),
        maxAttendees: Number(data.maxAttendees),
      };

      formData.append("data", JSON.stringify(eventData));

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
      setSpeakerFiles({});
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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

            <div className="space-y-2 w-full">
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

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Event Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Upload Event Image</Label>
                <Input
                  type="file"
                  id="file"
                  onChange={onFileChange}
                  accept="image/*"
                />
                {/* {isEditing && event?.imageUrl && !selectedFile && (
                <p className="text-sm text-gray-500 mt-1">
                  Current image will be replaced if you select a new file
                </p>
              )} */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  {...register("registrationLink", { required: true })}
                />
                {errors.registrationLink && (
                  <p className="text-sm text-red-500">
                    Registration link is required
                  </p>
                )}
              </div>
            </div>

            {/* Image Preview */}
            {selectedFile ? (
              <div className="w-full mt-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Event Preview"
                  className="w-full h-32 object-cover rounded"
                />
                <div className="text-sm text-gray-500">
                  <p>Selected: {selectedFile.name}</p>
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ) : isEditing && event?.imageUrl ? (
              <div className="mt-4">
                <img
                  src={event.imageUrl}
                  alt="Current Event Image"
                  className="w-full h-32 object-cover rounded"
                />
                <div className="text-sm text-gray-500">
                  {/* <p>Current image</p> */}
                </div>
              </div>
            ) : null}
          </div>

          {/* speaker section */}
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
                    onClick={() => {
                      remove(index);
                      // Remove the file from state when speaker is removed
                      setSpeakerFiles((prev) => {
                        const newFiles = { ...prev };
                        delete newFiles[index];
                        return newFiles;
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <Input
                      placeholder="Speaker name"
                      {...register(`speakers.${index}.name`, {
                        required: true,
                      })}
                    />
                    {errors.speakers?.[index]?.name && (
                      <p className="text-sm text-red-500">
                        Speaker name is required
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Speaker bio"
                      {...register(`speakers.${index}.bio`, { required: true })}
                    />
                    {errors.speakers?.[index]?.bio && (
                      <p className="text-sm text-red-500">
                        Speaker bio is required
                      </p>
                    )}
                  </div>
                </div>

                {/* Speaker Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor={`speaker-file-${index}`}>Speaker Image</Label>
                  <Input
                    type="file"
                    id={`speaker-file-${index}`}
                    onChange={(e) => onSpeakerFileChange(index, e)}
                    accept="image/*"
                  />
                  {/* {isEditing &&
                    event?.speakers?.[index]?.imageUrl &&
                    !speakerFiles[index] && (
                      <p className="text-sm text-gray-500 mt-1">
                        Current image will be replaced if you select a new file
                      </p>
                    )} */}

                  {/* Speaker Image Preview */}
                  {speakerFiles[index] ? (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(speakerFiles[index]!)}
                        alt={`Speaker ${index + 1} Preview`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="text-sm text-gray-500">
                        <p>Selected: {speakerFiles[index]!.name}</p>
                        <p>
                          Size:{" "}
                          {(speakerFiles[index]!.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  ) : isEditing && event?.speakers?.[index]?.imageUrl ? (
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={event.speakers[index].imageUrl}
                        alt={`Speaker ${index + 1} Current Image`}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ) : null}
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
