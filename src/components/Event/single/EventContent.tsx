import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { CustomEvent } from "@/type/event";

interface EventContentProps {
  event: CustomEvent;
}

const EventContent = ({ event }: EventContentProps) => {


  // Generate agenda based on event duration
  const generateAgenda = (event: CustomEvent) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const daysDiff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      // Single day event
      return [
        {
          day: "Event Day",
          sessions: [
            "Opening Ceremony",
            "Keynote Speeches",
            "Panel Discussions",
            "Networking Break",
            "Workshop Sessions",
            "Closing Remarks",
          ],
        },
      ];
    } else {
      // Multi-day event
      return Array.from({ length: daysDiff + 1 }, (_, index) => ({
        day: `Day ${index + 1}`,
        sessions: [
          index === 0 ? "Opening Ceremony" : "Morning Session",
          "Keynote Speeches",
          "Panel Discussions",
          "Networking Break",
          "Workshop Sessions",
          index === daysDiff ? "Closing Ceremony" : "Evening Session",
        ],
      }));
    }
  };

  const agenda = generateAgenda(event);

  return (
    <div className="space-y-8">
      {/* Event Details Card */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <Calendar className="h-5 w-5 mr-2 text-brand-secondary" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Date & Time</p>
                <p className="text-gray-600">
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {new Date(event.startDate).toDateString() !==
                    new Date(event.endDate).toDateString() && (
                    <>
                      {" "}
                      -{" "}
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Duration</p>
                <p className="text-gray-600">
                {event?.eventDuration} min
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-brand-secondary" />
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>

          
          </div>
        </CardContent>
      </Card>

      {/* Speakers Section */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-900">
            <Users className="h-5 w-5 mr-2 text-brand-secondary" />
            Featured Speakers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.speakers.map((speaker, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50/50"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    fill
                    sizes="64px"
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Agenda */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Event Agenda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {agenda.map((day, index) => (
              <div
                key={index}
                className="border-l-4 border-brand-secondary pl-6"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  {day.day}
                </h3>
                <div className="space-y-3">
                  {day.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-brand-secondary rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{session}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventContent;
