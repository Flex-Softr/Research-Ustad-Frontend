import FallbackImage from "@/components/shared/FallbackImage";
import { CustomEvent } from "@/type/event";

interface EventImageProps {
  event: CustomEvent;
}

const EventImage = ({ event }: EventImageProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <FallbackImage
          key={event._id}
          src={event.imageUrl}
          alt={event.title}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default EventImage;
