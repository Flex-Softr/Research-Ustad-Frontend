import { Badge } from "@/components/ui/badge";
import { CustomEvent } from "@/type/event";

interface EventHeaderProps {
  event: CustomEvent;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const getEventStatus = (event: CustomEvent) => {
    const now = new Date();
    const startDate = new Date(event.startDate);

    if (startDate > now) {
      const daysUntil = Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return {
        status: "upcoming",
        text: `${daysUntil} days away`,
        color: "bg-green-500",
      };
    } else {
      return {
        status: "past",
        text: "Event completed",
        color: "bg-gray-500",
      };
    }
  };

  const statusInfo = getEventStatus(event);

  return (
    <div className="space-y-4">
      {/* Category and Status Badges */}
      <div className="flex items-center gap-3">
        <Badge className="bg-brand-secondary text-white px-3 py-1">
          {event.category}
        </Badge>
        <Badge className={`${statusInfo.color} text-white px-3 py-1`}>
          {statusInfo.status === "upcoming" ? "Upcoming" : "Past"}
        </Badge>
      </div>

      {/* Event Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {event.title}
      </h1>

      {/* Event Description */}
      <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
        {event.description}
      </p>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {event.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-sm bg-white/50 backdrop-blur-sm"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventHeader;
