"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createEvents } from "@/services/events";

interface Speaker {
  name: string;
  bio: string;
  imageFile?: FileList;
  imageUrl?: string;
}

interface EventData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  speakers: Speaker[];
  eventImage: FileList;
  registrationLink: string;
  category: string;
}

const CreateEvents: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventData>();

  const { fields: speakerFields, append, remove } = useFieldArray({
    control,
    name: "speakers",
  });

  const onSubmit = async (data: EventData): Promise<void> => {
    setLoading(true);

    // Filter out invalid speakers
    const validSpeakers = data.speakers.filter(speaker => speaker.name && speaker.bio && speaker.imageFile?.[0]);

    if (validSpeakers.length === 0) {
      toast.error("Please add at least one valid speaker.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("location", data.location);
    formData.append("registrationLink", data.registrationLink);
    formData.append("category", data.category);

    // Append event image
    if (data.eventImage?.[0]) {
      formData.append("eventImage", data.eventImage[0]);
    }

    // Process speakers
    const speakersWithUrls = await Promise.all(
      validSpeakers.map(async (speaker, index) => {
        if (speaker.imageFile && speaker.imageFile[0]) {
          formData.append(`speakers[${index}].imageFile`, speaker.imageFile[0]);
        }
        return {
          name: speaker.name,
          bio: speaker.bio,
          imageUrl: "", // Ideally, set this from an image upload API response
        };
      })
    );

    formData.append("speakers", JSON.stringify(speakersWithUrls));

    try {
      const res = await createEvents(formData);
      toast.success("Event created successfully!");
      console.log("Response:", res);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full w-[98%] mx-auto">
      {/* <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <h2 className="text-lg font-semibold">Event Information</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: "Title is required" })} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description", { required: "Description is required" })} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="datetime-local" id="startDate" {...register("startDate", { required: "Start Date is required" })} />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input type="datetime-local" id="endDate" {...register("endDate", { required: "End Date is required" })} />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location", { required: "Location is required" })} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <h2 className="text-lg font-semibold">Speakers</h2>
        {speakerFields.map((speaker, index) => (
          <div key={speaker.id} className="space-y-2 border p-4 rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold">Speaker {index + 1}</h3>
              <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`speakers.${index}.name`}>Name</Label>
              <Input {...register(`speakers.${index}.name`, { required: "Name is required" })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`speakers.${index}.bio`}>Bio</Label>
              <Textarea {...register(`speakers.${index}.bio`, { required: "Bio is required" })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`speakers.${index}.imageFile`}>Image Upload</Label>
              <Input type="file" {...register(`speakers.${index}.imageFile`, { required: "Image file is required" })} />
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => append({ name: "", bio: "", imageFile: undefined })}>
          Add Speaker
        </Button>

        <div className="space-y-2">
          <Label htmlFor="eventImage">Event Image</Label>
          <Input type="file" id="eventImage" {...register("eventImage", { required: "Event Image is required" })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registrationLink">Registration Link</Label>
          <Input type="url" id="registrationLink" {...register("registrationLink", { required: "Registration Link is required" })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" {...register("category", { required: "Category is required" })} />
        </div>

        <DialogFooter>
          <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
        </DialogFooter>
      </form> */}
      "On deveplopment phase"
    </div>
  );
};

export default CreateEvents;
