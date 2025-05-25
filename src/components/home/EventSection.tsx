import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "1",
    title: "Startup Summit 2025",
    description: "An event to connect entrepreneurs and investors.",
    startDate: "2025-09-10T09:30:00Z",
    endDate: "2025-09-12T17:00:00Z",
    location: "Silicon Valley, USA",
    speakers: [
      {
        name: "Elon Musk",
        bio: "CEO of Tesla & SpaceX",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Sundar Pichai",
        bio: "CEO of Google",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/startup-register",
    category: "Business",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community events and connect with fellow researchers and
            industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {event.title}
                </CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{event.speakers.length} Speakers</span>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  {event.speakers.slice(0, 3).map((speaker, index) => (
                    <img
                      key={index}
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                  {event.speakers.length > 3 && (
                    <span className="text-sm text-gray-500">
                      +{event.speakers.length - 3} more
                    </span>
                  )}
                </div>

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href={`/event/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
