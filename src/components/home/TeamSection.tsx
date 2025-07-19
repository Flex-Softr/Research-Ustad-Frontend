import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/core";
import { useState, useEffect } from "react";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Former VP of Analytics at Fortune 500 company. 15+ years in data science and business strategy.",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Ex-Google engineer with expertise in machine learning and scalable architecture design.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Product strategist with 10+ years creating user-centric analytics platforms and tools.",
  },
  {
    name: "David Park",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack architect specializing in big data processing and real-time analytics systems.",
  },
  {
    name: "Alexandra Kim",
    role: "Lead Data Scientist",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "PhD in Machine Learning with expertise in predictive analytics and AI model development.",
  },
  {
    name: "James Wilson",
    role: "Senior Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack developer with 8+ years experience in building scalable web applications.",
  },
  {
    name: "Maria Garcia",
    role: "UX/UI Designer",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Creative designer focused on creating intuitive and beautiful user experiences.",
  },
  {
    name: "Robert Taylor",
    role: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Infrastructure specialist with expertise in cloud deployment and CI/CD pipelines.",
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Strategic marketing leader with 12+ years in digital marketing and brand development.",
  },
  {
    name: "Kevin Martinez",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Product visionary with experience in agile methodologies and user-centered design.",
  },
  {
    name: "Rachel Green",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "React specialist with passion for creating responsive and accessible web interfaces.",
  },
  {
    name: "Daniel Brown",
    role: "Backend Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Python and Node.js expert specializing in API development and database optimization.",
  },
];

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Calculate cards per slide based on screen size
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(3); // Desktop: 3 cards
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const totalSlides = Math.ceil(team.length / cardsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-brand-secondary/8 to-green-400/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400/5 to-brand-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-primary/20 text-brand-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Star className="w-4 h-4" />
            Our Team
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary">
              Meet Our
            </span>
            <br />
            <span className="text-gray-800">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Industry veterans and innovators who are passionate about
            transforming how businesses use data.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
            <div className="w-2 h-2 bg-brand-secondary rounded-full animate-ping"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-secondary to-transparent"></div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Slider Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className={`grid gap-8 ${
                      cardsPerSlide === 1
                        ? "grid-cols-1"
                        : cardsPerSlide === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {team
                      .slice(
                        slideIndex * cardsPerSlide,
                        slideIndex * cardsPerSlide + cardsPerSlide
                      )
                      .map((member, index) => (
                        <div
                          key={index}
                          className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 hover:border-brand-primary/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                          {/* Card Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-secondary/0 group-hover:from-brand-primary/5 group-hover:to-brand-secondary/5 transition-all duration-700 rounded-3xl"></div>

                          {/* Image Section */}
                          <div className="relative p-6">
                            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:border-brand-primary/30 transition-all duration-500">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-secondary/20 group-hover:from-brand-primary/30 group-hover:to-brand-secondary/30 transition-all duration-500"></div>
                            </div>

                            {/* Floating Elements */}
                            <div
                              className="absolute top-4 right-4 w-2 h-2 bg-brand-primary/60 rounded-full animate-ping"
                              style={{ animationDuration: "2s" }}
                            ></div>
                            <div
                              className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-brand-secondary/50 rounded-full animate-ping"
                              style={{
                                animationDuration: "3s",
                                animationDelay: "1s",
                              }}
                            ></div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6 pt-0">
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors duration-300">
                                {member.name}
                              </h3>
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                                {member.role}
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {member.bio}
                              </p>
                            </div>
                          </div>

                          {/* Corner Decorations */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-brand-primary/40 rounded-tl-3xl"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brand-secondary/40 rounded-tr-3xl"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-green-400/40 rounded-bl-3xl"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-brand-primary/40 rounded-br-3xl"></div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only show if more than one slide */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator - Only show if more than one slide */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-brand-primary to-brand-secondary scale-125"
                      : "bg-gray-300 hover:bg-brand-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
