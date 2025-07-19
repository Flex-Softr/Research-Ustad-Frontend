import {
  Book,
  BookOpen,
  Globe,
  GraduationCap,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/core";

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
    <section className=" bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <Container>
        <div className="text-center my-10">
          <div className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight flex items-center justify-center gap-2">
            What We're
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary ml-2">
              Good At
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We excel at building collaborative communities, simplifying research
            access, and providing guidance for academic and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm border border-gray-100/50 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl p-6 overflow-hidden"
            >
              {/* Gradient Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0
                      ? "from-blue-50/50 to-blue-100/30"
                      : index === 1
                      ? "from-green-50/50 to-green-100/30"
                      : index === 2
                      ? "from-purple-50/50 to-purple-100/30"
                      : index === 3
                      ? "from-orange-50/50 to-orange-100/30"
                      : index === 4
                      ? "from-pink-50/50 to-pink-100/30"
                      : "from-indigo-50/50 to-indigo-100/30"
                  }`}
                ></div>
              </div>

              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    index === 0
                      ? "from-blue-400/20 via-blue-500/10 to-blue-600/20"
                      : index === 1
                      ? "from-green-400/20 via-green-500/10 to-green-600/20"
                      : index === 2
                      ? "from-purple-400/20 via-purple-500/10 to-purple-600/20"
                      : index === 3
                      ? "from-orange-400/20 via-orange-500/10 to-orange-600/20"
                      : index === 4
                      ? "from-pink-400/20 via-pink-500/10 to-pink-600/20"
                      : "from-indigo-400/20 via-indigo-500/10 to-indigo-600/20"
                  }`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  {/* Enhanced Icon Background */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${
                        index === 0
                          ? "bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300"
                          : index === 1
                          ? "bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300"
                          : index === 2
                          ? "bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300"
                          : index === 3
                          ? "bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300"
                          : index === 4
                          ? "bg-gradient-to-br from-pink-100 to-pink-200 group-hover:from-pink-200 group-hover:to-pink-300"
                          : "bg-gradient-to-br from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300"
                      }`}
                    >
                      <feature.icon
                        className={`h-7 w-7 transition-all duration-500 group-hover:scale-110 ${
                          index === 0
                            ? "text-blue-600 group-hover:text-blue-700"
                            : index === 1
                            ? "text-green-600 group-hover:text-green-700"
                            : index === 2
                            ? "text-purple-600 group-hover:text-purple-700"
                            : index === 3
                            ? "text-orange-600 group-hover:text-orange-700"
                            : index === 4
                            ? "text-pink-600 group-hover:text-pink-700"
                            : "text-indigo-600 group-hover:text-indigo-700"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Learn More Link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100/50 group-hover:border-gray-200/50 transition-colors duration-300">
                  <div className="flex items-center text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                    <span className="text-sm font-semibold mr-2">
                      Learn more
                    </span>
                    <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>

                  {/* Hover Indicator */}
                  <div
                    className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : index === 2
                        ? "bg-purple-500"
                        : index === 3
                        ? "bg-orange-500"
                        : index === 4
                        ? "bg-pink-500"
                        : "bg-indigo-500"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
              <div className="absolute bottom-8 left-4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 group-hover:animate-pulse"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
