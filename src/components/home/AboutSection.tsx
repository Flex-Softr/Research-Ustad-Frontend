import {
  BookOpen,
  Globe,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Zap,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/core";

const stats = [
  { icon: Users, value: "5,000+", label: "Active Members" },
  { icon: Globe, value: "50+", label: "Countries Represented" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: BookOpen, value: "500+", label: "Research Projects" },
];

const AboutSection = () => {
  return (
    <section className=" bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

      <Container>
        {/* Colorful Header */}
        <div className="text-center ">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Star className="w-4 h-4" />
            Our Vision
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-600 to-brand-secondary">
              Transforming
            </span>

            <span className="text-gray-900">Education</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering students and researchers through collaborative learning,
            innovative resources, and global community building.
          </p>
        </div>

        {/* Main Content with Colorful Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-6">
          {/* Left Side - Content */}
          <div className="relative">
            {/* Decorative blobs */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60"></div>

            {/* Key Points as Linked Design Cards */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Building the Future of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary ml-2">
                  Education
                </span>
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our mission is to empower students and aspiring researchers by
                fostering a collaborative community dedicated to sharing
                knowledge, facilitating access to research data, and guiding
                individuals toward higher studies and diverse opportunities.
              </p>

              {/* Linked Design Cards */}
              <div className="flex flex-col gap-4">
                <a
                  href="#research-resources"
                  className="group block transition-all duration-300 rounded-2xl border border-gray-100 hover:border-brand-primary/40 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 shadow-sm hover:shadow-md p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-110 transition-transform"></div>
                    <span className="text-gray-800 font-semibold group-hover:text-brand-primary transition-colors">
                      Access to cutting-edge research resources
                    </span>
                    <ArrowRight className="ml-auto w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
                <a
                  href="#global-community"
                  className="group block transition-all duration-300 rounded-2xl border border-gray-100 hover:border-purple-500/40 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 shadow-sm hover:shadow-md p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform"></div>
                    <span className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors">
                      Global community of researchers and students
                    </span>
                    <ArrowRight className="ml-auto w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
                <a
                  href="#academic-guidance"
                  className="group block transition-all duration-300 rounded-2xl border border-gray-100 hover:border-orange-500/40 bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 shadow-sm hover:shadow-md p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                    <span className="text-gray-800 font-semibold group-hover:text-orange-600 transition-colors">
                      Expert guidance for academic success
                    </span>
                    <ArrowRight className="ml-auto w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Colorful Image Container */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl transform rotate-12"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl transform -rotate-12"></div>

            <div className="relative bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-3xl p-6 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="text-2xl font-black text-brand-primary">
                  5K+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Active Researchers
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
