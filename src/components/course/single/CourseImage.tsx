import Image from "next/image";



const CourseImage = ({ course }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-80">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default CourseImage;
