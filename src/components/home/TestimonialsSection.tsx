import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/core";
import { useState, useEffect } from "react";
import UserAvatar from "../shared/UserAvatar";

const testimonials = [
  {
    content:
      "ResearchUstad transformed our decision-making process. We went from gut feelings to data-driven insights that increased our revenue by 40% in just 6 months.",
    author: "Jennifer Walsh",
    role: "VP of Operations",
    company: "TechCorp Inc.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "The predictive analytics features are game-changing. We can now forecast market trends weeks ahead of our competition and adjust our strategy accordingly.",
    author: "Marcus Thompson",
    role: "Chief Data Officer",
    company: "Retail Giants",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "Implementation was seamless, and the support team is exceptional. ResearchUstad scales perfectly with our growing business needs.",
    author: "Lisa Rodriguez",
    role: "CEO",
    company: "StartupX",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "The research tools and analytics platform have revolutionized how we approach data analysis. Our team productivity increased by 60% within the first quarter.",
    author: "David Chen",
    role: "Research Director",
    company: "Innovation Labs",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "As a student, ResearchUstad has been invaluable for my academic research. The platform's ease of use and comprehensive features make complex analysis simple.",
    author: "Sarah Kim",
    role: "PhD Student",
    company: "University of Technology",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "The collaborative features and real-time data sharing capabilities have transformed our research team's workflow. Highly recommended for academic institutions.",
    author: "Dr. Michael Brown",
    role: "Professor",
    company: "Research University",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-secondary via-brand-primary to-brand-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-900/95 via-brand-secondary-900/90 to-brand-secondary-800/95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Moving Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-400/15 to-brand-primary/15 rounded-full blur-2xl animate-bounce"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-brand-secondary/10 to-green-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>

          {/* Moving Lines */}
          <div className="absolute top-1/4 left-0 w-2 h-40 bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-brand-secondary/20 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Floating Particles */}
          <div
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-ping"
            style={{ animationDuration: "3s", animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Quote className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
              What Our
            </span>
            <br />
            <span className="text-white">Students Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied students who have transformed their
            research with ResearchUstad.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>
        </div>

        {/* Modern Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700 rounded-3xl"></div>

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-30">
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex mb-8 justify-center">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current mx-1"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <div className="text-center mb-12">
                <p className="text-white text-xl md:text-2xl leading-relaxed italic font-light">
                  "{testimonials[currentSlide].content}"
                </p>
              </div>

              {/* Author Section */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <UserAvatar
                    name={testimonials[currentSlide].author}
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].author}
                    size="2xl"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-white font-bold text-xl mb-2">
                    {testimonials[currentSlide].author}
                  </h4>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-2 shadow-lg">
                    {testimonials[currentSlide].role}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {testimonials[currentSlide].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-400/40 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-pink-400/40 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-purple-400/40 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-pink-400/40 rounded-br-3xl"></div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
