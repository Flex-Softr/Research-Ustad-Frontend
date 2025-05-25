import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

interface Speaker {
  name: string;
  bio: string;
  imageUrl: string;
}

interface Event {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: string;
  category: string;
  image: string;
  speakers: Speaker[];
  registrationLink: string;
}

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
  const [formData, setFormData] = useState<Event>({
    title: event?.title || "",
    description: event?.description || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    location: event?.location || "",
    attendees: event?.attendees || 0,
    maxAttendees: event?.maxAttendees || 100,
    status: event?.status || "upcoming",
    category: event?.category || "",
    image: event?.image || "",
    speakers: event?.speakers || [],
    registrationLink: event?.registrationLink || "",
    ...(event?.id && { id: event.id }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    field: keyof Event,
    value: string | number | Speaker[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSpeaker = () => {
    const newSpeaker: Speaker = { name: "", bio: "", imageUrl: "" };
    handleChange("speakers", [...formData.speakers, newSpeaker]);
  };

  const updateSpeaker = (
    index: number,
    field: keyof Speaker,
    value: string
  ) => {
    const updatedSpeakers = formData.speakers.map((speaker, i) =>
      i === index ? { ...speaker, [field]: value } : speaker
    );
    handleChange("speakers", updatedSpeakers);
  };

  const removeSpeaker = (index: number) => {
    const updatedSpeakers = formData.speakers.filter((_, i) => i !== index);
    handleChange("speakers", updatedSpeakers);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="e.g., Technology, Business"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Event location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) =>
                  handleChange("maxAttendees", parseInt(e.target.value))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Event description"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationLink">Registration Link</Label>
              <Input
                id="registrationLink"
                value={formData.registrationLink}
                onChange={(e) =>
                  handleChange("registrationLink", e.target.value)
                }
                placeholder="https://example.com/register"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Speakers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSpeaker}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
            </div>

            {formData.speakers.map((speaker, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Speaker {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpeaker(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Speaker name"
                    value={speaker.name}
                    onChange={(e) =>
                      updateSpeaker(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Speaker bio"
                    value={speaker.bio}
                    onChange={(e) =>
                      updateSpeaker(index, "bio", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    value={speaker.imageUrl}
                    onChange={(e) =>
                      updateSpeaker(index, "imageUrl", e.target.value)
                    }
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
