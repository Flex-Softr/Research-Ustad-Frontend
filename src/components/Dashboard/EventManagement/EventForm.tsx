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
import { CustomEvent, EventFormProps } from "@/type/event";
import { formatDateForInput } from "@/lib/dateUtils";
import { EventAgendaSection } from "./EventAgendaSection";

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
    watch,
    setValue,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<CustomEvent>({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      agenda: event?.agenda || "",
      startDate: formatDateForInput(event?.startDate),
      endDate: formatDateForInput(event?.endDate),
      location: event?.location || "",
      maxAttendees: event?.maxAttendees || 100,
      status: event?.status || "upcoming",
      category: event?.category || "",
      imageUrl: event?.imageUrl || "",
      registrationLink: event?.registrationLink || "",
      eventDuration: event?.eventDuration || 60,
      registrationFee: event?.registrationFee || 0,
      registered: event?.registered || 0,
      speakers: event?.speakers || [],
    },
    mode: "onChange",
  });

  // Add validation for agenda field
  const agenda = watch("agenda");
// Show error only if field is touched or form is submitted
const agendaError =
  (touchedFields.agenda || isSubmitted) &&
  (!agenda || agenda.trim().length < 50)
    ? "Event agenda must be at least 50 characters"
    : undefined;
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
  const onSubmit = async (data: CustomEvent) => {
    try {
      // Validate agenda
      if (!data.agenda || data.agenda.trim().length < 50) {
        toast.error("Event agenda must be at least 50 characters");
        return;
      }

      // Validate that at least one speaker is added
      if (!data.speakers || data.speakers.length === 0) {
        toast.error("At least one speaker is required");
        return;
      }

      // Validate that all speakers have required fields
      const invalidSpeakers = data.speakers.filter(
        speaker => !speaker.name.trim() || !speaker.bio.trim()
      );
      
      if (invalidSpeakers.length > 0) {
        toast.error("All speakers must have a name and bio");
        return;
      }

      // Validate maxAttendees vs registered
      if (data.maxAttendees < data.registered) {
        toast.error("Max attendees cannot be less than currently registered attendees");
        return;
      }

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

      // Prepare speakers data with imageUrl field
      const speakersData = data.speakers.map((speaker) => ({
        name: speaker.name.trim(),
        bio: speaker.bio.trim(),
        imageUrl: speaker.imageUrl || '', // Include imageUrl field
      }));

      const eventData = {
        ...data,
        speakers: speakersData,
        eventDuration: Number(data.eventDuration),
        maxAttendees: Number(data.maxAttendees),
        registered: Number(data.registered),
        registrationFee: Number(data.registrationFee),
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
        reset();
        toast.success("Event created successfully!");
      }

      onSave(result);
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
              <Input 
                id="title" 
                {...register("title", { 
                  required: "Title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" }
                })} 
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", { 
                  required: "Category is required",
                  minLength: { value: 2, message: "Category must be at least 2 characters" }
                })}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
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
                min="1"
                max="1440"
                {...register("eventDuration", { 
                  required: "Event duration is required",
                  min: { value: 1, message: "Duration must be at least 1 minute" },
                  max: { value: 1440, message: "Duration cannot exceed 24 hours" }
                })}
              />
              {errors.eventDuration && (
                <p className="text-sm text-red-500">
                  {errors.eventDuration.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                type="number"
                id="maxAttendees"
                min="1"
                max="10000"
                {...register("maxAttendees", { 
                  required: "Max attendees is required",
                  min: { value: 1, message: "Must have at least 1 attendee" },
                  max: { value: 10000, message: "Cannot exceed 10,000 attendees" },
                  validate: (value) => {
                    const registeredValue = watch("registered");
                    return Number(value) >= Number(registeredValue) || 
                           "Max attendees cannot be less than currently registered attendees";
                  }
                })}
              />
              {errors.maxAttendees && (
                <p className="text-sm text-red-500">{errors.maxAttendees.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registered">Currently Registered</Label>
              <Input
                type="number"
                id="registered"
                min="0"
                {...register("registered", { 
                  required: "Registered count is required",
                  min: { value: 0, message: "Registered count cannot be negative" },
                  validate: (value) => {
                    const maxAttendeesValue = watch("maxAttendees");
                    return Number(value) <= Number(maxAttendeesValue) || 
                           "Registered attendees cannot exceed max attendees";
                  }
                })}
              />
              {errors.registered && (
                <p className="text-sm text-red-500">{errors.registered.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationFee">Registration Fee ($)</Label>
              <Input
                type="number"
                id="registrationFee"
                min="0"
                step="0.01"
                placeholder="0 for free events"
                {...register("registrationFee", { 
                  required: "Registration fee is required",
                  min: { value: 0, message: "Registration fee cannot be negative" }
                })}
              />
              {errors.registrationFee && (
                <p className="text-sm text-red-500">{errors.registrationFee.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Event Status</Label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register("status", { 
                  required: "Status is required"
                })}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location", { 
                required: "Location is required",
                minLength: { value: 3, message: "Location must be at least 3 characters" }
              })}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { 
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" }
              })}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Event Agenda Section */}
          <EventAgendaSection
            agenda={agenda}
            onChange={(value) => setValue("agenda", value)}
            error={agendaError}
          />

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
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  type="url"
                  placeholder="https://example.com/register"
                  {...register("registrationLink", { 
                    required: "Registration link is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL starting with http:// or https://"
                    }
                  })}
                />
                {errors.registrationLink && (
                  <p className="text-sm text-red-500">
                    {errors.registrationLink.message}
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
                        required: "Speaker name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                    />
                    {errors.speakers?.[index]?.name && (
                      <p className="text-sm text-red-500">
                        {errors.speakers[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Speaker bio"
                      {...register(`speakers.${index}.bio`, { 
                        required: "Speaker bio is required",
                        minLength: { value: 10, message: "Bio must be at least 10 characters" }
                      })}
                    />
                    {errors.speakers?.[index]?.bio && (
                      <p className="text-sm text-red-500">
                        {errors.speakers[index]?.bio?.message}
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
