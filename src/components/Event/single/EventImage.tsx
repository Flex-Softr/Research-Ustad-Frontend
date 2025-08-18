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
          src={event.imageUrl}
          alt={event.title}
          
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
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
