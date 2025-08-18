import { Star, Award, Users } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";


const InstructorTab = ({ course }) => {
  const instructors = course.instructors || [];

  if (instructors.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-gray-600">No instructor information available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Meet Your Expert Instructors
        </h3>
        <p className="text-gray-600 mb-8">
          Learn from industry experts and experienced professionals who are
          passionate about sharing their knowledge and helping you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {instructors.map((instructor, index) => (
          <div
            key={index}
            className="flex items-start gap-6 p-6 bg-gray-50 rounded-2xl"
          >
            <div className="relative">
              <UserAvatar
                src={instructor.imageUrl}
                alt={instructor.name}
                name={instructor.name}
                size="lg"
                className="w-20 h-20 border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {instructor.name}
              </h4>
              <p className="text-brand-secondary font-medium mb-2">
                {instructor.specialization}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{instructor.rating} Instructor Rating</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-brand-secondary mr-1" />
                  <span>{instructor.experience} Experience</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-brand-secondary mr-1" />
                  <span>{instructor.students.toLocaleString()} Students</span>
                </div>
              </div>
              {instructor.bio && (
                <p className="text-gray-700 leading-relaxed">
                  {instructor.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorTab;
