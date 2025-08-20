import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Globe,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/core";

const wings = [
  {
    icon: BookOpen,
    title: "Research ",
    description:
      "Engage in ongoing innovative research initiatives and contribute to scholarly publications.",
    features: [
      "Current Research Projects",
      "Upcoming Courses",
      "Academic Publications",
      "International Conferences",
    ],
    status: "Active",
  },
  {
    icon: TrendingUp,
    title: "Trending ",
    description:
      "Specialized training courses in the most in-demand technologies and skills.",
    features: [
      "Cybersecurity Training",
      "AI & Machine Learning",
      "Data Science",
      "LLM & ChatGPT",
    ],
    status: "Active",
  },
  {
    icon: GraduationCap,
    title: "Higher Study ",
    description:
      "Resources and guidance for international education and scholarship opportunities.",
    features: [
      "Abroad Opportunities",
      "Scholarship News",
      "University Guidance",
      "Application Support",
    ],
    status: "Coming Soon",
  },
  {
    icon: Globe,
    title: "Language ",
    description:
      "Language proficiency training for global academic and professional opportunities.",
    features: [
      "IELTS Preparation",
      "PTE Training",
      "Academic Writing",
      "Communication Skills",
    ],
    status: "Coming Soon",
  },
];

const ServicesSection = () => {
  return (
    <section className=" bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <Container>
        <SectionHeader
          title="Our Wings"
          description="Explore our specialized programs designed to support your academic journey and professional development."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {wings.map((wing, index) => (
            <div
              key={index}
              className="group relative bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 rounded-2xl p-6 overflow-hidden"
            >
              {/* Visible Hover Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 rounded-2xl ${
                    index === 0
                      ? "bg-blue-100/80"
                      : index === 1
                      ? "bg-orange-100/80"
                      : index === 2
                      ? "bg-purple-100/80"
                      : "bg-green-100/80"
                  }`}
                ></div>
              </div>
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
                      index === 0
                        ? "bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300"
                        : index === 1
                        ? "bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300"
                        : index === 2
                        ? "bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300"
                        : "bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300"
                    }`}
                  >
                    <wing.icon
                      className={`h-8 w-8 ${
                        index === 0
                          ? "text-blue-600 group-hover:text-blue-700"
                          : index === 1
                          ? "text-orange-600 group-hover:text-orange-700"
                          : index === 2
                          ? "text-purple-600 group-hover:text-purple-700"
                          : "text-green-600 group-hover:text-green-700"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {wing.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {wing.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {wing.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-orange-500"
                            : index === 2
                            ? "bg-purple-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="flex w-full items-center justify-between pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                  <Button className="w-full text-sm font-semibold px-4 py-2 h-auto bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300">
                    Explore Now
                  </Button>

                  {/* Hover Indicator */}
                  <div
                    className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-orange-500"
                        : index === 2
                        ? "bg-purple-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
