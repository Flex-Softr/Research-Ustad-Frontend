import Image from "next/image";
import { type Event } from "@/services/events";

interface EventImageProps {
  event: Event;
}

const EventImage = ({ event }: EventImageProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image
          src={`http://localhost:5000${event.imageUrl}`}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default EventImage;
