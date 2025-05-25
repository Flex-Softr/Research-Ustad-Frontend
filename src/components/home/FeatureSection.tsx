import { Card, CardContent } from "@/components/ui/card";
import {
  Book,
  BookOpen,
  Globe,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Collaborative Community",
    description:
      "Connect with students and researchers worldwide to share knowledge and support each other's academic journey.",
  },
  {
    icon: BookOpen,
    title: "Research Resources",
    description:
      "Access comprehensive research data, publications, and academic materials to fuel your studies and projects.",
  },
  {
    icon: GraduationCap,
    title: "Higher Studies Guidance",
    description:
      "Get expert guidance for pursuing higher education, scholarships, and international opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description:
      "Enhance your capabilities with specialized training in cutting-edge technologies and research methodologies.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Contribute to research with worldwide significance and be part of innovations that shape the future.",
  },
  {
    icon: Book,
    title: "Academic Excellence",
    description:
      "Strive for excellence with access to quality educational content and mentorship from experts.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We're
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Good At
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We excel at building collaborative communities, simplifying research
            access, and providing guidance for academic and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
