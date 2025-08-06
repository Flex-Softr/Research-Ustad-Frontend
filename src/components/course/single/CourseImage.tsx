import Image from "next/image";
import { useState } from "react";

const CourseImage = ({ course }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-80">
        <Image
          src={imageError ? "/placeholder-course.jpg" : course.imageUrl}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default CourseImage;
