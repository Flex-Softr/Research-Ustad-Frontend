import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Globe, GraduationCap, TrendingUp } from "lucide-react";

const wings = [
  {
    icon: BookOpen,
    title: "Research Wings",
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
    title: "Trending Wings",
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
    title: "Higher Study Wings",
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
    title: "Language Wings",
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
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Wings
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our specialized programs designed to support your academic
            journey and professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {wings.map((wing, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <wing.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">
                      {wing.title}
                    </CardTitle>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      wing.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {wing.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {wing.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {wing.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={wing.status === "Coming Soon"}
                >
                  {wing.status === "Active" ? "Explore Now" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
