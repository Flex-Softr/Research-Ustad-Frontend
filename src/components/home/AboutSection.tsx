import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Globe, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Active Members" },
  { icon: Globe, value: "50+", label: "Countries Represented" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: BookOpen, value: "500+", label: "Research Projects" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Mission
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our mission is to empower students and aspiring researchers by
              fostering a collaborative community dedicated to sharing
              knowledge, facilitating access to research data, and guiding
              individuals toward higher studies and diverse opportunities.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating"
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Building Future Leaders
                </h3>
                <p className="text-gray-600">
                  We continuously support students and researchers in their
                  journey toward academic excellence and professional success
                  through collaborative learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
