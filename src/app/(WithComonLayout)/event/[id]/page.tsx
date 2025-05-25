import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Users } from "lucide-react";
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
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        name: "Sundar Pichai",
        bio: "CEO of Google",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://example.com/startup-register",
    category: "Business",
    fullDescription:
      "Join us for the most anticipated startup event of 2025! This three-day summit brings together the brightest minds in technology, business, and innovation. Network with industry leaders, attend inspiring keynotes, and discover the next big thing in the startup ecosystem.",
    agenda: [
      {
        day: "Day 1",
        sessions: [
          "Opening Keynote",
          "Startup Pitches",
          "Networking Lunch",
          "Panel Discussion: Future of AI",
        ],
      },
      {
        day: "Day 2",
        sessions: [
          "Investor Roundtable",
          "Workshop: Scaling Your Startup",
          "Demo Day",
          "Awards Ceremony",
        ],
      },
      {
        day: "Day 3",
        sessions: [
          "Closing Keynote",
          "Startup Expo",
          "One-on-One Meetings",
          "Networking Reception",
        ],
      },
    ],
  },
];

const EventPage = async ({ params }) => {
  const { id } = await params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg mb-8">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {event.fullDescription}
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Featured Speakers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {speaker.name}
                        </h3>
                        <p className="text-gray-600">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {event.agenda.map((day, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-3">{day.day}</h3>
                      <ul className="space-y-2">
                        {day.sessions.map((session, sessionIndex) => (
                          <li key={sessionIndex} className="flex items-center">
                            <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                            <span>{session}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <strong>Start:</strong>{" "}
                      {new Date(event.startDate).toLocaleDateString()}
                      <br />
                      <strong>End:</strong>{" "}
                      {new Date(event.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Location:</strong> {event.location}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    <span>
                      <strong>Speakers:</strong> {event.speakers.length}
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-6"
                >
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventPage;
