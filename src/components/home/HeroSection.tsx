import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Play, Users } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2364748B%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Professional badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
            <Award className="w-4 h-4 mr-2" />
            Empowering Academic Excellence
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block mb-2">Foster Collaboration &</span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Join our global community of students and researchers. Access
            cutting-edge research resources, collaborate on innovative projects,
            and unlock opportunities for higher studies and career advancement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group shadow-lg"
              asChild
            >
              <Link href="/dashboard">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
              Explore Resources
            </Button>
          </div>

          {/* Professional trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto text-center mb-8">
            <div className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                5,000+
              </div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100">
              <BookOpen className="h-6 w-6 text-indigo-600 mb-2" />
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                500+
              </div>
              <div className="text-sm text-gray-600">Research Projects</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100">
              <Award className="h-6 w-6 text-purple-600 mb-2" />
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                50+
              </div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free to Join</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Global Network</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
