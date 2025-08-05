import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  BookOpen,
  Play,
  Users,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/core";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-brand-primary to-brand-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-4 h-4 bg-brand-primary rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="w-6 h-6 bg-brand-secondary rounded-full opacity-40"></div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-bounce"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-3 h-3 bg-brand-secondary rounded-full opacity-50"></div>
      </div>

      {/* Main Content */}
      <Container className="relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-secondary/20 border border-brand-secondary/30 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              Leading Research Platform
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Research Excellence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Join thousands of researchers, academics, and students in the most
              comprehensive research platform designed for the future of
              knowledge discovery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                className="relative group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white p-6 text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-brand-primary/30 border-0 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden backdrop-blur-sm"
                style={{
                  borderRadius: "1rem 0 1rem 0",
                }}
              >
                <span className="flex items-center relative z-10">
                  Start Researching
                  <ArrowRight className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </span>
                {/* Modern gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-white/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-brand-secondary/30 rounded-tr-full"></div>
              </Button>
              <Button
                variant="outline"
                className="relative group border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white p-6 text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-brand-secondary/25 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden backdrop-blur-sm"
                style={{
                  borderRadius: "0 1rem 0 1rem",
                }}
              >
                <span className="flex items-center relative z-10">
                  <Play className="w-5 h-5 mr-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  Watch Demo
                </span>
                {/* Modern gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 bg-brand-secondary/20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-brand-primary/30 rounded-tl-full"></div>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/img/heroimg1.jpg"
                    alt="Research Excellence"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-primary/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">+45%</div>
                      <div className="text-xs text-gray-300">
                        Research Growth
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-secondary/20 rounded-lg">
                        <Zap className="w-5 h-5 text-brand-secondary" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Real-time
                        </div>
                        <div className="text-xs text-gray-300">Updates</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary/20 rounded-lg">
                  <Users className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-400">
                    Active Researchers
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-secondary/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-400">Research Papers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-secondary/20 rounded-lg">
                  <Award className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-gray-400">Awards Won</div>
                </div>
              </div>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-brand-secondary border-2 border-slate-900"
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  Trusted by 10K+ researchers
                </span>
              </div>
            </div>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/30 to-brand-secondary/30 rounded-3xl blur-3xl -z-10"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
