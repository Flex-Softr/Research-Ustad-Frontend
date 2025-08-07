import {
  CheckCircle,
  Video,
  FileText,
  Award,
  Clock,
  Users,
  Star,
  Globe,
  MapPin,
  BookOpen,
  Target,
  BarChart3,
  Lock,
  Share2,
  Heart,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const OverviewTab = ({ course }) => {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Video,
      FileText,
      Award,
      Clock,
      Users,
      Star,
      CheckCircle,
      Globe,
      MapPin,
      BookOpen,
      Target,
      BarChart3,
      Lock,
      Share2,
      Heart,
      ExternalLink,
      ChevronDown,
      ChevronUp,
    };
    return iconMap[iconName] || Video;
  };

  // Default course features if not provided
  const defaultCourseFeatures = [
    {
      title: "HD Video Lectures",
      description: "High-quality video content with expert instructors",
      icon: "Video",
    },
    {
      title: "Downloadable Resources",
      description: "Access to course materials and resources",
      icon: "FileText",
    },
    {
      title: "Certificate of Completion",
      description: "Earn a certificate upon course completion",
      icon: "Award",
    },
    {
      title: "Lifetime Access",
      description: "Access course content forever",
      icon: "Globe",
    },
  ];

  const courseFeatures = course.courseFeatures || defaultCourseFeatures;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          What you'll learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(course.whatYouWillLearn || []).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
        <ul className="space-y-2">
          {(course.requirements || []).map((req, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Course Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseFeatures.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <IconComponent className="w-5 h-5 text-brand-secondary" />
                <div>
                  <p className="font-medium text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
