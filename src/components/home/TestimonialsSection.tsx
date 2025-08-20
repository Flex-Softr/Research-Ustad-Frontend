"use client";

import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/core";
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

// Rating Stars Component
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex justify-center mb-6">
    {[...Array(rating)].map((_, i) => (
      <Star
        key={i}
        className="h-5 w-5 text-yellow-400 fill-current mx-1"
      />
    ))}
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
    {/* Quote Icon */}
    <div className="flex justify-center mb-6">
      <div className="w-12 h-12 bg-[var(--color-brand-primary)]/10 rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-[var(--color-brand-primary)]" />
      </div>
    </div>

    {/* Rating Stars */}
    <RatingStars rating={testimonial.rating} />

    {/* Testimonial Content */}
    <div className="mb-8">
      <p className="text-gray-700 text-lg leading-relaxed italic">
        "{testimonial.content}"
      </p>
    </div>

    {/* Author Section */}
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <UserAvatar
          src={testimonial.avatar}
          alt={testimonial.author}
          name={testimonial.author}
          size="xl"
          className="border-4 border-white shadow-lg"
        />
      </div>
      <div>
        <h4 className="text-[var(--color-brand-primary)] font-bold text-lg mb-1">
          {testimonial.author}
        </h4>
        <p className="text-[var(--color-brand-primary)] font-semibold text-sm mb-1">
          {testimonial.role}
        </p>
        <p className="text-gray-600 text-sm">
          {testimonial.company}
        </p>
      </div>
    </div>
  </div>
);

// Navigation Button Component
const NavigationButton = ({ 
  direction, 
  onClick 
}: { 
  direction: 'prev' | 'next'; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className="w-12 h-12 bg-[var(--color-brand-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-brand-primary)]/80 transition-colors duration-300 shadow-lg"
  >
    {direction === 'prev' ? (
      <ChevronLeft className="w-6 h-6" />
    ) : (
      <ChevronRight className="w-6 h-6" />
    )}
  </button>
);

// Dots Indicator Component
const DotsIndicator = ({ 
  total, 
  current, 
  onDotClick 
}: { 
  total: number; 
  current: number; 
  onDotClick: (index: number) => void; 
}) => (
  <div className="flex justify-center items-center gap-3 mt-8">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === current
            ? "bg-[var(--color-brand-primary)] scale-125"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      />
    ))}
  </div>
);

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
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionHeader
          title="What Our Students Say"
          description="Join thousands of satisfied students who have transformed their research with ResearchUstad."
        />

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative">
            <TestimonialCard testimonial={testimonials[currentSlide]} />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <NavigationButton direction="prev" onClick={prevSlide} />
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <NavigationButton direction="next" onClick={nextSlide} />
          </div>

          {/* Dots Indicator */}
          <DotsIndicator
            total={testimonials.length}
            current={currentSlide}
            onDotClick={goToSlide}
          />
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
